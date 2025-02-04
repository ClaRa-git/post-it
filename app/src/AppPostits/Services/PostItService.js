import { PostIt } from "../PostIt";

const STORAGE_NAME = 'post-its';

export class PostItService {

    /**
     * CRUD : Read all
     */
    getAll() {
        let result = [];

        try {
            // Récupère les données dans le localStorage
            const serializedData = localStorage.getItem(STORAGE_NAME);

            // Transforme les données en tableau
            const literalResult = JSON.parse(serializedData);

            for (let literalPostIt of literalResult) {
                result.push(new PostIt( literalPostIt ));
            }

        } catch (e) {
            localStorage.removeItem(STORAGE_NAME);
        }

        return result;
    }

    /**
     * CRUD : Create all
     * @param {Array} arrData
     */
    saveAll(arrData) {
        // Transforme les données en chaine de caractères
        const serializedData = JSON.stringify(arrData);

        try {
            // Enregistre les données dans le localStorage
            localStorage.setItem(STORAGE_NAME, serializedData);
        } catch (e) {
            return false;
        }

        // Si enregistrement OK
        return true;
    }
}
