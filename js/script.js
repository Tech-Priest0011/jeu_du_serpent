document.addEventListener("DOMContentLoaded", function(event) {

    //Jeu
    class Jeu{
        constructor(_idSvg, _idPointage) {
            console.log("Creation jeu");

            this.s = Snap(_idSvg); //recuperation du svg
            this.sortiePointage = document.querySelector(_idPointage); //recuperation du pointage
            this.carre = 20; //grandeur px d'un carre
            this.grille = 15; //nombre de carre

            //this.nouvellePartie();  //test de la nouvellePartie
        }

        nouvellePartie(){
            this.finPartie();

            this.affichagePointage(1);

            this.pomme = new Pomme(this); //nouvelle pomme et reference

            this.serpent = new Serpent(); //nouveau snek
        }

        finPartie(){
            if(this.pomme !== undefined){ //si il y a une pomme elle est supprimer
                this.pomme.supprimerPomme();
                this.pomme = undefined;
            }

        }

        affichagePointage(_lePointage){
            this.sortiePointage.innerHTML = _lePointage; //Ecrire le pointage dans le html
        }
    }

    //Serpent
    class Serpent{
        constructor() {
            console.log("Creation serpent");
        }
    }

    //Pomme
    class Pomme{
        constructor(_leJeu) {
            console.log("Creation pomme");

            this.leJeu = _leJeu; //Va chercher la classe jeu

            this.pomme = [];

            this.ajoutPomme();
        }

        ajoutPomme(){
            var posX = Math.floor(Math.random() * this.leJeu.grille); //Position aleatoire
            var posY = Math.floor(Math.random() * this.leJeu.grille);

            this.pomme = [this.leJeu.s.rect(posX * this.leJeu.carre, posY * this.leJeu.carre, this.leJeu.carre, this.leJeu.carre).attr({fill: 'red'}), posX, posY]; //creer les grandeurs du carre et couleur et trouve sa position
        }

        supprimerPomme(){
            this.pomme[0].remove(); //supprime la pomme
        }
    }

    var unePartie = new Jeu("#jeu", "#pointage"); //reference a la class Jeu

    var btnJouer = document.querySelector("#btnJouer"); //Aller chercher le btn
    btnJouer.addEventListener('click', nouvellePartie); //Action avec le btn

    function nouvellePartie(){
        unePartie.nouvellePartie(); //Appel une nouvelle partie dans la class jeu
    }

});