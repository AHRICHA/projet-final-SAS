import promptSync from "prompt-sync";

const prompt = promptSync();


// =====================================================
// SAS PROGRESS CONSOLE
// =====================================================

// Donnees de depart
let apprenants = [
    {
        id: 1,
        nom: "Ahricha Mohamed",
        ville: "Nador",
        resultats: [
            {
                jour: 1,
                total: 20,
                termines: 9,
                challengeFinished: false
            },
            {
                jour: 2,
                total: 20,
                termines: 11,
                challengeFinished: false
            },
            {
                jour: 3,
                total: 20,
                termines: 6,
                challengeFinished: false
            }
        ]
    },

    {
        id: 2,
        nom: "Karim Amine",
        ville: "Oujda",
        resultats: [
            {
                jour: 1,
                total: 20,
                termines: 16,
                challengeFinished: true
            },
            {
                jour: 2,
                total: 20,
                termines: 18,
                challengeFinished: true
            }
        ]
    }
];


// =====================================================
// 1. normaliserNom
// Nettoyer et uniformiser un nom
// =====================================================

function normaliserNom(nom) {

    nom = nom.trim();

    nom = nom.replace(/\s+/g, " ");

    nom = nom.toLowerCase();

    let mots = nom.split(" ");

    for (let i = 0; i < mots.length; i++) {

        mots[i] =
            mots[i].charAt(0).toUpperCase() +
            mots[i].slice(1);
    }

    return mots.join(" ");
}


// =====================================================
// 2. validerResultat
// Verifier les valeurs d'un resultat journalier
// =====================================================

function validerResultat(jour, total, termines) {

    if (jour < 1 || jour > 7) {
        return false;
    }

    if (total < 0) {
        return false;
    }

    if (termines < 0) {
        return false;
    }

    if (termines > total) {
        return false;
    }

    return true;
}


// =====================================================
// 3. ajouterApprenant
// Ajouter un apprenant sans doublon d'identifiant
// =====================================================

function ajouterApprenant() {

    let id = Number(prompt("Identifiant : "));

    if (id <= 0) {
        console.log("Identifiant invalide.");
        return;
    }

    // Controle du doublon
    for (let apprenant of apprenants) {

        if (apprenant.id === id) {

            console.log("Cet identifiant existe deja.");
            return;
        }
    }

    let nom = prompt("Nom complet : ");
    let ville = prompt("Ville : ");

    if (nom.trim() === "" || ville.trim() === "") {

        console.log("Le nom et la ville sont obligatoires.");
        return;
    }

    nom = normaliserNom(nom);
    ville = normaliserNom(ville);

    let nouvelApprenant = {
        id: id,
        nom: nom,
        ville: ville,
        resultats: []
    };

    apprenants.push(nouvelApprenant);

    console.log("Apprenant ajoute avec succes.");
}


// =====================================================
// 4. enregistrerResultat
// Ajouter ou mettre a jour une journee
// =====================================================

function enregistrerResultat() {

    let id = Number(prompt("Identifiant de l'apprenant : "));

    let apprenantTrouve = null;

    // Chercher l'apprenant
    for (let apprenant of apprenants) {

        if (apprenant.id === id) {
            apprenantTrouve = apprenant;
            break;
        }
    }

    if (apprenantTrouve === null) {

        console.log("Apprenant introuvable.");
        return;
    }

    let jour = Number(prompt("Jour (1-7) : "));
    let total = Number(prompt("Total des exercices : "));
    let termines = Number(prompt("Exercices termines : "));

    // Validation
    if (!validerResultat(jour, total, termines)) {

        console.log("Resultat invalide.");
        console.log(
            "Le jour doit etre entre 1 et 7 et termines <= total."
        );

        return;
    }

    let challenge = prompt(
        "Challenge termine ? (oui/non) : "
    );

    challenge = challenge.toLowerCase().trim();

    if (challenge !== "oui" && challenge !== "non") {

        console.log("Reponse invalide.");
        return;
    }

    let challengeFinished = false;

    if (challenge === "oui") {
        challengeFinished = true;
    }

    let resultatExiste = false;

    // Chercher si la journee existe deja
    for (let resultat of apprenantTrouve.resultats) {

        if (resultat.jour === jour) {

            resultat.total = total;
            resultat.termines = termines;
            resultat.challengeFinished = challengeFinished;

            resultatExiste = true;

            break;
        }
    }

    // Si la journee n'existe pas
    if (resultatExiste === false) {

        apprenantTrouve.resultats.push({
            jour: jour,
            total: total,
            termines: termines,
            challengeFinished: challengeFinished
        });

        console.log("Resultat ajoute.");
    } else {

        console.log("Resultat mis a jour.");
    }
}


// =====================================================
// 5. rechercherApprenant
// Retrouver un profil par identifiant ou par nom
// =====================================================

function rechercherApprenant(type, valeur) {

    // Recherche par identifiant
    if (type === "id") {

        for (let apprenant of apprenants) {

            if (apprenant.id === Number(valeur)) {
                return apprenant;
            }
        }

        return null;
    }


    // Recherche par nom
    if (type === "nom") {

        let resultats = [];

        valeur = valeur.toLowerCase().trim();

        for (let apprenant of apprenants) {

            if (
                apprenant.nom.toLowerCase().includes(valeur)
            ) {

                resultats.push(apprenant);
            }
        }

        return resultats;
    }
}


// =====================================================
// 6. calculerProgression
// Produire les indicateurs individuels
// =====================================================

function calculerProgression(apprenant) {

    let totalExercices = 0;
    let exercicesTermines = 0;
    let challengesTermines = 0;

    for (let resultat of apprenant.resultats) {

        totalExercices += resultat.total;

        exercicesTermines += resultat.termines;

        if (resultat.challengeFinished === true) {
            challengesTermines++;
        }
    }

    let progression = 0;

    if (totalExercices > 0) {

        progression =
            (exercicesTermines / totalExercices) * 100;
    }

    let niveau = "Debutant";

    if (progression >= 80) {

        niveau = "Avance";

    } else if (progression >= 50) {

        niveau = "Intermediaire";
    }

    return {
        totalExercices: totalExercices,
        exercicesTermines: exercicesTermines,
        progression: Number(progression.toFixed(2)),
        challengesTermines: challengesTermines,
        niveau: niveau
    };
}


// =====================================================
// 7. filtrerParNiveau
// Selectionner les profils d'un niveau donne
// =====================================================

function filtrerParNiveau(niveau) {

    let resultats = [];

    niveau = niveau.toLowerCase().trim();

    for (let apprenant of apprenants) {

        let progression =
            calculerProgression(apprenant);

        if (
            progression.niveau.toLowerCase() === niveau
        ) {

            resultats.push(apprenant);
        }
    }

    return resultats;
}


// =====================================================
// 8. trierParProgression
// Classer les profils par progression decroissante
// =====================================================

function trierParProgression() {

    for (let i = 0; i < apprenants.length - 1; i++) {

        for (let j = i + 1; j < apprenants.length; j++) {

            let progression1 =
                calculerProgression(apprenants[i]).progression;

            let progression2 =
                calculerProgression(apprenants[j]).progression;

            if (progression1 < progression2) {

                let temp = apprenants[i];

                apprenants[i] = apprenants[j];

                apprenants[j] = temp;
            }
        }
    }

    console.log("Apprenants tries par progression decroissante.");
}


// =====================================================
// 9. afficherTableauDeBord
// Presenter les indicateurs du groupe et les listes
// =====================================================

function afficherTableauDeBord() {

    let totalApprenants = apprenants.length;

    let totalProgression = 0;

    let debutants = 0;
    let intermediaires = 0;
    let avances = 0;

    // Calcul des indicateurs
    for (let apprenant of apprenants) {

        let progression =
            calculerProgression(apprenant);

        totalProgression += progression.progression;

        if (progression.niveau === "Debutant") {
            debutants++;
        }

        if (progression.niveau === "Intermediaire") {
            intermediaires++;
        }

        if (progression.niveau === "Avance") {
            avances++;
        }
    }

    let moyenne = 0;

    if (totalApprenants > 0) {

        moyenne =
            totalProgression / totalApprenants;
    }

    console.log("");
    console.log("=========================================");
    console.log("          TABLEAU DE BORD");
    console.log("=========================================");

    console.log(
        "Nombre total d'apprenants :",
        totalApprenants
    );

    console.log(
        "Progression moyenne :",
        moyenne.toFixed(2) + "%"
    );

    console.log(
        "Debutants :",
        debutants
    );

    console.log(
        "Intermediaires :",
        intermediaires
    );

    console.log(
        "Avances :",
        avances
    );

    console.log("-----------------------------------------");
    console.log("Liste des apprenants :");

    for (let apprenant of apprenants) {

        let progression =
            calculerProgression(apprenant);

        console.log(
            apprenant.id +
            " - " +
            apprenant.nom +
            " - " +
            progression.progression +
            "% - " +
            progression.niveau
        );
    }

    console.log("=========================================");
}


// =====================================================
// MENU PRINCIPAL
// =====================================================

let continuer = true;

while (continuer) {

    console.log("");
    console.log("=========================================");
    console.log("       SAS PROGRESS CONSOLE");
    console.log("=========================================");

    console.log("1. Afficher le tableau de bord");
    console.log("2. Afficher la liste des apprenants");
    console.log("3. Ajouter un apprenant");
    console.log("4. Consulter un apprenant par identifiant");
    console.log("5. Ajouter ou modifier le resultat d'une journee");
    console.log("6. Rechercher un apprenant par nom");
    console.log("7. Filtrer les apprenants par niveau");
    console.log("8. Trier les apprenants par progression decroissante");
    console.log("9. Trier les apprenants par ordre alphabetique");
    console.log("0. Quitter");

    console.log("=========================================");

    let choix = prompt("Votre choix : ");


    // =========================================
    // 1. TABLEAU DE BORD
    // =========================================

    if (choix === "1") {

        afficherTableauDeBord();
    }


    // =========================================
    // 2. LISTE DES APPRENANTS
    // =========================================

    else if (choix === "2") {

        console.log("");
        console.log("Liste des apprenants :");

        for (let apprenant of apprenants) {

            console.log(
                apprenant.id +
                " - " +
                apprenant.nom +
                " - " +
                apprenant.ville
            );
        }
    }


    // =========================================
    // 3. AJOUTER UN APPRENANT
    // =========================================

    else if (choix === "3") {

        ajouterApprenant();
    }


    // =========================================
    // 4. RECHERCHER PAR ID
    // =========================================

    else if (choix === "4") {

        let id = Number(
            prompt("Identifiant : ")
        );

        let apprenant =
            rechercherApprenant("id", id);

        if (apprenant === null) {

            console.log("Apprenant introuvable.");

        } else {

            let progression =
                calculerProgression(apprenant);

            console.log("");
            console.log("Profil de l'apprenant");
            console.log("---------------------");
            console.log("ID :", apprenant.id);
            console.log("Nom :", apprenant.nom);
            console.log("Ville :", apprenant.ville);
            console.log(
                "Progression :",
                progression.progression + "%"
            );
            console.log(
                "Niveau :",
                progression.niveau
            );
            console.log(
                "Challenges termines :",
                progression.challengesTermines
            );
        }
    }


    // =========================================
    // 5. AJOUTER / MODIFIER RESULTAT
    // =========================================

    else if (choix === "5") {

        enregistrerResultat();
    }


    // =========================================
    // 6. RECHERCHE PAR NOM
    // =========================================

    else if (choix === "6") {

        let nom = prompt(
            "Nom ou partie du nom : "
        );

        let resultats =
            rechercherApprenant("nom", nom);

        if (resultats.length === 0) {

            console.log("Aucun apprenant trouve.");

        } else {

            console.log("");
            console.log("Resultats :");

            for (let apprenant of resultats) {

                console.log(
                    apprenant.id +
                    " - " +
                    apprenant.nom +
                    " - " +
                    apprenant.ville
                );
            }
        }
    }


    // =========================================
    // 7. FILTRER PAR NIVEAU
    // =========================================

    else if (choix === "7") {

        console.log("Niveaux disponibles :");
        console.log("Debutant");
        console.log("Intermediaire");
        console.log("Avance");

        let niveau =
            prompt("Niveau : ");

        let resultats =
            filtrerParNiveau(niveau);

        if (resultats.length === 0) {

            console.log(
                "Aucun apprenant dans ce niveau."
            );

        } else {

            console.log("");
            console.log("Apprenants :");

            for (let apprenant of resultats) {

                let progression =
                    calculerProgression(apprenant);

                console.log(
                    apprenant.id +
                    " - " +
                    apprenant.nom +
                    " - " +
                    progression.progression +
                    "%"
                );
            }
        }
    }


    // =========================================
    // 8. TRIER PAR PROGRESSION
    // =========================================

    else if (choix === "8") {

        trierParProgression();

        console.log("");

        for (let apprenant of apprenants) {

            let progression =
                calculerProgression(apprenant);

            console.log(
                apprenant.id +
                " - " +
                apprenant.nom +
                " - " +
                progression.progression +
                "%"
            );
        }
    }


    // =========================================
    // 9. TRIER PAR ORDRE ALPHABETIQUE
    // =========================================

    else if (choix === "9") {

        // Tri simple par nom
        for (let i = 0; i < apprenants.length - 1; i++) {

            for (let j = i + 1; j < apprenants.length; j++) {

                if (
                    apprenants[i].nom.localeCompare(
                        apprenants[j].nom
                    ) > 0
                ) {

                    let temp = apprenants[i];

                    apprenants[i] = apprenants[j];

                    apprenants[j] = temp;
                }
            }
        }

        console.log(
            "Apprenants tries par ordre alphabetique."
        );

        for (let apprenant of apprenants) {

            console.log(
                apprenant.id +
                " - " +
                apprenant.nom
            );
        }
    }


    // =========================================
    // 0. QUITTER
    // =========================================

    else if (choix === "0") {

        continuer = false;

        console.log("Programme termine.");
    }


    // =========================================
    // CHOIX INVALIDE
    // =========================================

    else {

        console.log(
            "Choix invalide. Veuillez choisir entre 0 et 9."
        );
    }
}
