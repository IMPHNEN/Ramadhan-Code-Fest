{
  description = "Dev Shell";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, flake-utils, nixpkgs }:
    {
      templates = rec {
        Android = {
          path = ./Android;
          description = "Android development environment";
        };

        C = {
          path = ./C;
          description = "C development environment";
        };

        GoLang = {
          path = ./GoLang;
          description = "Go Lang development environment";
        };

        Java = {
          path = ./Java;
          description = "Java development environment";
        };

        Java11 = {
          path = ./Java/11;
          description = "Java development environment";
        };

        Java18 = {
          path = ./Java/18;
          description = "Java development environment";
        };

        Java19 = {
          path = ./Java/19;
          description = "Java development environment";
        };

        Kotlin = {
          path = ./Kotlin;
          description = "Kotlin development environment";
        };

        NodeJS = {
          path = ./NodeJS;
          description = "NodeJS development environment";
        };

        NodeJS14 = {
          path = ./NodeJS/14;
          description = "NodeJS development environment";
        };

        NodeJS16 = {
          path = ./NodeJS/16;
          description = "NodeJS development environment";
        };

        NodeJS18 = {
          path = ./NodeJS/18;
          description = "NodeJS development environment";
        };

        NodeJS19 = {
          path = ./NodeJS/19;
          description = "NodeJS development environment";
        };

        Python = {
          path = ./Python;
          description = "Python development environment";
        };

        Python310 = {
          path = ./Python/3.10;
          description = "Python development environment";
        };

        Python39 = {
          path = ./Python/3.9;
          description = "Python development environment";
        };

        Python38 = {
          path = ./Python/3.8;
          description = "Python development environment";
        };

        PHP = {
          path = ./PHP;
          description = "PHP development environment";
        };

        PHP80 = {
          path = ./PHP/8.0;
          description = "PHP development environment";
        };

        PHP81 = {
          path = ./PHP/8.1;
          description = "PHP development environment";
        };

        PHP74 = {
          path = ./PHP/7.4;
          description = "PHP development environment";
        };

        PHP56 = {
          path = ./PHP/7.4;
          description = "PHP development environment";
        };

        Haskell = {
          path = ./Haskell;
          description = "Haskell development environment";
        };

        # rt = rust-toolchain;
      };
    } // flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = import nixpkgs { inherit system; };
        inherit (pkgs) mkShell writeScriptBin;
        exec = pkg: "${pkgs.${pkg}}/bin/${pkg}";

        format = writeScriptBin "format" ''
          ${exec "nixpkgs-fmt"} **/*.nix
        '';

        dvt = writeScriptBin "dvt" ''
          if [ -z $1 ]; then
            echo "no template specified"
            exit 1
          fi

          TEMPLATE=$1

          ${exec "nix"} \
            --experimental-features 'nix-command flakes' \
            flake init \
            --template \
            "github:maulanasdqn/devshell#''${TEMPLATE}"
        '';

        update = writeScriptBin "update" ''
          for dir in `ls -d */`; do # Iterate through all the templates
            (
              cd $dir
              ${exec "nix"} flake update # Update flake.lock
              ${
                exec "direnv"
              } reload    # Make sure things work after the update
            )
          done
        '';
      in {
        devShells = {
          default = mkShell { packages = [ format update dvt ]; };
        };

        packages = rec {
          default = dvt;
          inherit dvt;
        };
      });
}
