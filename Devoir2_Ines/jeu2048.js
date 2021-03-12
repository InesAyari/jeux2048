/**
 * TP2
 * IFT3225: Technologie de l'internet
 * Ikram Djafri 20064328
 * Ines Ayari 20057529
 */


var continuer = true; //variable globale (si == true, l'utilisateur peut continuer à faire des déplacements, si == false, il ne peut plus bouger et la partie est terminée)
/**
 * Fonction initGrille()
 * Initie la grille du jeu (main du programme) et 
 * appelle les autres fonctions
 */

function initGille() {
    
    //demande à l'utlisateur la taille du tableau
    var N = prompt("Entrez la taille : ");
    while(N == 1 || isNaN(N)){ //validation de la taille du tableau
        N = prompt("Veuillez s'il-vous-plait entrer un nombre naturel supérieur à 1 :");
    }
    
    //ajout des éléments du document xhtml
    var body = document.getElementsByTagName("body")[0];
    var table = document.createElement("table");
    table.id = "table";
    var tBody = document.createElement("tbody");
    
    //création des lignes et des cases du tableau 
    for (var i = 0; i < N; i++) {
        var tr = document.createElement("tr");
        for (var j = 0; j < N; j++) {
            var td = document.createElement("td");
            tr.appendChild(td);
        }
        tBody.appendChild(tr);
    }
    table.appendChild(tBody);
    body.appendChild(table);
    table.setAttribute("border", "2");

    //appel du début de jeu (voir fonction pour précisions)
    newGame();

    //si la variable continuer == true, on enregistre la touche qui est pressée par l'utilisateur
    if(continuer == true){ 
        document.onkeydown = evenement;
        }
    
    //nombre de déplacements = 0
    document.getElementById("nbDeplacements").innerHTML = 0;
    
    
}

/**
 * Fonction viderTable()
 * vide les valeurs des cellules du tableau et
 * appelle la fonction changerCouleur() 
 */
function viderTable() {
    var numRows = document.getElementById("table").rows.length;
    var numColumns = document.getElementById("table").rows[0].cells.length;
    for (var i = 0; i < numRows; i++) {
        for (var j = 0; j < numColumns; j++) {
            if (document.getElementById("table").rows[i].cells[j].innerHTML != '') {
                document.getElementById("table").rows[i].cells[j].innerHTML = '';
                 changerCouleur(i,j);
            }
        }
    }
}

/**
 * Fonction evenement
 * prend en paramètre l'événement (touche pressée) et fait le déplacement correspondant
 * @param {*} event 
 */
function evenement(event) {

    var temp =document.getElementById("nbDeplacements").innerHTML;
    var numRows = document.getElementById("table").rows.length; //nombre de ligne du tableau
    var numColumns = document.getElementById("table").rows[0].cells.length; //nombre de colonnes du tableau
    
    if (event.keyCode == '38') { //flèche du haut pressé implique un déplacement vers le haut (i-1)
        
        for (var k = 0; k < numRows; k++) { //la variable k est le nombre de fois qu'un déplacement de 1 case est fait
            for (var i = 0; i < numRows; i++) {
                for (var j = 0; j < numColumns; j++) {
                    
                    if (i == 0) continue; //cases de la forme [0,j] : on ne fait pas de mouvement vers le haut

                    //vérifie en premier si la case [i,j] et la case [i-1,j] sont vides et si elles n'ont pas été "mergée" encore
                    if (document.getElementById("table").rows[i].cells[j].innerHTML != '' && (document.getElementById("table").rows[i].cells[j].innerHTML == document.getElementById("table").rows[i-1].cells[j].innerHTML) &&
                    (document.getElementById("table").rows[i].cells[j].className != "merged" && document.getElementById("table").rows[i -1].cells[j].className != "merged")) {
                       
                        //si c'est le cas, la valeur de la case [i,j] = 2*[i,j] 
                        document.getElementById("table").rows[i-1].cells[j].innerHTML = Number(document.getElementById("table").rows[i-1].cells[j].innerHTML) * 2;
                        document.getElementById("table").rows[i].cells[j].innerHTML = '';
                        changerCouleur(i-1,j); //changement de la couleur des cellules en fonction de leur valeur
                        changerCouleur(i,j);
                        
                        //les cases ayant été "mergées" font partie de la classe merged (pour ne pas faire plusieurs opérations en un seul mouvement)
                        document.getElementById("table").rows[i -1].cells[j].className = "merged";
                    
                    } else if (document.getElementById("table").rows[i].cells[j].innerHTML != '' && document.getElementById("table").rows[i -1].cells[j].innerHTML == '') {
                        
                        document.getElementById("table").rows[i -1].cells[j].innerHTML = document.getElementById("table").rows[i].cells[j].innerHTML;
                        document.getElementById("table").rows[i].cells[j].innerHTML = '';
                        changerCouleur(i-1,j);
                        changerCouleur(i,j);
                    }
                }
            }
        }
        //après chaque déplacements (k déplacements jusqu'à arriver à une extrémité du tableau), on enlève de la classes merged toutes les cases du tableau (pour pouvoir faire d'autres opérations)
        for (var i = 0; i < numRows; i++) {
            for (var j = 0; j < numColumns; j++) {
                document.getElementById("table").rows[i].cells[j].className = '';
            }
        }
        //incrémentation du nombre de déplacements après chaque déplacement
       
        gameOver(); //on vérifie si on est dans un état de terminaison du jeu
        document.getElementById("nbDeplacements").innerHTML = Number(document.getElementById("nbDeplacements").innerHTML) + 1;
        
        if(temp == document.getElementById("nbDeplacements").innerHTML){
            
          confirm("La partie est finie, voulez-vous jouer une autre partie");
        }
        newCase(); //sinon, on rajoute une nouvelle valeur au hasard dans le tableau
        
    } else if (event.keyCode == '40') { //flèche du bas pressée implique un déplacement vers le bas (i+1)
        
        for (var k = 0; k < numRows; k++) {
            for (var i = 0; i < numRows; i++) {
                for (var j = 0; j < numColumns; j++) {
                    
                    if (i == numRows -1) continue; // les cases de la forme [numRows-1,j]: on ne fait pas de mouvement ver le bas 
                    
                    if (document.getElementById("table").rows[i].cells[j].innerHTML != '' && (document.getElementById("table").rows[i].cells[j].innerHTML == document.getElementById("table").rows[i + 1].cells[j].innerHTML) &&
                    (document.getElementById("table").rows[i].cells[j].className != "merged" && document.getElementById("table").rows[i + 1].cells[j].className != "merged")) {
                        
                        document.getElementById("table").rows[i + 1].cells[j].innerHTML = Number(document.getElementById("table").rows[i + 1].cells[j].innerHTML) * 2;
                        document.getElementById("table").rows[i].cells[j].innerHTML = '';
                        
                        document.getElementById("table").rows[i + 1].cells[j].className = "merged";
                        changerCouleur(i+1,j);
                        changerCouleur(i,j);

                    } else if (document.getElementById("table").rows[i].cells[j].innerHTML != '' && document.getElementById("table").rows[i + 1].cells[j].innerHTML == '') {
                        
                        document.getElementById("table").rows[i + 1].cells[j].innerHTML = document.getElementById("table").rows[i].cells[j].innerHTML;
                        document.getElementById("table").rows[i].cells[j].innerHTML = '';
                        changerCouleur(i+1,j);
                        changerCouleur(i,j);
                        
                    } 
                }
            }
        }
        for (var i = 0; i < numRows; i++) {
            for (var j = 0; j < numColumns; j++) {
                document.getElementById("table").rows[i].cells[j].className = '';
            }
        } 
        
        gameOver(); //on vérifie si on est dans un état de terminaison du jeu
        document.getElementById("nbDeplacements").innerHTML = Number(document.getElementById("nbDeplacements").innerHTML) + 1;
        
       if(temp == document.getElementById("nbDeplacements").innerHTML){
            confirm("La partie est finie, voulez-vous jouer une autre partie");
        }
        newCase();
        
    } else if (event.keyCode == '37') { //flèche vers la gauche pressée donc déplacement vers la gauche (j-1)
        
        for (var k = 0; k < numColumns; k++) {
            
            for (var i = 0; i < numRows; i++) {
                for (var j = 0; j < numColumns; j++) {
                    
                    if (j == 0) continue; //cases de la forme [i,0]
                    
                    if (document.getElementById("table").rows[i].cells[j].innerHTML != '' && (document.getElementById("table").rows[i].cells[j].innerHTML == document.getElementById("table").rows[i].cells[j -1].innerHTML) &&
                    (document.getElementById("table").rows[i].cells[j].className != "merged" && document.getElementById("table").rows[i].cells[j -1].className != "merged")) {
                       document.getElementById("table").rows[i].cells[j -1].innerHTML = Number(document.getElementById("table").rows[i].cells[j -1].innerHTML) * 2;
                        document.getElementById("table").rows[i].cells[j].innerHTML = '';
                        
                        document.getElementById("table").rows[i].cells[j -1].className = "merged";
                        changerCouleur(i,j-1);
                        changerCouleur(i,j);

                    } else if (document.getElementById("table").rows[i].cells[j].innerHTML != '' && document.getElementById("table").rows[i].cells[j -1].innerHTML == '') {
                        
                        document.getElementById("table").rows[i].cells[j -1].innerHTML = document.getElementById("table").rows[i].cells[j].innerHTML;
                        document.getElementById("table").rows[i].cells[j].innerHTML = '';
                        changerCouleur(i,j-1);
                        changerCouleur(i,j);
                    } 
                }
            }
        }
        for (var i = 0; i < numRows; i++) {
            for (var j = 0; j < numColumns; j++) {
                document.getElementById("table").rows[i].cells[j].className = '';
            }
        }
        
        gameOver(); //on vérifie si on est dans un état de terminaison du jeu
        document.getElementById("nbDeplacements").innerHTML = Number(document.getElementById("nbDeplacements").innerHTML) + 1;
        
        if(temp == document.getElementById("nbDeplacements").innerHTML){
             confirm("La partie est finie, voulez-vous jouer une autre partie");
        }
        newCase();
        
    } else if (event.keyCode == '39') { //flèche vers la droite pressée donc déplacement vers la droite
        
        for (var k = 0; k < numColumns; k++) {
            for (var i = 0; i < numRows; i++) {
                for (var j = 0; j < numColumns; j++) {
                    
                    if (j == numColumns-1) continue; //cases de la forme [i,numColumns-1]
                    
                    if (document.getElementById("table").rows[i].cells[j].innerHTML != '' && (document.getElementById("table").rows[i].cells[j].innerHTML == document.getElementById("table").rows[i].cells[j + 1].innerHTML) &&
                    (document.getElementById("table").rows[i].cells[j].className != "merged" && document.getElementById("table").rows[i].cells[j + 1].className != "merged")) {
                        
                        document.getElementById("table").rows[i].cells[j + 1].innerHTML = Number(document.getElementById("table").rows[i].cells[j + 1].innerHTML) * 2;
                        document.getElementById("table").rows[i].cells[j].innerHTML = '';
                        changerCouleur(i,j+1);
                        changerCouleur(i,j);
                        document.getElementById("table").rows[i].cells[j + 1].className = "merged";

                    } else if (document.getElementById("table").rows[i].cells[j].innerHTML != '' && document.getElementById("table").rows[i].cells[j + 1].innerHTML == '') {
                        document.getElementById("table").rows[i].cells[j + 1].innerHTML = document.getElementById("table").rows[i].cells[j].innerHTML;
                        document.getElementById("table").rows[i].cells[j].innerHTML = '';
                        changerCouleur(i,j+1);
                        changerCouleur(i,j)   
                    } 
                }
            }
        }
        for (var i = 0; i < numRows; i++) {
            for (var j = 0; j < numColumns; j++) {
                document.getElementById("table").rows[i].cells[j].className = '';
            }
        }
        
        gameOver(); //on vérifie si on est dans un état de terminaison du jeu
        document.getElementById("nbDeplacements").innerHTML = Number(document.getElementById("nbDeplacements").innerHTML) + 1;
        
        if(temp ==document.getElementById("nbDeplacements").innerHTML){
            confirm("La partie est finie, voulez-vous jouer une autre partie");
        }
        newCase();
        
    }
}

/**
 * Fonction newCase()
 * ajoute la valeur de 2 ou de 4 à une case choisie aléatoirement
 */
function newCase() {
    
    var numRows = document.getElementById("table").rows.length;
    var numColumns = document.getElementById("table").rows[0].cells.length;
    var nbcase = 0;
    
    do {
        var numRandom1 = Math.floor(Math.random() * numRows); //index i de la case
        var numRandom2 = Math.floor(Math.random() * numColumns); //index j de la case
        
        if (document.getElementById("table").rows[numRandom1].cells[numRandom2].innerHTML == '') { //on change la valeur seulement si la case n'avait pas déjà une valeur
            document.getElementById("table").rows[numRandom1].cells[numRandom2].innerHTML = Math.random() < 0.5 ? 2: 4;
            nbcase++;
             
            changerCouleur(numRandom1,numRandom2);
            
        }
    }
    while (nbcase < 1); //s'il y avait déjà une valeur à la case de départ, on choisit une autre case
}

/**
 * Fonction newGame()
 * change la valeur du nombre de déplacements, vide la table et initalise deux cases aléatoirement
 */
function newGame() {
    
           //  confirm("La partie est finie, voulez-vous jouer une autre partie");
        
    document.getElementById("nbDeplacements").innerHTML = 0; //nouvelle partie => nombre de déplacements = 0 
    viderTable();//on vide les valeurs des cases du tableau

    var numRows = document.getElementById("table").rows.length;
    var numColumns = document.getElementById("table").rows[0].cells.length;
    
    /**
     * ajout des deux cases aléatoirement
     */
    var numRandom1 = Math.floor(Math.random() * numRows);
    var numRandom2 = Math.floor(Math.random() * numColumns);
    document.getElementById("table").rows[numRandom1].cells[numRandom2].innerHTML = 2;
    document.getElementById("table").rows[numRandom1].cells[numRandom2];
    changerCouleur(numRandom1,numRandom2);
    var temp1 = numRandom1;
    var temp2 = numRandom2;
    numRandom1 = Math.floor(Math.random() * numRows);
    numRandom2 = Math.floor(Math.random() * numColumns);
    
    while (temp1 == numRandom1 && temp2 == numRandom2) {
        numRandom1 = Math.floor(Math.random() * numRows);
        numRandom2 = Math.floor(Math.random() * numColumns);
    }
    document.getElementById("table").rows[numRandom1].cells[numRandom2].innerHTML = Math.random() < 0.5 ? 2: 4;
    changerCouleur(numRandom1,numRandom2);
    
    
}


/**
 * Fonction changerCouleur()
 * @param c: ligne de la case 
 * @param l: colonne de la case 
 * 
 */
//Cette fonction change la couleur de la case selon sa valeur
function changerCouleur(c,l) {

    switch (document.getElementById("table").rows[c].cells[l].innerHTML) {
        case "2":
        document.getElementById("table").rows[c].cells[l].style.backgroundColor ='#BB9ECB';
        break;
        case "4":
        document.getElementById("table").rows[c].cells[l].style.backgroundColor ='#8EC8D4';
        break;
        case "8":
        document.getElementById("table").rows[c].cells[l].style.backgroundColor ='#D4C48E';
        break;
        case "16":
        document.getElementById("table").rows[c].cells[l].style.backgroundColor ='#E6AF77';
        break;
        case "32":
        document.getElementById("table").rows[c].cells[l].style.backgroundColor ='#F0F3BD';
        break;
        case "64":
        document.getElementById("table").rows[c].cells[l].style.backgroundColor ='#CCD1D1';
        break;
        case "128":
        document.getElementById("table").rows[c].cells[l].style.backgroundColor ='#D5F5E3';
        break;
        break;
        case "256":
        document.getElementById("table").rows[c].cells[l].style.backgroundColor ='#F8C471';
        break;
        break;
        case "512":
        document.getElementById("table").rows[c].cells[l].style.backgroundColor ='#76D7C4';
        break;
        case "1024":
        document.getElementById("table").rows[c].cells[l].style.backgroundColor ='#B2C3C0';
        break;
        case "2048":
        document.getElementById("table").rows[c].cells[l].style.backgroundColor ='#D6E71A';
        break;
        default:
        document.getElementById("table").rows[c].cells[l].style.backgroundColor ='#EEC7F7';
        break;
    }
}

/**
 * Fonction gameOver()
 * vérifie s'il y a la valeur 2048 dans le jeu
 * vérifie s'il n'y a plus de cases vides dans le tableau et s'il n'a fait aucun mouvement pour fusionner 2 cases alors le jeu est terminé
 */
  function gameOver() {

    var numRows = document.getElementById("table").rows.length;
    var numColumns = document.getElementById("table").rows[0].cells.length;
    
    var nbCases = numRows *numColumns; //nombre de cases dans le tableau 
    for (var i = 0; i < numRows; i++) {
        for (var j = 0; j < numColumns; j++) {
            if (document.getElementById("table").rows[i].cells[j].innerHTML != '') { //s'il y a une case non vide
                nbCases--;
            }
            if(Number(document.getElementById("table").rows[i].cells[j].innerHTML) == 2048){ //s'il y a une case qui contient la valeur 2048, l'utilisateur a gagné
                var reponse = confirm("Vous avez obtenu 2048, vous avez gagné! Voulez-vous jouer une autre partie?");
                if(reponse == true){ //si l'utilisateur accepte de jouer une autre partie
                    newGame();
                }else{ //si l'utilisateur ne veut pas jouer de deuxième partie
                    continuer = false;
                    window.stop();
                }
            }
        }
    }
    if (encoreCaseVide()==false &&  testerCote()==false ){ //si le nombre de case vide est égale à 0 et que le joueur n'a fait aucun mouvement qui permet de fusionner deux cases, le jeu est terminé
        var reponse = confirm("La partie est finie, voulez-vous jouer une autre partie");
            if(reponse == true){ //si l'utilisateur veut jouer une deuxième partie
                    newGame();
                    viderTable();
                    newCase();
            }else{ //si l'utilisateur ne veut pas jouer de deuxième partie
                continuer = false;
                window.stop();
            }
    }else{
        document.onkeydown = evenement;}

}
/**
 * Fonction encoreCaseVide()
 * vérifie s'il reste des cases vides dans le tableau
 */
function encoreCaseVide() {

    var numRows = document.getElementById("table").rows.length;
    var numColumns = document.getElementById("table").rows[0].cells.length;
    
    var nbCases = numRows * numColumns;//nombre de cases dans le tableau
    
    for (var i = 0; i < numRows; i++) {
        for (var j = 0; j < numColumns; j++) {
            if (document.getElementById("table").rows[i].cells[j].innerHTML != '') {
                //s'il y a une case non vide
                nbCases--;
            }
        }
    }
    if (nbCases == 0) //s'il n'y a pas de cases vides
        return false;
    else
        return true;
}
/**
 * Fonction testerCote()
 * cette fonction verifie s'il y a des additions possibles
 */ 

function testerCote() {
    
    var numRows = document.getElementById("table").rows.length;
    var numColumns = document.getElementById("table").rows[0].cells.length;
    
    var encore = 0; //est initialisée à 0, si la fonction trouve 2 cases ayant les mêmes valeurs côte à côte alors encore est incrémentée
    for (var i = 1; i < numRows -1; i++) {
        for (var j = 1; j < numColumns -1; j++) {
            
            if(i==0){
                if(j==0){
                    if((document.getElementById("table").rows[i].cells[j].innerHTML == document.getElementById("table").rows[i].cells[j+1])|| 
                    (document.getElementById("table").rows[i].cells[j].innerHTML == document.getElementById("table").rows[i+1].cells[j].innerHTML)){
                        encore++;
                    }
                }
                else if(j == numColumns-1){
                    if((document.getElementById("table").rows[i].cells[j].innerHTML == document.getElementById("table").rows[i].cells[j-1])|| 
                    (document.getElementById("table").rows[i].cells[j].innerHTML == document.getElementById("table").rows[i+1].cells[j].innerHTML)){
                        encore++;
                    }
                }
                else{
                    if((document.getElementById("table").rows[i].cells[j].innerHTML == document.getElementById("table").rows[i].cells[j+1])|| 
                    (document.getElementById("table").rows[i].cells[j].innerHTML == document.getElementById("table").rows[i+1].cells[j].innerHTML)||
                    (document.getElementById("table").rows[i].cells[j].innerHTML == document.getElementById("table").rows[i].cells[j-1].innerHTML)){
                        encore++;
                    }
                }    
            }else if(i==numRows-1){
                if(j==0){
                    if((document.getElementById("table").rows[i].cells[j].innerHTML == document.getElementById("table").rows[i].cells[j+1])|| 
                    (document.getElementById("table").rows[i].cells[j].innerHTML == document.getElementById("table").rows[i-1].cells[j].innerHTML)){
                        encore++;
                    }
                }else if(j==numColumns-1){
                    if((document.getElementById("table").rows[i].cells[j].innerHTML == document.getElementById("table").rows[i].cells[j-1])|| 
                    (document.getElementById("table").rows[i].cells[j].innerHTML == document.getElementById("table").rows[i-1].cells[j].innerHTML)){
                        encore++;
                    }
                }else{
                    if((document.getElementById("table").rows[i].cells[j].innerHTML == document.getElementById("table").rows[i].cells[j-1])|| 
                    (document.getElementById("table").rows[i].cells[j].innerHTML == document.getElementById("table").rows[i-1].cells[j].innerHTML) ||
                    (document.getElementById("table").rows[i].cells[j].innerHTML == document.getElementById("table").rows[i].cells[j+1].innerHTML)){
                        encore++;
                    }
                    
                }               
            }else if(j==0){
                 if((document.getElementById("table").rows[i].cells[j].innerHTML == document.getElementById("table").rows[i].cells[j+1])|| 
                    (document.getElementById("table").rows[i].cells[j].innerHTML == document.getElementById("table").rows[i-1].cells[j].innerHTML)||
                    (document.getElementById("table").rows[i].cells[j].innerHTML == document.getElementById("table").rows[i+1].cells[j].innerHTML)){
                        encore++;
                    }
            }else if (j== numColumns -1){
                if((document.getElementById("table").rows[i].cells[j].innerHTML == document.getElementById("table").rows[i].cells[j-1])|| 
                    (document.getElementById("table").rows[i].cells[j].innerHTML == document.getElementById("table").rows[i-1].cells[j].innerHTML)||
                    (document.getElementById("table").rows[i].cells[j].innerHTML == document.getElementById("table").rows[i+1].cells[j].innerHTML)){
                        encore++;
                    }
            }
            else{
                 if (document.getElementById("table").rows[i].cells[j].innerHTML == document.getElementById("table").rows[i].cells[j + 1].innerHTML ||
                    (document.getElementById("table").rows[i].cells[j].innerHTML == document.getElementById("table").rows[i].cells[j -1].innerHTML) || 
                    (document.getElementById("table").rows[i].cells[j].innerHTML == document.getElementById("table").rows[i + 1].cells[j].innerHTML) || 
                    (document.getElementById("table").rows[i].cells[j].innerHTML == document.getElementById("table").rows[i -1].cells[j].innerHTML)) {
                     encore++;
                 }
            }
        }
    }
    if (encore == 0) {
        return false;
    } else {
        return true;
    }
}