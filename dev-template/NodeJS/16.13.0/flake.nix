{
  description = "A Nix-flake-based Node.js development environment";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";
    utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, utils }:

    utils.lib.eachDefaultSystem (system:
      let
        nodejsVersion = 16;
        packages = {
          nodejs16-13-0 = pkgs.stdenv.mkDerivation {
            name = "nodejs-18.15.0";
            src = pkgs.fetchurl {
              url =
                "https://nodejs.org/dist/v18.15.0/node-v18.15.0-darwin-arm64.tar.xz";
              sha256 = "sha256-VxmVmkY6JlUJ0n68mMqw9qCcPh9oJ4WcwdfCma5WqLw=";
            };
            installPhase = ''
              echo "here"
              mkdir -p $out
              tar xf $src --strip-components=1 -C $out
              cp $src $out/bin/node
              chmod +x $out/bin/node
            '';
          };
        };
        overlays = [
          (final: prev: rec {
            nodejs = prev."nodejs-${toString nodejsVersion}_x";
            pnpm = prev.nodePackages.pnpm;
            yarn = (prev.yarn.override { inherit nodejs; });
          })
        ];

        pkgs = import nixpkgs { inherit overlays system; };

      in {
        devShells.default = pkgs.mkShell {
          buildInputs = with pkgs; [ nodejs pnpm yarn ];

          shellHook = with pkgs; ''
            echo "node `${nodejs}/bin/node --version`"
            echo "yarn `${yarn}/bin/yarn --version`"
            echo "pnpm `${pnpm}/bin/pnpm --version`"
          '';
        };

      });
}
