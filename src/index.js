import { apprenants } from "./data.js";
import PromptSync from "prompt-sync";

import {  rechercherApprenand } from "./progression.js"
const prompt = PromptSync()
let choix

do{ 
    console.log("SAS PROGRESS CONSOLE")
console.log("1. Afficher le tableau de bord")
console.log("2. Afficher la liste des apprenants")
console.log("3. Ajouter un apprenant")
console.log("4. Consulter un apprenant par identifiant")
console.log("5. Ajouter ou modifier le résultat d'une journée")
console.log("6. Rechercher un apprenant par nom")
console.log("7. Filtrer les apprenants par niveau")
console.log("8. Trier les apprenants par progression décroissante")
console.log("9. Trier les apprenants par ordre alphabétique")
console.log("0. Quitter")

 choix = prompt("Votre choix :")
 choix = Number(choix)
switch(choix){
    case 1 : console.log("vous avez choisi 1")
        break;
    case 2 : console.log("vous choisi 2")
        break;
    case 3 : ajouterApprenanat(apprenants)
        break;
    case 4 : 
        break;
    case 5 :
        break;
    case 6 : rechercherApprenand(apprenants)
        break;
    case 7 :
        break;
    case 8 :
        break;
    case 9 :
        break;
    case 0 : console.log("adios")
    default : console.log("merci d avoir verifie votre choix")
}
} while (choix != 0)

