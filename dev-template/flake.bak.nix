{
  description = "Simple DEV Shell";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";
    flake-utils.url = "github:numtide/flake-utils";
    phps.url = "github:loophp/nix-shell";
    android-nixpkgs.url = "github:tadfisher/android-nixpkgs";
    android-nixpkgs.inputs.nixpkgs.follows = "nixpkgs";
  };

  outputs = { self, nixpkgs, flake-utils, phps, android-nixpkgs, ... }:
    flake-utils.lib.eachDefaultSystem (
      system:
    let
      sys = system;
      l = nixpkgs.lib // builtins;
      supportedSystems = [ "x86_64-linux" "aarch64-darwin" ];
      forAllSystems = f: l.genAttrs supportedSystems
      (system: f system (
        import nixpkgs {
          inherit system;
          config = {
            android_sdk.accept_license = true;
            allowUnfree = true;
          };
        }
    ));

      replace = rec {
        replacer = a: b: str: nixpkgs.lib.strings.stringAsChars (x: if x == a then b else x) str;
        dotToDash = replacer "." "-";
        semicolonToDash = replacer ";" "-";
        underscoreToDash = replacer "_" "-";
        withDoubleQuote = str: ''"${str}"'';
      };

      nodejsVersion = 18;
      javaVersion = 19;
      androidBuildToolsVersion = "33.0.0";
      androidPlatformsVersion = 33;
      androidNDKVersion = "23.1.7779620";

      createEmulator = pkgs:
        let
          inherit (pkgs.stdenv) isAarch64;
          arch = if isAarch64 then "arm64-v8a" else "x86-64";
          cpuArch = if isAarch64 then "arm64" else "x86-64";
        in
        rec
        {
          inherit cpuArch;
          name = "dvt_${toString androidPlatformsVersion}";
          abi.type = arch;
          packages = "system-images;android-${toString androidPlatformsVersion};${tag.id};${abi.type}";
          sysdir = "$ANDROID_SDK_ROOT/system-images/android-${toString androidPlatformsVersion}/${tag.id}/${abi.type}/";
          tag.id = "google_apis_playstore";
          avdRootPath = "$HOME/.android/avd";
          avdPath = "${avdRootPath}/${name}.avd";
          avdConfigIni = "${avdPath}/config.ini";
        };

      overlays = [
        android-nixpkgs.overlays.default
        (final: prev: rec {
          nodejs = prev."nodejs-${toString nodejsVersion}_x";
          yarn = prev.yarn.override { inherit nodejs; };
          jdk = pkgs."jdk${toString javaVersion}";
          gradle = prev.gradle.override {
            java = jdk;
          };
          ruby = prev.ruby.withPackages (p: [ p.cocoapods ]);
          androidSdk = let emulator = createEmulator prev; in
            prev.androidSdk (s: [
              s.platform-tools
              s.cmdline-tools-latest
              s.tools
              s.patcher-v4
              s.extras-google-google-play-services
              s.emulator
              s."build-tools-${replace.dotToDash androidBuildToolsVersion}"
              s."ndk-${replace.dotToDash androidNDKVersion}"
              s."platforms-android-${toString androidPlatformsVersion}"
              s."${replace.underscoreToDash (replace.semicolonToDash emulator.packages)}"
            ]);
        })
      ];

      pkgs = import nixpkgs { 
        inherit overlays system;
        config.allowUnfree = true;
        config.android_sdk.accept_license = true;
      };

      run = pkg: "${pkgs.${pkg}}/bin/${pkg}";

      scripts = let emulator = createEmulator pkgs; in
        with pkgs; [
          (writeScriptBin "helpme" ''
            __usage="
            👋 Welcome to react-native development environment. 🚀
            If you see this message, it means your are inside the Nix shell ❄️.
            [Info]===============================================================>
            Env:
              - JAVA_HOME:        $JAVA_HOME
              - ANDROID_HOME:     $ANDROID_HOME
              - ANDROID_SDK_ROOT: $ANDROID_SDK_ROOT
              - ANDROID_NDK_ROOT: $ANDROID_NDK_ROOT
            Android Emulator:
              - name:     ${emulator.name}
              - packages: ${emulator.packages} 
            Android SDK packages:
              - build-tools:        ${androidBuildToolsVersion}
              - platforms-android:  ${toString androidPlatformsVersion}
              - ndk:                ${androidNDKVersion}
            Command available:
              - start:            start the project 🛹
              - create-emulator:  create emulator (default: android)
              - align-emulator:   align dev environment with AVD configurations
              - gen-properties:   generate local.properties in <currentDir>/android
              - helpme:           show this messages
            Report/Help:
              - https://github.com/eFishery/dvt
            [Info]===============================================================>
            "
            echo "$__usage"
          '')

          # check dependencies
          (writeScriptBin "check-react-native" ''
            until ${run "yarn"} react-native -v > /dev/null 2>&1; do
              echo "install dependencies..."
              ${run "yarn"} install || (echo failed instll dependencies with yarn; exit 1)
              echo ""
              read -p "Do you want to create an android emulator? [y/n]: " __is_create_emulator
              [[ $__is_create_emulator == "y" ]] && create-emulator && align-emulator
              sleep 0.5
            done
          '')

          # align emulator configuration for sync system-images location and relateds.
          (writeScriptBin "align-emulator" ''
            [[ -f ${emulator.avdConfigIni} ]] && (
            cat <<EOF > ${emulator.avdConfigIni}
            PlayStore.enabled = enable
            abi.type = ${emulator.abi.type}
            avd.ini.encoding = UTF-8
            skin.name = 1080x1920
            hw.lcd.density = 480
            hw.keyboard = yes
            hw.cpu.arch = ${emulator.cpuArch}
            image.sysdir.1 = ${emulator.sysdir}
            tag.display = Google Play
            tag.id = ${emulator.tag.id}
            disk.dataPartition.size = 6442450944
            EOF
            echo "🚀 Updated emulator (${emulator.name}) configurations."
            )
          '')

          # create emulator
          (writeScriptBin "create-emulator" ''
            echo "no" | ${androidSdk}/bin/avdmanager \
              --clear-cache -s \
              create avd -f \
              -n ${emulator.name} \
              -p ${emulator.avdPath} \
              -g ${emulator.tag.id} \
              -b ${emulator.abi.type} \
              -k ${replace.withDoubleQuote emulator.packages} \
              || (echo "❌ Fail: to create emulator"; exit 1)
          '')

          # TODO: delete emulator
          # (writeScriptBin "delete-emulator" ''
          #   Try your self here!
          # '')

          # start react-native metro bundler
          (writeScriptBin "start" ''
            check-react-native
            align-emulator
            $PWD/node_modules/.bin/react-native start $@
          '')

          # gen-properties
          (writeScriptBin "gen-properties" ''
            cat <<EOF > ./android/local.properties
            sdk.dir=$ANDROID_SDK_ROOT
            ndk.dir=$ANDROID_NDK_ROOT
            EOF || (echo "are you sure in the right project directory?"; exit 1)
          '')
        ];
    in

    {

      devShells.Android = pkgs.mkShell {
        nativeBuildInputs = [ pkgs.bashInteractive ];
        buildInputs = with pkgs; [
          nodejs
          yarn
          jdk
          gradle
          ruby
          androidSdk
          watchman
          flutter
          at-spi2-core.dev
          clang
          cmake
          dbus.dev
          gtk3
          libdatrie
          libepoxy.dev
          util-linux.dev
          libselinux
          libsepol
          libthai
          libxkbcommon
          ninja
          pcre
          pcre2.dev
          pkg-config
          xorg.libXdmcp
          xorg.libXtst
          android-studio
        ] ++ scripts;
        ANDROID_NDK_ROOT = "${pkgs.androidSdk.outPath}/share/android-sdk/ndk/${androidNDKVersion}";
        FLUTTER_ROOT = pkgs.flutter;
        LD_LIBRARY_PATH = "${pkgs.libepoxy}/lib";
        CHROME_EXECUTABLE = "google-chrome-stable";
        ANDROID_STUDIO = pkgs.android-studio;
        ANDROID_JAVA_HOME = pkgs.jdk.home;
        shellHook = ''
          helpme
          if ! [ -d $HOME/.cache/flutter/ ]
          then
          mkdir $HOME/.cache/flutter/
          fi
          ln -f -s ${pkgs.flutter}/bin/cache/dart-sdk $HOME/.cache/flutter/
        '';
      };

      devShells.C = pkgs.mkShell {
        nativeBuildInputs = [ pkgs.bashInteractive];
        buildInputs = with pkgs; [
          at-spi2-core.dev
          clang
          cmake
          dbus.dev
          gtk3
          libdatrie
          libepoxy.dev
          util-linux.dev
          libselinux
          libsepol
          libthai
          libxkbcommon
          ninja
          pcre
          pcre2.dev
          pkg-config
          xorg.libXdmcp
          xorg.libXtst
        ];
        shellHook = with pkgs; ''
          echo "Anda menggunakan C Compiler versi $(clang --version)"
        '';
      };
      
      devShells.Java = pkgs.mkShell {
        nativeBuildInputs = [ pkgs.bashInteractive];
        buildInputs = with pkgs; [
          jdk
        ];
        shellHook = with pkgs; ''
          echo "Anda menggunakan Java versi $(java --version)"
        '';
      };

      devShells.NodeJS14 = pkgs.mkShell {
        nativeBuildInputs = [ pkgs.bashInteractive ];
        buildInputs = with pkgs; [
          nodejs-14_x
          nodePackages.yarn
          nodePackages.prettier
          nodePackages.typescript
          nodePackages.prisma
          openssl
        ];
        shellHook = with pkgs; ''
          export PRISMA_MIGRATION_ENGINE_BINARY="${prisma-engines}/bin/migration-engine"
          export PRISMA_QUERY_ENGINE_BINARY="${prisma-engines}/bin/query-engine"
          export PRISMA_QUERY_ENGINE_LIBRARY="${prisma-engines}/lib/libquery_engine.node"
          export PRISMA_INTROSPECTION_ENGINE_BINARY="${prisma-engines}/bin/introspection-engine"
          export PRISMA_FMT_BINARY="${prisma-engines}/bin/prisma-fmt"
          export PATH=~/.npm-packages/bin:$PATH
          export NODE_PATH=~/.npm-packages/lib/node_modules
          echo "Anda menggunakan NodeJS versi $(node -v)"
        '';
      };

      devShells.NodeJS16 = pkgs.mkShell {
        nativeBuildInputs = [ pkgs.bashInteractive ];
        buildInputs = with pkgs; [
          nodejs-16_x
          nodePackages.yarn
          nodePackages.prettier
          nodePackages.typescript
          nodePackages.prisma
          openssl
        ];
        shellHook = with pkgs; ''
          export PRISMA_MIGRATION_ENGINE_BINARY="${prisma-engines}/bin/migration-engine"
          export PRISMA_QUERY_ENGINE_BINARY="${prisma-engines}/bin/query-engine"
          export PRISMA_QUERY_ENGINE_LIBRARY="${prisma-engines}/lib/libquery_engine.node"
          export PRISMA_INTROSPECTION_ENGINE_BINARY="${prisma-engines}/bin/introspection-engine"
          export PRISMA_FMT_BINARY="${prisma-engines}/bin/prisma-fmt"
          export PATH=~/.npm-packages/bin:$PATH
          export NODE_PATH=~/.npm-packages/lib/node_modules
          echo "Anda menggunakan NodeJS versi $(node -v)"
        '';
      };

      devShells.NodeJS18 = pkgs.mkShell {
        nativeBuildInputs = [ pkgs.bashInteractive ];
        buildInputs = with pkgs; [
          nodejs
          nodePackages.yarn
          nodePackages.prettier
          nodePackages.typescript
          nodePackages.prisma
          openssl
        ];
        shellHook = with pkgs; ''
          export PRISMA_MIGRATION_ENGINE_BINARY="${prisma-engines}/bin/migration-engine"
          export PRISMA_QUERY_ENGINE_BINARY="${prisma-engines}/bin/query-engine"
          export PRISMA_QUERY_ENGINE_LIBRARY="${prisma-engines}/lib/libquery_engine.node"
          export PRISMA_INTROSPECTION_ENGINE_BINARY="${prisma-engines}/bin/introspection-engine"
          export PRISMA_FMT_BINARY="${prisma-engines}/bin/prisma-fmt"
          export PATH=~/.npm-packages/bin:$PATH
          export NODE_PATH=~/.npm-packages/lib/node_modules
          echo "Anda menggunakan NodeJS versi $(node -v)"
        '';
      };

      devShells.NodeJS19 = pkgs.mkShell {
        nativeBuildInputs = [ pkgs.bashInteractive ];
        buildInputs = with pkgs; [
          nodejs-19_x
          nodePackages.yarn
          nodePackages.prettier
          nodePackages.typescript
          nodePackages.prisma
          openssl
        ];
        shellHook = with pkgs; ''
          export PRISMA_MIGRATION_ENGINE_BINARY="${prisma-engines}/bin/migration-engine"
          export PRISMA_QUERY_ENGINE_BINARY="${prisma-engines}/bin/query-engine"
          export PRISMA_QUERY_ENGINE_LIBRARY="${prisma-engines}/lib/libquery_engine.node"
          export PRISMA_INTROSPECTION_ENGINE_BINARY="${prisma-engines}/bin/introspection-engine"
          export PRISMA_FMT_BINARY="${prisma-engines}/bin/prisma-fmt"
          export PATH=~/.npm-packages/bin:$PATH
          export NODE_PATH=~/.npm-packages/lib/node_modules
          echo "Anda menggunakan NodeJS versi $(node -v)"
        '';
      };

      devShells.Python38 = pkgs.mkShell {
        nativeBuildInputs = [ pkgs.bashInteractive ];
        buildInputs = with pkgs; [
          python38
          python38Packages.pip
          python38Packages.virtualenv
          poetry
        ];
        shellHook = with pkgs; ''
          echo "Anda menggunakan Python versi $(python --version)"
        '';
      };

      devShells.Python39 = pkgs.mkShell {
        nativeBuildInputs = [ pkgs.bashInteractive ];
        buildInputs = with pkgs; [
          python39
          python39Packages.pip
          python39Packages.virtualenv
          poetry
        ];
        shellHook = with pkgs; ''
          echo "Anda menggunakan Python versi $(python --version)"
        '';
      };

      devShells.Python310 = pkgs.mkShell {
        nativeBuildInputs = [ pkgs.bashInteractive ];
        buildInputs = with pkgs; [
          python310
          python310Packages.pip
          python310Packages.virtualenv
          poetry
        ];
        shellHook = with pkgs; ''
          echo "Anda menggunakan Python versi $(python --version)"
        '';
      };

      devShells.Python311 = pkgs.mkShell {
        nativeBuildInputs = [ pkgs.bashInteractive ];
        buildInputs = with pkgs; [
          python311
          python311Packages.pip
          python311Packages.virtualenv
          poetry
        ];
        shellHook = with pkgs; ''
          echo "Anda menggunakan Python versi $(python --version)"
        '';
      };

      devShells.PHP81 = pkgs.mkShell {
        nativeBuildInputs = [ pkgs.bashInteractive ];
        buildInputs = with phps.packages.${sys}; [
          env-php81
        ];
        shellHook = with pkgs; ''
          echo "Anda menggunakan PHP versi $(php --version)"
          echo "Anda menggunakan Composer versi $(composer --version)"
        '';
      };

      devShells.PHP74 = pkgs.mkShell {
        nativeBuildInputs = [ pkgs.bashInteractive ];
        buildInputs = with phps.packages.${sys}; [
          env-php74
        ];
        shellHook = with pkgs; ''
          echo "Anda menggunakan PHP versi $(php --version)"
          echo "Anda menggunakan Composer versi $(composer --version)"
        '';
      };

      devShells.PHP56 = pkgs.mkShell {
        nativeBuildInputs = [ pkgs.bashInteractive ];
        buildInputs = with phps.packages.${sys}; [
          env-php56
        ];
        shellHook = with pkgs; ''
          echo "Anda menggunakan PHP versi $(php --version)"
          echo "Anda menggunakan Composer versi $(composer --version)"
        '';
      };

    });
}
