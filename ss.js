// import PromptSync from "prompt-sync";

// const apprenants = [
//     {
//         id : prompt ("enter the id"),
//         name : prompt ("enter the name"),
//         city : prompt ("enter the city"),
//         result : [
//             {
//                 day : prompt ("enter the day"),
//                 exercicesFinished : prompt ("how much exercices finishd"),
//                 totalExercices : prompt ("how much the total of exercices in this day"),
//                 chalengeFinished : prompt ("did he finished the chalenge of that day YES/NO"),
//             },}
// ]]
// console.log(apprenants.id);


import {apprenants} from '../src/data.js'
//console.log(apprenants);
import { normaliserNom } from '../src/progression.js';

function ajouterApprenant(id, name, city) {
  // 1. Check ila l'id deja kayn
  for (let apprenant of apprenants) {
    if (apprenant.id === id) {
      console.log(`❌ L'id ${id} est déjà utilisé (par ${apprenant.nomComplet}).`);
      return false;
    }
  }

  // 2. Normalisation
  const nomNormalise = normaliserNom(name);
  const villeNormalisee = normaliserNom(city);

  // 3. Validation dyal l'ism
  if (nomNormalise === "") {
    console.log("❌ Le nom complet est obligatoire.");
    return false;
  }

  // 4. Créer l'object b l'properties s7i7a
  const nouvelApprenant = {
    id: id,
    nomComplet: nomNormalise,   // ✅ machi "name"
    ville: villeNormalisee,      // ✅ machi "city"
    resultats: []
  };

  // 5. Ajouter
  apprenants.push(nouvelApprenant);

  console.log(`✅ Apprenant "${nouvelApprenant.nomComplet}" ajouté avec succès.`);
  return true;
}

// Test
console.log(ajouterApprenant(9, "  mohamed  ", "  nador  "));
console.log(apprenants);
