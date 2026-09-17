import apprenants from 'progression.js'



function normaliserNom(nom){
    nom = nom.trim()
    nom = nom replace(/\s+/g, " ");
    nom = nom.toLowwerCase()
    nom = nom.split(" ")
    nom = nom.map(function(mot){
        return mot.charAT(0).toUppercase +(1).split
    })
} 









function ajouterCandidat(){
    for(let apprenant of apprenants)
        if(apprenant.id == id){
            console.log("this learner already exist")
        }
        apprenants.push(apprenant)
return }

let candid = {
    id : 2,
    name : "ahmed",
    city : "nador",
    result : []
}
apprenants.push(candid)
console.log(ajouterCandidat())




// function validerResultat(){
//     if (jour < 1 || jour > 7)
//         console.log("incorrect jour")
//     return false
// }
// {
//     if (exercicesTermine < 0 || exercicesTermine > 20)
//         console.log("incorrect numero")
//     return false
// }
// {
//     if (totalExercices !== 20)
//         console.log("incorrect")
//     return false
//     {
//         return true
//     }
// }

// function normaliserNom(){

// }

