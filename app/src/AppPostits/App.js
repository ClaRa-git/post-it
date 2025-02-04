// Ce fichier est structuré de manière à simuler un pattern "Singleton" en tenant compte des limitations du JavaScript.

// Import de la feuille de style
import "../assets/css/style.css";

// Import de la class PostIt
import { PostIt } from "./PostIt";
import { PostItService } from "./Services/PostItService";

// La class n'est pas exportée, ce qui empêche de l'importer et de l'instancier
// C'est l'équivalent d'un constructeur privé en PHP
class App {

    elInputNewPiTitle;
    elTextareaNewPiContent;
    elOlPiList;
    arrPostIt = [];
    backUpPostItData = null;

    dataService;

    constructor( service ) {
        this.dataService = service;
    }

    /**
     * Démarrage de l'application
     */
    start() {

        console.log("Démarrage de l'application");

        // Appel de la méthode pour effectuer le rendu de l'UI de base
        this.renderBaseUI();

        // Pose des écouteurs d'événements
        this.initPostItListeners();

        // Récupération des données
        this.arrPostIt = this.dataService.getAll();

        // Appel de la méthode pour effectuer le rendu de la liste des post-its
        this.renderList();
    }

    /**
     * Initialisation des écouteurs d'événements émis par les post-its
     */
    initPostItListeners() {
        // Suppression
        document.addEventListener( 'pi.delete', this.handlerOnPiDelete.bind( this ) );

        // Enregistrement
        document.addEventListener( 'pi.save', this.handlerOnPiSave.bind( this ) );

        // Annulation
        document.addEventListener( 'pi.cancel', this.handlerOnPiCancel.bind( this ) );

        // Edition
        document.addEventListener( 'pi.edit', this.handlerOnPiEdit.bind( this ) );
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
        elForm.addEventListener( 'submit', this.handlerAddNewPostit.bind( this ) );

        // -- <input> --
        this.elInputNewPiTitle = document.createElement( 'input' );
        this.elInputNewPiTitle.type = 'text';
        this.elInputNewPiTitle.placeholder = 'Titre';
        this.elInputNewPiTitle.addEventListener( 'focus', this.handlerRemoveError.bind( this ) );
        this.elInputNewPiTitle.addEventListener( 'input', this.handlerRemoveError.bind( this ) );

        // -- <textarea> --
        this.elTextareaNewPiContent = document.createElement( 'textarea' );
        this.elTextareaNewPiContent.placeholder = 'Contenu';
        this.elTextareaNewPiContent.addEventListener( 'focus', this.handlerRemoveError.bind( this ) );
        this.elTextareaNewPiContent.addEventListener( 'input', this.handlerRemoveError.bind( this ) );

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

        // -- Injection <header> + <main> dans le <body> --
        document.body.append( elHeader, elMain );
    }

    /**
     * Effectue le rendu de la liste des post-its
     */
    renderList() {
        // 1- Vidange du ol de la liste
        this.elOlPiList.innerHTML = '';

        // 2- Reconstruction du contenu de la liste à partir du tableau arrPostIt
        for( let postit of this.arrPostIt ) {
            this.elOlPiList.append( postit.getDOM() );
        }
    }

    /**
     * Gestionnaire de l'événement click sur le bouton "Ajouter un post-it"
     * @param {Event} evt Evénement produit intercepté par l'écouteur
     */
    handlerAddNewPostit( evt ) {
        // Empêcher le comportement par défaut du formulaire
        evt.preventDefault();

        // Récupération des valeurs des champs du formulaire
        let newTitle = this.elInputNewPiTitle.value;
        let newContent = this.elTextareaNewPiContent.value;
        let now = Date.now();

        // Vérication de la saisie
        // Flag pour vérifier si une erreur est survenue
        let hasError = false;
        // Vérication de la validité des valeurs
        const regExpNotEmpty = new RegExp( /\S/ ); // autre chose que des espaces ou vide
        // Si le titre est vide ou ne contient que des espaces
        if( !regExpNotEmpty.test( newTitle )){
            hasError = true;
            this.elInputNewPiTitle.value = '';
            this.elInputNewPiTitle.classList.add( 'error' );
        }

        // Si le contenu est vide ou ne contient que des espaces
        if( !regExpNotEmpty.test( newContent )){
            hasError = true;
            this.elTextareaNewPiContent.value = '';
            this.elTextareaNewPiContent.classList.add( 'error' );
        }

        // Si le contenu est vide ou ne contient que des espaces
        if( hasError ) return;

        // 1- Création d'une version litérale de l'objet PostIt avec l'objet du formulaire
        const newPostItLiteral = {
            title: newTitle,
            content: newContent,
            dateCreate: now,
            dateUpdate: now
        };

        // 2- Création d'une instance de la class PostIt avec l'objet litéral
        const newPostIt = new PostIt( newPostItLiteral );

        // 3- Ajout de l'instance au début du tableau arrPostIt
        this.arrPostIt.unshift( newPostIt );

        this.dataService.saveAll(this.arrPostIt);

        // 4- Vidange du ol de la liste
        // 5- Reconstruction du contenu de la liste
        this.renderList();

        // 6- Effacer les champs du formulaire
        this.elInputNewPiTitle.value = ''; 
        this.elTextareaNewPiContent.value = '';
    }

    /**
     * Gestionnaire de suppression de la classe "error" sur les champs du formulaire
     * @param {Event} evt Evénement produit intercepté par l'écouteur
     */
    handlerRemoveError( evt ) {
        evt.target.classList.remove( 'error' );
    }

    /**
     * Gestionnaire de l'événement click sur le bouton "Effacer les post-its"
     * @param {Event} evt Evénement produit intercepté par l'écouteur
     */
    handlerClear( evt ) {
        // 1 - Vidange du tableau arrPostIt
        this.arrPostIt = [];

        this.dataService.saveAll(this.arrPostIt);

        // 2 - Regénération de la liste
        this.renderList();
    }

    /**
     * Gestionnaire de l'événement click sur le bouton "Supprimer un post-it"
     * @param {Event} evt Evénement produit intercepté par l'écouteur
     */
    handlerOnPiDelete( evt ) {

        if( this.backUpPostItData !== null ) {
            return;
        }

        const postIt = evt.detail.emitter;
        // On ne garde que les post-its qui ne sont pas égaux à celui qui a émis l'événement
        this.arrPostIt = this.arrPostIt.filter( pi => !Object.is( pi, postIt ) );

        this.dataService.saveAll(this.arrPostIt);

        this.renderList();
    }

    /**
     * Gestionnaire de l'événement click sur le bouton "Enregistrer un post-it"
     * @param {Event} evt Evénement produit intercepté par l'écouteur
     */
    handlerOnPiSave( evt ) {
        const postIt = evt.detail.emitter;

        postIt.setViewMode();

        // On remet à null les données sauvegardées
        this.backUpPostItData = null;

        // On met à jour les données du post-it à partir de celles du formulaire
        postIt.title = postIt.containerTitle.textContent;
        postIt.content = postIt.containerContent.textContent;

        // On met à jour la date de modification
        postIt.dateUpdate = Date.now();
        postIt.containerDateUpdate.textContent = new Date( postIt.dateUpdate ).toLocaleString();

        // On retrie le tableau par date de modification (la plus récente en premier)
        this.arrPostIt.sort( ( a, b ) => b.dateUpdate - a.dateUpdate );

        this.dataService.saveAll(this.arrPostIt);

        // On regénère la liste
        this.renderList();        
    }

    /**
     * Gestionnaire de l'événement click sur le bouton "Annuler un post-it"
     * @param {Event} evt Evénement produit intercepté par l'écouteur
     */
    handlerOnPiCancel( evt ) {
        const postIt = evt.detail.emitter;

        // Passage en mode vue
        postIt.setViewMode();

        // On remet les données sauvegardées dans le post-it
        postIt.containerTitle.textContent = this.backUpPostItData.title;
        postIt.containerContent.textContent = this.backUpPostItData.content;

        // On remet à null les données sauvegardées
        this.backUpPostItData = null;
    }

    /**
     * Gestionnaire de l'événement click sur le bouton "Editer un post-it"
     * @param {Event} evt Evénement produit intercepté par l'écouteur
     */
    handlerOnPiEdit( evt ) {

        // Si une édition est déjà en cours, on ne fait rien
        if( this.backUpPostItData !== null ) {
            return;
        }

        const postIt = evt.detail.emitter;

        // Sauvegarde des données du post-it en cas d'annulation
        this.backUpPostItData = postIt.toJSON();

        // Passage en mode édition
        postIt.setEditMode();

        
    }
}

const dataService = new PostItService();
// On crée une instance de la class App dans une variable
// La variable est l'équivalent de la propriété statique "$instance" en PHP
const app = new App( dataService );

// On exporte cette variable.
// Si à l'extérieur il y a plusieurs import de cette variable,
// le système aura mémorisé le premier import et renverra la même instance pour les imports suivants
// C'est l'équivalent de la méthode statique "getApp" en PHP
export default app;
