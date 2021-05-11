import Vue from 'vue';
import VueI18n from 'vue-i18n'
import FlagIcon from 'vue-flag-icon'

Vue.use(VueI18n);
Vue.use(FlagIcon);

const messages = {
    'en': {
        /* Languages*/
        english: "English",
        french: "French",

        /* Global */
        title: "Computer Database",
        login: "Login",
        darkMode: "Dark Mode",

        /* Common */
        cancel: "Cancel",
        submit: "Submit",
        confirm: "Confirm",
        search: "Search",

        /* Forms */
        newCompany: 'New Company',
        newComputer: 'New Computer',
        email: "E-mail",
        password: "Password",
        rememberMe: "Remember Me",
        resetFields: "Reset fields",
        emailMustBeValid: 'E-mail must be valid',

        /* Dashboard */
        totalComputersFound: "Total computers found",
        computerName: "Computer Name",
        introducedDate: "Introduction date",
        discontinuedDate: "Discontinuation date",
        companyName: "Company Name",
        computersPerPage: "Computers per page",
        addComputer: "Add a computer",
        deletionConfirmation: "Deletion Confirmation",
        deletionConfirmationMessage: "This deletion is irreversible. Are you sure to proceed?",
        totalCompaniesFound: "Total companies found",
        companiesPerPage: "Companies per page",
        snackbarComputerAdded: 'Computer succesfully added',
        snackbarComputerEdited: 'Computer succesfully edited',
        snackbarComputersDeleted: "computer(s) deleted",
        snackbarComputersNotDeleted: "Computers could not be deleted",

        /* Validation */
        computerNameRequired: "Computer name is required",
        discontinuationAfterIntroductionRequired:"Discontinuation date must be after introduction date",
        companyNameRequired: 'Company name is required',
        passwordMinimalLength: 'Password must be more than 8 characters',
        required: "Required",
        
    },
    'fr': {
          /* Languages*/
        english: "Anglais",
        french: "Français",

        /* Global */
        title: "Base de données ordinateurs",
        login: "Se Connecter",
        darkMode: "Thème sombre",

        /* Common */
        cancel: "Annuler",
        submit: "Valider",
        confirm: "Confirmer",
        search: "Chercher",

        /* Forms */
        newCompany: 'Nouvelle Entreprise',
        newComputer: 'Nouvel Ordinateur',
        email: "E-mail",
        password: "Mot de passe",
        rememberMe: "Se souvenir de moi",
        resetFields: "Réinitialiser les champs",
        emailMustBeValid: 'L\'E-mail doit être valide',

        /* Dashboard */
        totalComputersFound: "Total d'ordinateurs trouvés",
        computerName: "Nom ordinateur",
        introducedDate: "Date d'introduction",
        discontinuedDate: "Date de fin",
        companyName: "Nom entreprise",
        computersPerPage: "Ordinateurs par page",
        addComputer: "Ajouter un ordinateur",
        deletionConfirmation: "Confirmation de suppression",
        deletionConfirmationMessage: "Cette suppression est irréversible. Etes-vous sûr de continuer?",
        totalCompaniesFound: "Total d'entreprises trouvées",
        companiesPerPage: "Entreprises par page",
        snackbarComputerAdded: "Succès de l'ajout de l'ordinateur ",
        snackbarComputerEdited: "Succès de la mise à jour de l'ordinateur",
        snackbarComputersDeleted: "ordinateur(s) supprimé(s)",
        snackbarComputersNotDeleted: "Les ordinateurs n'ont pas pu être supprimés",

        /* Validation */
        computerNameRequired: "Le nom de l'ordinateur est obligatoire",
        discontinuationAfterIntroductionRequired:"La date de fin doit être après la date d'introduction",
        companyNameRequired: "Le nom de la compagnie est obligatoire",
        passwordMinimalLength: "Le mot de passe doit avoir au moins 8 caractères",
        required: "Requis",
    }
};

export default new VueI18n({
    locale: 'fr',
    fallbackLocale: 'en', 
    messages,
});
