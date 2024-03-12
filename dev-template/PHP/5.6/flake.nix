{
  description = "PHP DEV Shell";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";
    flake-utils.url = "github:numtide/flake-utils";
    phps.url = "github:loophp/nix-shell";
  };

  outputs = { self, nixpkgs, flake-utils, phps, ... }:
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
