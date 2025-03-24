// Liste des mots
const mots = [
    'PATIENCE', 'PERSEVERANCE', 'PRATIQUE', 
    'CODE', 'ORDINATEUR', 'GUITARE', 
    'MUSIQUE', 'INDEPENDANT', 'LOGIQUE', 
    'CHOPPE', 'ENTREPRENEUR', 'NATURE', 
    'CAFE', 'INTELLIGENCE', 'MONTAGNE', 'ARTIFICIELLE'
];

// Variables de jeu
let motChoisi = '';
let motAffiche = [];
let tentativesRestantes = 10;
let partiesPendu = [
    'tete', 'corps', 'bras-gauche', 'bras-droit', 'jambe-gauche', 'jambe-droite',
    'oeil-gauche-1', 'oeil-gauche-2',  'oeil-droit-1', 'oeil-droit-2'
  
];

// Initialisation du jeu
function initialiserJeu() {
    // Réinitialiser tous les éléments
    motChoisi = mots[Math.floor(Math.random() * mots.length)];
    motAffiche = Array(motChoisi.length).fill('_');
    tentativesRestantes = 10;
    document.getElementById('affichage-mot').textContent = motAffiche.join(' ');
    document.getElementById('tentatives').textContent = 'Tentatives restantes : ' + tentativesRestantes;
    
    // Réinitialiser le dessin du pendu
    partiesPendu = [
        'tete', 
        'corps', 'bras-gauche', 'bras-droit', 
        'jambe-gauche', 'jambe-droite',
        'oeil-gauche-1', 'oeil-gauche-2', 
        'oeil-droit-1', 'oeil-droit-2', 
    ];
    partiesPendu.forEach(partie => {
        document.getElementById(partie).style.display = 'none';
    });

    // Réinitialiser le clavier
    creerClavier();

    // Réafficher la zone de jeu et cacher la zone de rejouer
    document.getElementById('zone-jeu').classList.remove('cache');
    document.getElementById('zone-rejouer').classList.add('cache');
    document.getElementById('message-fin').classList.add('cache');

    // Réactiver les touches du clavier
    const touches = document.querySelectorAll('.touche');
    touches.forEach(touche => {
        touche.classList.remove('correct', 'incorrect');
        touche.disabled = false;
    });
}

// Vérification d'une lettre
function verifierLettre(lettre) {
    const touches = document.querySelectorAll('.touche');
    const toucheLettre = Array.from(touches).find(touche => touche.textContent === lettre);

    if (motChoisi.includes(lettre)) {
        // Lettre correcte
        toucheLettre.classList.add('correct');
        
        // Mettre à jour l'affichage du mot
        for (let i = 0; i < motChoisi.length; i++) {
            if (motChoisi[i] === lettre) {
                motAffiche[i] = lettre;
            }
        }
        
        document.getElementById('affichage-mot').textContent = motAffiche.join(' ');
        
        // Vérifier si le joueur a gagné
        if (!motAffiche.includes('_')) {
            gagnerPartie();
        }
    } else {
        // Lettre incorrecte
        toucheLettre.classList.add('incorrect');
        toucheLettre.disabled = true;
        tentativesRestantes--;
        document.getElementById('tentatives').textContent = 'Tentatives restantes : ' + tentativesRestantes;
        
        // Ajouter une partie du pendu
        if (partiesPendu.length > 0) {
            const partieAMontrer = partiesPendu.shift();
            document.getElementById(partieAMontrer).style.display = 'block';
        }
        
        // Vérifier si le joueur a perdu
        if (tentativesRestantes === 0) {
            perdrePartie();
        }
    }
}

// Création du clavier virtuel
function creerClavier() {
    const clavier = document.getElementById('clavier');
    clavier.innerHTML = ''; // Effacer le clavier précédent
    
    for (let i = 65; i <= 90; i++) {
        const touche = document.createElement('button');
        touche.textContent = String.fromCharCode(i);
        touche.classList.add('touche');
        touche.onclick = () => verifierLettre(String.fromCharCode(i));
        clavier.appendChild(touche);
    }
}

// Vérification du mot entier
function verifierMotComplet() {
    const entreeMot = document.getElementById('entree-mot');
    const motPropose = entreeMot.value.toUpperCase();
    
    if (motPropose === motChoisi) {
        gagnerPartie();
    } else {
        // Mot incorrect
        tentativesRestantes--;
        document.getElementById('tentatives').textContent = 'Tentatives restantes : ' + tentativesRestantes;
        
        // Ajouter une partie du pendu
        if (partiesPendu.length > 0) {
            const partieAMontrer = partiesPendu.shift();
            document.getElementById(partieAMontrer).style.display = 'block';
        }
        
        // Vérifier si le joueur a perdu
        if (tentativesRestantes === 0) {
            perdrePartie();
        }
    }
    
    entreeMot.value = ''; // Réinitialiser le champ de saisie
}

// Fonction  victoire
function gagnerPartie() {
    const messageFin = document.getElementById('message-fin');
    messageFin.textContent = 'Félicitations ! Vous avez gagné !';
    messageFin.classList.remove('cache');
    document.getElementById('zone-jeu').classList.add('cache');
    document.getElementById('zone-rejouer').classList.remove('cache');
}

// Fonction  défaite
function perdrePartie() {
    const messageFin = document.getElementById('message-fin');
    messageFin.textContent = "Perdu ! Le mot était : " + motChoisi;
    messageFin.classList.remove('cache');
    document.getElementById('zone-jeu').classList.add('cache');
    document.getElementById('zone-rejouer').classList.remove('cache');
}

// Fonction pour recommencer une partie
function recommencerPartie() {
    initialiserJeu();
}

// Démarrer le jeu
initialiserJeu();