{
  description = "A Nix-flake-based Node.js development environment";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";
    utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, utils }:

    utils.lib.eachDefaultSystem (system:
      let
        nodejsVersion = 14;
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
