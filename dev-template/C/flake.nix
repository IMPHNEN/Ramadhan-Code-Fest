{
  description = "C or C++ DEV Shell";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils, ... }:
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
                allowUnfree = true;
              };
            }
          ));

        pkgs = import nixpkgs {
          inherit system;
          config.allowUnfree = true;
        };

        run = pkg: "${pkgs.${pkg}}/bin/${pkg}";
      in

      {

        devShells.default = pkgs.mkShell {
          nativeBuildInputs = [ pkgs.bashInteractive ];
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

      }
    );

}
