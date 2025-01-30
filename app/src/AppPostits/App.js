// Ce fichier est structuré de manière à simuler un pattern "Singleton" en tenant compte des limitations du JavaScript.

// Import de la feuille de style
import "../assets/css/style.css";

// La class n'est pas exportée, ce qui empêche de l'importer et de l'instancier
// C'est l'équivalent d'un constructeur privé en PHP
class App {

    elInputNewPiTitle;
    elTextareaNewPiContent;
    elOlPiList;

    /**
     * Démarrage de l'application
     */
    start() {
        console.log("Démarrage de l'application");

        // Appel de la méthode pour effectuer le rendu de l'UI de base
        this.renderBaseUI();
    }
    
    /**
     * Effectue le rendu de l'UI de base
     */
    renderBaseUI() {
        /*
            Template:

            <header>
                <h1>Post-Its</h1>

                <form novalidate>
                    <input type="text" placeholder="Titre">
                    <textarea placeholder="Contenu"></textarea>
                    <button type="button">➕</button>
                </form>

                <div>
                    <button type="button">🗑️</button>
                </div>
            </header>

            <main>
                <ol id="nota-list"></ol>
            </main>
        */

        // -- <header> --
        const elHeader = document.createElement( 'header');

        elHeader.innerHTML = `<h1>Post-Its</h1>`;

        // -- <form> --
        const elForm = document.createElement( 'form' );
        elForm.noValidate = true;

        // -- <input> --
        this.elInputNewPiTitle = document.createElement( 'input' );
        this.elInputNewPiTitle.type = 'text';
        this.elInputNewPiTitle.placeholder = 'Titre';

        // -- <textarea> --
        this.elTextareaNewPiContent = document.createElement( 'textarea' );
        this.elTextareaNewPiContent.placeholder = 'Contenu';

        // -- <button> --
        const elBtnNewPiAdd = document.createElement( 'button' );
        elBtnNewPiAdd.type = 'button';
        elBtnNewPiAdd.textContent = '➕';
        // .bind(this) permet de conserver la référence à l'instance de la classe App
        elBtnNewPiAdd.addEventListener( 'click', this.handlerAddNewPostit.bind( this ) );

        // -- Injection <input> + <textarea> + <button> dans <form> --
        elForm.append( this.elInputNewPiTitle, this.elTextareaNewPiContent, elBtnNewPiAdd );

        // -- <div> --
        const elDivClear = document.createElement( 'div' );

        // -- <button> --
        const elBtnClear = document.createElement( 'button' );
        elBtnClear.type = 'button';
        elBtnClear.textContent = '🗑️';
        elBtnClear.addEventListener( 'click', this.handlerClear.bind( this ) );

        // -- Injection <button> dans <div> --
        elDivClear.append( elBtnClear );

        // -- Injection <form> + <div> dans <header> --
        elHeader.append( elForm, elDivClear );

        // -- <main> --
        const elMain = document.createElement( 'main' );


        // TODO: L'intérieur

        // -- Injection <header> + <main> dans le <body> --
        document.body.append( elHeader, elMain );
    }

    /**
     * Gestionnaire de l'événement click sur le bouton "Ajouter un post-it"
     * @param {Event} evt Evénement produit intercepté par l'écouteur
     */
    handlerAddNewPostit( evt ) {
        // TODO: le code
    }

    /**
     * Gestionnaire de l'événement click sur le bouton "Effacer les post-its"
     * @param {Event} evt Evénement produit intercepté par l'écouteur
     */
    handlerClear( evt ) {
        // TODO: le code
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
