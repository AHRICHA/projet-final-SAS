import { apprenants } from "./data.js";
import PromptSync from "prompt-sync";

const prompt = PromptSync()



export function normaliserNom(nom){
    nom = nom.replace(/[^a-zA-Z\s]/g , "").trim().replace(/\s+/g, " ").toLowerCase().split(" ");
    
    for (let i = 0; i < nom.length; i++) {
    nom[i] = nom[i].charAt(0).toUpperCase() + nom[i].slice(1)        
    }
    nom = nom.join(" ")

    return nom
    }

//  export function validerResultat(jour, exercicesTermine 
    
// ){
    if (jour < 1 || jour > 7 || typeof jour !== "Number"){{        console.log("incorrect jour")
        return false
    }


    if (exercicesTermine < 0 || exercicesTermine > 20 || typeof exercicesTermine !== "number") {
        console.log("incorrect nombre")
        return false
    }

    if (totalExercices !== 20 || typeof totalExercices !== "number"){
        console.log("incorrect")
        return false
    }
    return true
}









//console.log(validerResultat(5))








// import {apprenants} from '../src/data.js'
// import { normaliserNom } from '../src/progression.js';

export function ajouterApprenanat(nomComplet, city) {
    let id = apprenants.length + 1 
    let nomComplet = prompt("enter your name")
    let ville = prompt("entrer votre ville")
    let resultats = []
    for (let apprenant of apprenants) {
        if (apprenant.id === id) {
            console.log("ce apprenant deja existe")
            console.log("");
        }
    }

    // name = normaliserNom(name)
    const nouvelApprenant = {
        id: id ,
        nomComplet: normaliserNom(nomComplet),
        ville: city,
        resultats: []
    }

    apprenants.push(nouvelApprenant)


    return true;
}







export function rechercherApprenand() {
    let  name = prompt("please enter your name : ")
    for (let i = 0; i < apprenants.length; i++) {
        if (apprenants[i].nomComplet == normaliserNom(name)) {
            console.table (apprenants[i])
        }
    }
    console.log("verifie votre choix")
}
//console.table(rechercherApprenand());


















//  function normaliserNom(){

// }
// console.log(normaliserNom("TEST/ TEST*"));


// TEST/ DEV**

// Test Dev

// function ajouterCandidat(){
//     for(let apprenant of apprenants)
//         if(apprenant.id == id){
//             console.log("this learner already exist")
//         }
//         apprenants.push(apprenant)
// return }

// let candid = {
//     id : 2,
//     name : "ahmed",
//     city : "nador",
//     result : []
// }
// apprenants.push(candid)
//console.log(ajouterCandidat())



// console.log(normaliserNom("TEST/ TEST*"));


// TEST/ DEV**

// Test Dev

// function ajouterCandidat(){
//     for(let apprenant of apprenants)
//         if(apprenant.id == id){
//             console.log("this learner already exist")
//         }
//         apprenants.push(apprenant)
// return }

// let candid = {
//     id : 2,
//     name : "ahmed",
//     city : "nador",
//     result : []
// }
// apprenants.push(candid)
//console.log(ajouterCandidat())


//  function normaliserNom(){

// }
// console.log(normaliserNom("TEST/ TEST*"));


// TEST/ DEV**

// Test Dev

// function ajouterCandidat(){
//     for(let apprenant of apprenants)
//         if(apprenant.id == id){
//             console.log("this learner already exist")

//         }
//         apprenants.push(apprenant)
// return }

// let candid = {
//     id : 2,
//     name : "ahmed",
//     city : "nador",
//     result : []
// }
// apprenants.push(candid)
//console.log(ajouterCandidat())





