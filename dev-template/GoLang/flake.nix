{
  description = "A Nix-flake-based Go development environment";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";
    utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, utils }:

    utils.lib.eachDefaultSystem (system:
      let
        goVersion = 19;
        overlays =
          [ (final: prev: { go = prev."go_1_${toString goVersion}"; }) ];
        pkgs = import nixpkgs { inherit overlays system; };

      in {
        devShells.default = pkgs.mkShellNoCC {
          buildInputs = with pkgs; [ go gopls gotools golangci-lint ];
          shellHook = ''
            ${pkgs.go}/bin/go version
          '';
        };
      });
}
