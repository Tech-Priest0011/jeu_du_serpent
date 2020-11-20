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

            this.serpent = new Serpent(this); //nouveau snek
        }

        finPartie(){
            if(this.pomme !== undefined){ //si il y a une pomme elle est supprimer
                this.pomme.supprimerPomme();
                this.pomme = undefined;
            }
            if(this.serpent !== undefined){
                this.serpent.supprimerSerpent();
                this.serpent = undefined;
            }

        }

        affichagePointage(_lePointage){
            this.sortiePointage.innerHTML = _lePointage; //Ecrire le pointage dans le html
        }
    }

    //Serpent
    class Serpent{
        constructor(_leJeu) {
            console.log("Creation serpent");

            this.leJeu = _leJeu;

            this.currentX = -1;
            this.currentY = 0;
            this.nextX = 1;
            this.nextY = 0;
            this.serpentLongueur = 1;
            this.tblCarreSerpent = [];
            this.touche = false;
            this.vitesse = 250;
            this.timing = setInterval(this.controleSerpent.bind(this), this.vitesse);

            document.addEventListener("keydown", this.appuiTouche.bind(this)); //lier a la class serpent
        }

        appuiTouche(_evt){
            var evt = _evt;

            //console.log(evt.keyCode);

            this.deplacementSerpent(evt.keyCode); //obtien la touche
        }

        deplacementSerpent(directionCode){
            switch (directionCode){
                case 37: //fleche gauche
                    this.nextX = -1;
                    this.nextY = 0;
                    break;
                case 38: //fleche haut
                    this.nextX = 0;
                    this.nextY = -1;
                    break;
                case 39: //fleche droite
                    this.nextX = 1;
                    this.nextY = 0;
                    break;
                case 40: //fleche bas
                    this.nextX = 0;
                    this.nextY = 1;
                    break;
            }

            //console.log(this.nextX, this.nextY);

        }

        controleSerpent(){
            var prochainX = this.currentX + this.nextX;
            var prochainY = this.currentY + this.nextY;

            this.tblCarreSerpent.forEach(function(element){ //le serpent se touche
                if(prochainX === element[1] && prochainY === element[2]){
                    console.log("touche serpent");
                    this.leJeu.finPartie();
                    this.touche = true;
                }
            }.bind(this));

            if(prochainY < 0 || prochainX < 0  || prochainY > this.leJeu.grille-1 || prochainX > this.leJeu.grille-1){
                console.log("Limite");
                this.leJeu.finPartie();
                this.touche = true;
            }

            if(!this.touche){
                if(this.currentX === this.leJeu.pomme.pomme[1] && this.currentY === this.leJeu.pomme.pomme[2]){
                    this.serpentLongueur++;

                    this.leJeu.affichagePointage(this.serpentLongueur);

                    this.leJeu.pomme.supprimerPomme();
                    this.leJeu.pomme.ajoutPomme();
                }
                this.dessinCarre(prochainX, prochainY);
                this.currentX = prochainX;
                this.currentY = prochainY;
            }
        }

        dessinCarre(x, y){
            var unCarre = [this.leJeu.s.rect(x * this.leJeu.carre, y * this.leJeu.carre, this.leJeu.carre, this.leJeu.carre), x, y]; //dessine le serpent
            this.tblCarreSerpent.push(unCarre); //Mets les carres dans un tableau pour avoir la longueur

            if(this.tblCarreSerpent.length > this.serpentLongueur){
                this.tblCarreSerpent[0][0].remove(); //enleve un carre a l'ecran
                this.tblCarreSerpent.shift(); //enleve du tableau
            }
        }

        supprimerSerpent(){
            clearInterval(this.timing); //arrete le timer

            while (this.tblCarreSerpent.length > 0){ //supprime le serpent
                this.tblCarreSerpent[0][0].remove();
                this.tblCarreSerpent.shift();
            }
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