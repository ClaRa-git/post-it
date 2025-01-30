// app n'est pas entre accolades, car il est exporté "defaut".
// Il est possible d'importer plusieurs fichiers en même temps en les mettant entre accolades pour les "export" sans "default".
import app from './AppPostits/App';

// Import de la feuille de style
import './assets/css/style.css';

app.start();