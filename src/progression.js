import {apprenants} from './data.js'
//import PromptSync from 'prompt-sync';



export function normaliserNom(nom){
    nom = nom.replace(/[^a-zA-Z\s]/g , "").trim().replace(/\s+/g, " ").toLowerCase().split(" ");
    
    for (let i = 0; i < nom.length; i++) {
    nom[i] = nom[i].charAt(0).toUpperCase() + nom[i].slice(1)        
    }
    nom = nom.join(" ")

    return nom
    }

function validerResultat(jour, exercicesTermine 
    
){
    if (jour < 1 || jour > 7 || typeof jour !== "Number"){
        console.log("incorrect jour")
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

function ajouterApprenanat(id, name, city) {
    for (let apprenant of apprenants) {
        if (apprenant.id === id) {
            console.log("ce apprenant deja existe")
            return false;
        }
    }

    name = normaliserNom(name)
    const nouvelApprenant = {
        id: id,
        name: name,
        city: city,
        resultats: []
    }

    apprenants.push(nouvelApprenant)


    return true;
}
ajouterApprenanat(9, "mohamed ahricha", "nador")





function rechercherApprenand(name) {
    for (let i = 0; i < apprenants.length; i++) {
        if (apprenants[i].nomComplet == normaliserNom(name)) {
            return apprenants[i]
        }
    }
}

console.table(rechercherApprenand("sara dev"));


















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





