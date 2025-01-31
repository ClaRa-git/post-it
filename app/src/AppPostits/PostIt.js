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

    constructor( postItLiteral ) {
        this.title = postItLiteral.title;
        this.content = postItLiteral.content;
        this.dateCreate = postItLiteral.dateCreate;
        this.dateUpdate = postItLiteral.dateUpdate;
    }

    /**
     * Crée un élément DOM représentant le post-it
     * @returns {HTMLElement} 
     */
    getDOM() {
        /* 
        Template :
        <li>
            <div class="nota-header">
                <div class="nota-times">
                    <strong>création: </strong>LA_DATE<br>
                    <strong>màj: </strong>LA_DATE
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

        const elLi = document.createElement( 'li' );
        elLi.classList.add( 'nota' );
        elLi.dataset.mode = MODE_VIEW;

        // Dates formatées
        let dateCreate = new Date( this.dateCreate ).toLocaleString();
        let dateUpdate = new Date( this.dateUpdate ).toLocaleString();

        let innerDom = '';
        innerDom += '<div class="nota-header">';
        innerDom +=     '<div class="nota-times">';
        innerDom +=         `<strong>création: </strong>${dateCreate}<br>`;
        innerDom +=         `<strong>màj: </strong>${dateUpdate}`;
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
        innerDom += `<div class="nota-title">${this.title}</div>`;
        innerDom += `<div class="nota-content">${this.content}</div>`;

        // On injecte le contenu dans le li
        elLi.innerHTML = innerDom;

        // Ecouteurs d'événements sur les boutons
        elLi.addEventListener( 'click', this.handlerButtons.bind( this ) );

        return elLi;
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
        console.log(evt);
    }
}