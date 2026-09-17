function normaliserNom(nom) {
    // 1. نحيدو les espaces اللي فالأول والآخر
    nom = nom.trim();

    // 2. نحيدو les espaces الزايدة بين الكلمات
    nom = nom.replace(/\s+/g, " ");

    // 3. نوحدو الكتابة: première lettre majuscule
    //    والباقي minuscule لكل كلمة
    nom = nom
        .toLowerCase()
        .split(" ")
        .map(function(mot) {
            return mot.charAt(0).toUpperCase() + mot.slice(1);
        })
        .join(" ");

    return nom;
}


// Tests
console.log(normaliserNom("   sara     DEV   "));
console.log(normaliserNom("  YASSINE    code "));
console.log(normaliserNom("AHMED"));