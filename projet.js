import promptSync from "prompt-sync";

const prompt = promptSync();


// ==========================================
// TABLEAU DE BORD PEDAGOGIQUE
// ==========================================

let apprenants = [
    {
        id: 1,
        nom: "Mohamed Ahricha",
        ville: "Nador",
        resultats: []
    },
    {
        id: 2,
        nom: "Amine Karim",
        ville: "Oujda",
        resultats: []
    }
];


// ==========================================
// NORMALISER LE NOM
// ==========================================

function normaliserNom(nom) {
    nom = nom.trim();
    nom = nom.toLowerCase();

    let mots = nom.split(" ");

    for (let i = 0; i < mots.length; i++) {
        mots[i] =
            mots[i].charAt(0).toUpperCase() +
            mots[i].slice(1);
    }

    return mots.join(" ");
}


// ==========================================
// 1. AJOUTER UN APPRENANT
// ==========================================

function ajouterApprenant() {

    let id = Number(prompt("ID : "));

    if (id <= 0) {
        console.log("ID invalide");
        return;
    }

    for (let apprenant of apprenants) {
        if (apprenant.id === id) {
            console.log("Cet ID existe deja");
            return;
        }
    }

    let nom = prompt("Nom : ");
    let ville = prompt("Ville : ");

    if (nom === "" || ville === "") {
        console.log("Les champs sont obligatoires");
        return;
    }

    let nouvelApprenant = {
        id: id,
        nom: normaliserNom(nom),
        ville: normaliserNom(ville),
        resultats: []
    };

    apprenants.push(nouvelApprenant);

    console.log("Apprenant ajoute avec succes");
}


// ==========================================
// 2. AFFICHER TOUS LES APPRENANTS
// ==========================================

function afficherApprenants() {

    for (let apprenant of apprenants) {

        console.log(
            "ID :", apprenant.id,
            "| Nom :", apprenant.nom,
            "| Ville :", apprenant.ville
        );
    }
}


// ==========================================
// 3. RECHERCHER PAR ID
// ==========================================

function rechercherParId() {

    let id = Number(prompt("ID recherche : "));

    for (let apprenant of apprenants) {

        if (apprenant.id === id) {

            console.log("Apprenant trouve");
            console.log("Nom :", apprenant.nom);
            console.log("Ville :", apprenant.ville);

            return;
        }
    }

    console.log("Apprenant introuvable");
}


// ==========================================
// 4. RECHERCHER PAR NOM
// ==========================================

function rechercherParNom() {

    let nom = prompt("Nom recherche : ");

    nom = nom.toLowerCase();

    for (let apprenant of apprenants) {

        if (apprenant.nom.toLowerCase().includes(nom)) {

            console.log(
                "ID :", apprenant.id,
                "| Nom :", apprenant.nom,
                "| Ville :", apprenant.ville
            );
        }
    }
}


// ==========================================
// 5. AJOUTER / MODIFIER UN RESULTAT
// ==========================================

function ajouterResultat() {

    let id = Number(prompt("ID apprenant : "));

    let apprenantTrouve = null;

    for (let apprenant of apprenants) {

        if (apprenant.id === id) {
            apprenantTrouve = apprenant;
        }
    }

    if (apprenantTrouve === null) {
        console.log("Apprenant introuvable");
        return;
    }

    let jour = Number(prompt("Jour (1-7) : "));
    let total = Number(prompt("Total exercices : "));
    let termines = Number(prompt("Exercices termines : "));

    if (jour < 1 || jour > 7) {
        console.log("Jour invalide");
        return;
    }

    if (termines > total) {
        console.log("Erreur : termines > total");
        return;
    }

    apprenantTrouve.resultats.push({
        jour: jour,
        total: total,
        termines: termines
    });

    console.log("Resultat ajoute");
}


// ==========================================
// 6. AFFICHER LA PROGRESSION
// ==========================================

function afficherProgression() {

    let id = Number(prompt("ID apprenant : "));

    for (let apprenant of apprenants) {

        if (apprenant.id === id) {

            let total = 0;
            let termines = 0;

            for (let resultat of apprenant.resultats) {

                total = total + resultat.total;
                termines = termines + resultat.termines;
            }

            if (total === 0) {
                console.log("Aucun resultat");
                return;
            }

            let progression =
                (termines / total) * 100;

            console.log(
                apprenant.nom +
                " : " +
                progression.toFixed(0) +
                "%"
            );

            return;
        }
    }

    console.log("Apprenant introuvable");
}


// ==========================================
// 7. NOMBRE D'APPRENANTS
// ==========================================

function nombreApprenants() {

    console.log(
        "Nombre d'apprenants :",
        apprenants.length
    );
}


// ==========================================
// 8. SUPPRIMER UN APPRENANT
// ==========================================

function supprimerApprenant() {

    let id = Number(prompt("ID a supprimer : "));

    for (let i = 0; i < apprenants.length; i++) {

        if (apprenants[i].id === id) {

            apprenants.splice(i, 1);

            console.log("Apprenant supprime");

            return;
        }
    }

    console.log("Apprenant introuvable");
}


// ==========================================
// 9. TRIER PAR PROGRESSION
// ==========================================

function trierParProgression() {

    for (let i = 0; i < apprenants.length - 1; i++) {

        for (let j = i + 1; j < apprenants.length; j++) {

            let progression1 = 0;
            let progression2 = 0;

            let total1 = 0;
            let termines1 = 0;

            let total2 = 0;
            let termines2 = 0;

            for (let resultat of apprenants[i].resultats) {
                total1 += resultat.total;
                termines1 += resultat.termines;
            }

            for (let resultat of apprenants[j].resultats) {
                total2 += resultat.total;
                termines2 += resultat.termines;
            }

            if (total1 > 0) {
                progression1 = termines1 / total1;
            }

            if (total2 > 0) {
                progression2 = termines2 / total2;
            }

            if (progression1 < progression2) {

                let temp = apprenants[i];
                apprenants[i] = apprenants[j];
                apprenants[j] = temp;
            }
        }
    }

    console.log("Apprenants tries par progression");

    for (let apprenant of apprenants) {

        console.log(
            apprenant.id,
            "-",
            apprenant.nom
        );
    }
}


// ==========================================
// 10. TRIER PAR NOM
// ==========================================

function trierParNom() {

    apprenants.sort(function (a, b) {
        return a.nom.localeCompare(b.nom);
    });

    console.log("Apprenants tries par nom");

    for (let apprenant of apprenants) {

        console.log(
            apprenant.id,
            "-",
            apprenant.nom
        );
    }
}


// ==========================================
// MENU
// ==========================================

let continuer = true;

while (continuer) {

    console.log("");
    console.log("=========================================");
    console.log("       TABLEAU DE BORD PEDAGOGIQUE");
    console.log("=========================================");
    console.log("1. Ajouter un apprenant");
    console.log("2. Afficher tous les apprenants");
    console.log("3. Rechercher par ID");
    console.log("4. Rechercher par nom");
    console.log("5. Ajouter / modifier un resultat");
    console.log("6. Afficher la progression");
    console.log("7. Afficher le nombre d'apprenants");
    console.log("8. Supprimer un apprenant");
    console.log("9. Trier par progression");
    console.log("10. Trier par nom");
    console.log("0. Quitter");
    console.log("=========================================");

    let choix = prompt("Votre choix : ");

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
            ajouterResultat();
            break;

        case "6":
            afficherProgression();
            break;

        case "7":
            nombreApprenants();
            break;

        case "8":
            supprimerApprenant();
            break;

        case "9":
            trierParProgression();
            break;

        case "10":
            trierParNom();
            break;

        case "0":
            continuer = false;
            console.log("Programme termine");
            break;

        default:
            console.log("Choix invalide");
    }
}