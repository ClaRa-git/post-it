// Ce fichier est structuré de manière à simuler un pattern "Singleton" en tenant compte des limitations du JavaScript.

// La class n'est pas exportée, ce qui empêche de l'importer et de l'instancier
// C'est l'équivalent d'un constructeur privé en PHP
class App {

    /**
     * Démarrage de l'application
     */
    start() {
        console.log('Démarrage de l\'application');
    }
}

// On crée une instance de la class App dans une variable
// La variable est l'équivalent de la propriété statique "$instance" en PHP
const app = new App();

// On exporte cette variable.
// Si à l'extérieur il y a plusieurs import de cette variable,
// le système aura mémorisé le premier import et renverra la même instance pour les imports suivants
// C'est l'équivalent de la méthode statique "getApp" en PHP
export default app;