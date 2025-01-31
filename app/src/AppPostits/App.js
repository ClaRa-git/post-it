// Ce fichier est structuré de manière à simuler un pattern "Singleton" en tenant compte des limitations du JavaScript.

// Import de la feuille de style
import "../assets/css/style.css";

// Import de la class PostIt
import { PostIt } from "./PostIt";

// La class n'est pas exportée, ce qui empêche de l'importer et de l'instancier
// C'est l'équivalent d'un constructeur privé en PHP
class App {

    elInputNewPiTitle;
    elTextareaNewPiContent;
    elOlPiList;
    arrPostIt = [];

    /**
     * Démarrage de l'application
     */
    start() {
        console.log("Démarrage de l'application");

        // Appel de la méthode pour effectuer le rendu de l'UI de base
        this.renderBaseUI();

        // TEST
        const pTest = new PostIt( {
            title: 'Toto à la plage',
            content: 'Il nage le crawl au milieu des requins',
            dateCreate: 1666180099794,
            dateUpdate: 1666181000000
        } );

        this.elOlPiList.append( pTest.getDOM() );
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

        // -- <ol> --
        this.elOlPiList = document.createElement( 'ol' );
        this.elOlPiList.id = 'nota-list';

        // -- Injection <ol> dans <main> --
        elMain.append( this.elOlPiList );


        // TODO: L'intérieur

        // -- Injection <header> + <main> dans le <body> --
        document.body.append( elHeader, elMain );
    }

    /**
     * Effectue le rendu de la liste des post-its
     */
    renderList() {
        // TODO: Le code
        // 1- Vidange du ol de la liste
        // 2- Reconstruction du contenu de la liste à partir du tableau arrPostIt
    }

    /**
     * Gestionnaire de l'événement click sur le bouton "Ajouter un post-it"
     * @param {Event} evt Evénement produit intercepté par l'écouteur
     */
    handlerAddNewPostit( evt ) {

        // 1- Création d'une version litérale de l'objet PostIt avec l'objet du formulaire
        // 2- Création d'une instance de la class PostIt avec l'objet litéral
        // 3- Ajout de l'instance au début du tableau arrPostIt


        // 4- Vidange du ol de la liste
        // 5- Reconstruction du contenu de la liste
        this.renderList();
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
