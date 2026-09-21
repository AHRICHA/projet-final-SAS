// ======================================================
// PROJET FINAL SAS - TABLEAU DE BORD PEDAGOGIQUE
// JavaScript uniquement - Version fichier unique
// ======================================================


// ======================================================
// 1. DONNEES
// ======================================================
import promptSync from "prompt-sync";

const prompt = promptSync();



let apprenants = [
    {
        id: 7,
        nomComplet: "Ahricha Mohamed",
        ville: "Nador",
        resultats: [
            {
                jour: 1,
                totalExercices: 20,
                exercicesTermines: 9,
                challengeFinished: false
            },
            {
                jour: 2,
                totalExercices: 20,
                exercicesTermines: 11,
                challengeFinished: false
            },
            {
                jour: 3,
                totalExercices: 20,
                exercicesTermines: 6,
                challengeFinished: false
            },
            {
                jour: 4,
                totalExercices: 20,
                exercicesTermines: 9,
                challengeFinished: false
            },
            {
                jour: 5,
                totalExercices: 20,
                exercicesTermines: 11,
                challengeFinished: false
            },
            {
                jour: 6,
                totalExercices: 20,
                exercicesTermines: 10,
                challengeFinished: false
            }
        ]
    },

    {
        id: 8,
        nomComplet: "Karim Amine",
        ville: "Nador",
        resultats: [
            {
                jour: 1,
                totalExercices: 20,
                exercicesTermines: 15,
                challengeFinished: true
            },
            {
                jour: 2,
                totalExercices: 20,
                exercicesTermines: 18,
                challengeFinished: true
            }
        ]
    }
];


// ======================================================
// 2. NORMALISER UN NOM
// ======================================================

function normaliserNom(nom) {

    nom = nom.trim();

    nom = nom.replace(/\s+/g, " ");

    nom = nom.toLowerCase();

    nom = nom
        .split(" ")
        .map(function (mot) {
            return mot.charAt(0).toUpperCase() + mot.slice(1);
        })
        .join(" ");

    return nom;
}


// ======================================================
// 3. VERIFIER SI UN ID EXISTE
// ======================================================

function idExiste(id) {

    for (let apprenant of apprenants) {

        if (apprenant.id === id) {
            return true;
        }
    }

    return false;
}


// ======================================================
// 4. AJOUTER UN APPRENANT
// ======================================================

function ajouterApprenant() {

    let id = Number(prompt("Entrez l'ID de l'apprenant :"));

    if (!Number.isInteger(id) || id <= 0) {
        console.log("❌ ID invalide.");
        return;
    }

    if (idExiste(id)) {
        console.log("❌ Cet apprenant existe deja.");
        return;
    }

    let nom = prompt("Entrez le nom complet :");

    if (!nom || nom.trim() === "") {
        console.log("❌ Le nom est obligatoire.");
        return;
    }

    nom = normaliserNom(nom);

    let ville = prompt("Entrez la ville :");

    if (!ville || ville.trim() === "") {
        console.log("❌ La ville est obligatoire.");
        return;
    }

    ville = normaliserNom(ville);

    let nouvelApprenant = {
        id: id,
        nomComplet: nom,
        ville: ville,
        resultats: []
    };

    apprenants.push(nouvelApprenant);

    console.log("✅ Apprenant ajoute avec succes.");
    console.table(nouvelApprenant);
}


// ======================================================
// 5. AFFICHER TOUS LES APPRENANTS
// ======================================================

function afficherApprenants() {

    if (apprenants.length === 0) {
        console.log("❌ Aucun apprenant.");
        return;
    }

    console.table(apprenants);
}


// ======================================================
// 6. RECHERCHER PAR ID
// ======================================================

function rechercherParId() {

    let id = Number(prompt("Entrez l'ID :"));

    if (!Number.isInteger(id)) {
        console.log("❌ ID invalide.");
        return;
    }

    for (let apprenant of apprenants) {

        if (apprenant.id === id) {

            console.log("✅ Apprenant trouve :");
            console.log(apprenant);

            return;
        }
    }

    console.log("❌ Aucun apprenant avec cet ID.");
}


// ======================================================
// 7. RECHERCHER PAR NOM
// ======================================================

function rechercherParNom() {

    let recherche = prompt("Entrez une partie du nom :");

    if (!recherche || recherche.trim() === "") {
        console.log("❌ Recherche invalide.");
        return;
    }

    recherche = recherche.trim().toLowerCase();

    let resultats = [];

    for (let apprenant of apprenants) {

        if (apprenant.nomComplet.toLowerCase().includes(recherche)) {
            resultats.push(apprenant);
        }
    }

    if (resultats.length === 0) {
        console.log("❌ Aucun apprenant trouve.");
        return;
    }

    console.log("✅ Resultat de la recherche :");
    console.table(resultats);
}


// ======================================================
// 8. AJOUTER / MODIFIER UN RESULTAT
// ======================================================

function ajouterOuModifierResultat() {

    let id = Number(prompt("Entrez l'ID de l'apprenant :"));

    let apprenant = null;

    for (let element of apprenants) {

        if (element.id === id) {
            apprenant = element;
            break;
        }
    }

    if (apprenant === null) {
        console.log("❌ Apprenant introuvable.");
        return;
    }

    let jour = Number(prompt("Entrez le jour (1-7) :"));

    if (!Number.isInteger(jour) || jour < 1 || jour > 7) {
        console.log("❌ Le jour doit etre compris entre 1 et 7.");
        return;
    }

    let totalExercices = Number(
        prompt("Nombre total d'exercices :")
    );

    if (
        !Number.isInteger(totalExercices) ||
        totalExercices < 0
    ) {
        console.log("❌ Nombre total invalide.");
        return;
    }

    let exercicesTermines = Number(
        prompt("Nombre d'exercices termines :")
    );

    if (
        !Number.isInteger(exercicesTermines) ||
        exercicesTermines < 0
    ) {
        console.log("❌ Nombre d'exercices termines invalide.");
        return;
    }

    if (exercicesTermines > totalExercices) {
        console.log(
            "❌ Les exercices termines ne peuvent pas depasser le total."
        );
        return;
    }

    let challenge = prompt(
        "Challenge termine ? (oui/non)"
    );

    challenge = challenge.toLowerCase().trim();

    if (challenge !== "oui" && challenge !== "non") {
        console.log("❌ Repondez par oui ou non.");
        return;
    }

    let challengeFinished = challenge === "oui";

    let resultat = {
        jour: jour,
        totalExercices: totalExercices,
        exercicesTermines: exercicesTermines,
        challengeFinished: challengeFinished
    };

    let resultatExiste = false;

    for (let i = 0; i < apprenant.resultats.length; i++) {

        if (apprenant.resultats[i].jour === jour) {

            apprenant.resultats[i] = resultat;

            resultatExiste = true;

            break;
        }
    }

    if (resultatExiste) {

        console.log("✅ Resultat du jour modifie.");

    } else {

        apprenant.resultats.push(resultat);

        console.log("✅ Resultat ajoute.");
    }
}


// ======================================================
// 9. CALCULER LA PROGRESSION
// ======================================================

function calculerProgression(apprenant) {

    if (apprenant.resultats.length === 0) {

        return {
            exercicesTermines: 0,
            exercicesTotal: 0,
            pourcentage: 0,
            challengesTermines: 0,
            joursCompletes: 0
        };
    }

    let exercicesTermines = 0;
    let exercicesTotal = 0;
    let challengesTermines = 0;
    let joursCompletes = 0;

    for (let resultat of apprenant.resultats) {

        exercicesTermines += resultat.exercicesTermines;

        exercicesTotal += resultat.totalExercices;

        if (resultat.challengeFinished) {
            challengesTermines++;
        }

        if (
            resultat.totalExercices > 0 &&
            resultat.exercicesTermines === resultat.totalExercices
        ) {
            joursCompletes++;
        }
    }

    let pourcentage = 0;

    if (exercicesTotal > 0) {

        pourcentage =
            (exercicesTermines / exercicesTotal) * 100;
    }

    return {
        exercicesTermines: exercicesTermines,
        exercicesTotal: exercicesTotal,
        pourcentage: Number(pourcentage.toFixed(2)),
        challengesTermines: challengesTermines,
        joursCompletes: joursCompletes
    };
}


// ======================================================
// 10. AFFICHER LA PROGRESSION D'UN APPRENANT
// ======================================================

function afficherProgression() {

    let id = Number(prompt("Entrez l'ID de l'apprenant :"));

    let apprenant = null;

    for (let element of apprenants) {

        if (element.id === id) {
            apprenant = element;
            break;
        }
    }

    if (apprenant === null) {
        console.log("❌ Apprenant introuvable.");
        return;
    }

    let progression = calculerProgression(apprenant);

    console.log("--------------------------------");
    console.log("APPRENANT :", apprenant.nomComplet);
    console.log("ID :", apprenant.id);
    console.log("VILLE :", apprenant.ville);
    console.log("--------------------------------");
    console.log(
        "Exercices termines :",
        progression.exercicesTermines
    );
    console.log(
        "Exercices totaux :",
        progression.exercicesTotal
    );
    console.log(
        "Progression :",
        progression.pourcentage + "%"
    );
    console.log(
        "Challenges termines :",
        progression.challengesTermines
    );
    console.log(
        "Jours completes :",
        progression.joursCompletes
    );
    console.log("--------------------------------");
}


// ======================================================
// 11. AFFICHER TOUS LES APPRENANTS AVEC PROGRESSION
// ======================================================

function afficherTableauDeBord() {

    if (apprenants.length === 0) {
        console.log("❌ Aucun apprenant.");
        return;
    }

    let tableau = [];

    for (let apprenant of apprenants) {

        let progression =
            calculerProgression(apprenant);

        tableau.push({
            id: apprenant.id,
            nom: apprenant.nomComplet,
            ville: apprenant.ville,
            progression: progression.pourcentage + "%",
            exercices:
                progression.exercicesTermines +
                "/" +
                progression.exercicesTotal,
            challenges: progression.challengesTermines,
            joursCompletes: progression.joursCompletes
        });
    }

    console.table(tableau);
}


// ======================================================
// 12. TRIER PAR PROGRESSION
// ======================================================

function trierParProgression() {

    let copie = [...apprenants];

    copie.sort(function (a, b) {

        let progressionA =
            calculerProgression(a).pourcentage;

        let progressionB =
            calculerProgression(b).pourcentage;

        return progressionB - progressionA;
    });

    let tableau = [];

    for (let apprenant of copie) {

        let progression =
            calculerProgression(apprenant);

        tableau.push({
            id: apprenant.id,
            nom: apprenant.nomComplet,
            ville: apprenant.ville,
            progression: progression.pourcentage + "%"
        });
    }

    console.log("📊 Classement par progression :");

    console.table(tableau);
}


// ======================================================
// 13. TRIER PAR NOM
// ======================================================

function trierParNom() {

    let copie = [...apprenants];

    copie.sort(function (a, b) {

        return a.nomComplet.localeCompare(
            b.nomComplet
        );
    });

    console.table(copie);
}


// ======================================================
// 14. AFFICHER LES RESULTATS D'UN APPRENANT
// ======================================================

function afficherResultats() {

    let id = Number(prompt("Entrez l'ID :"));

    let apprenant = null;

    for (let element of apprenants) {

        if (element.id === id) {
            apprenant = element;
            break;
        }
    }

    if (apprenant === null) {
        console.log("❌ Apprenant introuvable.");
        return;
    }

    if (apprenant.resultats.length === 0) {
        console.log("❌ Aucun resultat.");
        return;
    }

    console.log(
        "Resultats de",
        apprenant.nomComplet
    );

    console.table(apprenant.resultats);
}


// ======================================================
// 15. MENU PRINCIPAL
// ======================================================

function menu() {

    let continuer = true;

    while (continuer) {

        console.log("");
        console.log("==========================================");
        console.log("       TABLEAU DE BORD PEDAGOGIQUE");
        console.log("==========================================");

        console.log("1. Ajouter un apprenant");
        console.log("2. Afficher tous les apprenants");
        console.log("3. Rechercher par ID");
        console.log("4. Rechercher par nom");
        console.log("5. Ajouter / modifier un resultat");
        console.log("6. Afficher les resultats d'un apprenant");
        console.log("7. Afficher la progression d'un apprenant");
        console.log("8. Afficher le tableau de bord");
        console.log("9. Trier par progression");
        console.log("10. Trier par nom");
        console.log("0. Quitter");

        console.log("==========================================");

        let choix = prompt("Votre choix :");

        switch (choix) {

            case "1":
                ajouterApprenant();
                break;

            case "2":
                afficherApprenants();
                break;

            case "3":
                rechercherParId();
                break;

            case "4":
                rechercherParNom();
                break;

            case "5":
                ajouterOuModifierResultat();
                break;

            case "6":
                afficherResultats();
                break;

            case "7":
                afficherProgression();
                break;

            case "8":
                afficherTableauDeBord();
                break;

            case "9":
                trierParProgression();
                break;

            case "10":
                trierParNom();
                break;

            case "0":
                continuer = false;
                console.log("Adios .");
                break;

            default:
                console.log(
                    "Choix invalide. Choisissez une option entre 0 et 10."
                );
        }
    }
}


// ======================================================
// LANCEMENT DU PROGRAMME
// ======================================================

menu();