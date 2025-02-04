/* Modèle objet litteral d'un Nota
{
    title: 'Toto à la plage',
    content: 'Il nage le crawl au milieu des requins',
    dateCreate: 1666180099794,
    dateUpdate: 1666180099794
}
*/

// Constantes visibles uniquement dans ce fichier car elles ne sont pas exportées
const MODE_VIEW = 'view';
const MODE_EDIT = 'edit';

export class PostIt {

    title;
    content;
    dateCreate;
    dateUpdate;
    eventDetail;
    container = null;
    containerTitle = null;
    containerContent = null;
    containerDateUpdate = null;

    constructor( postItLiteral ) {
        this.title = postItLiteral.title;
        this.content = postItLiteral.content;
        this.dateCreate = postItLiteral.dateCreate;
        this.dateUpdate = postItLiteral.dateUpdate;

        // Objet "detail" pour l'évènement personnalisé des actions sur le post-it
        this.eventDetail = { detail: { emitter : this } };
    }

    /**
     * Créer et stocker un élément DOM représentant le post-it
     * @returns {HTMLElement} 
     */
    getDOM() {
        // S'il a déjà été créé, on le retourne
        if ( this.container != null ) {
            return this.container;
        } 

        // Sinon, on crée le dom
        /* 
        Template :
        <li>
            <div class="nota-header">
                <div class="nota-times">
                    <strong>création: </strong>LA_DATE<br>
                    <strong>màj: </strong><span class="date-update">LA_DATE</span>
                </div>
                <div class="nota-cmd">
                    <div data-cmd="view">
                        <button type="button" data-role="edit">✏️</button>
                        <button type="button" data-role="delete">🗑️</button>
                    </div>
                    <div data-cmd="edit">
                        <button type="button" data-role="save">💾</button>
                        <button type="button" data-role="cancel">❌</button>
                    </div>
                </div>
            </div>
            <div class="nota-title">THE_TITLE</div>
            <div class="nota-content">THE_CONTENT</div>
        </li>
        */

        this.container = document.createElement( 'li' );
        this.container.classList.add( 'nota' );
        this.container.dataset.mode = MODE_VIEW;

        // Dates formatées
        let dateCreate = new Date( this.dateCreate ).toLocaleString();
        let dateUpdate = new Date( this.dateUpdate ).toLocaleString();

        let innerDom = '';

        innerDom += '<div class="nota-header">';
        innerDom +=     '<div class="nota-times">';
        innerDom +=         `<strong>création: </strong>${dateCreate}<br>`;
        innerDom +=         `<strong>màj: </strong><span class="date-update">${dateUpdate}</span>`;
        innerDom +=     '</div>';
        innerDom +=     '<div class="nota-cmd">';
        innerDom +=         '<div data-cmd="view">';
        innerDom +=             '<button type="button" data-role="edit">✏️</button>';
        innerDom +=             '<button type="button" data-role="delete">🗑️</button>';
        innerDom +=         '</div>';
        innerDom +=         '<div data-cmd="edit">';
        innerDom +=             '<button type="button" data-role="save">💾</button>';
        innerDom +=             '<button type="button" data-role="cancel">❌</button>';
        innerDom +=         '</div>';
        innerDom +=     '</div>';
        innerDom += '</div>';

        // On injecte le contenu dans le li
        this.container.innerHTML = innerDom;
        
        this.containerTitle = document.createElement( 'div' );
        this.containerTitle.classList.add( 'nota-title' );
        this.containerTitle.textContent = this.title;

        this.containerContent = document.createElement( 'div' );
        this.containerContent.classList.add( 'nota-content' );
        this.containerContent.textContent = this.content;

        this.container.append( this.containerTitle, this.containerContent );

        // Ecouteurs d'événements sur les boutons
        this.container.addEventListener( 'click', this.handlerButtons.bind( this ) );

        // Récupération du span avec la classe
        this.containerDateUpdate = this.container.querySelector( '.date-update' );

        return this.container;
    }

    /**
     * Passe le post-it en mode édition
     */
    setEditMode() {
        this.container.dataset.mode = MODE_EDIT;
        this.containerTitle.contentEditable = true;
        this.containerContent.contentEditable = true;
    }

    /**
     * Passe le post-it en mode vue
     */
    setViewMode() {
        this.container.dataset.mode = MODE_VIEW;
        this.containerTitle.contentEditable = false;
        this.containerContent.contentEditable = false;
    }

    commandEdit() {
        const editEvent = new CustomEvent( 'pi.edit', this.eventDetail );
        document.dispatchEvent( editEvent );
    }
    commandSave() {
        const saveEvent = new CustomEvent( 'pi.save', this.eventDetail );
        document.dispatchEvent( saveEvent );
    }
    commandCancel() {
        const cancelEvent = new CustomEvent( 'pi.cancel', this.eventDetail );
        document.dispatchEvent( cancelEvent );
    }
    commandDelete() {
        const deleteEvent = new CustomEvent( 'pi.delete', this.eventDetail );
        document.dispatchEvent( deleteEvent );
    }

    /**
     * Donne la forme que doit avoir le post-it en littéral (utilisé par JSON.stringify())
     * @returns Forme littérale du PostIt
     */
    toJSON() {
        return {
            title: this.title,
            content: this.content,
            dateCreate: this.dateCreate,
            dateUpdate: this.dateUpdate
        };
    }

    /**
     * Gère les événements sur les boutons du post-it
     * @param {Event} evt
    */
    handlerButtons( evt ) {
        const elTarget = evt.target;
        const role = elTarget.dataset.role;

        switch( role ) {
            case 'edit':
                this.commandEdit();
                break;
            case 'save':
                this.commandSave();
                break;
            case 'cancel':
                this.commandCancel();
                break;
            case 'delete':
                this.commandDelete();
                break; 
            default:
                break;
        }
    }
}