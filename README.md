# Application d'ajout et de modification d'élèves dans la base de données Firebase

Cette application permet d'ajouter les nouvelles informations d'un nouvel élève et de calculer l'empreinte carbone de son trajet école/maison et maison/travail par jour.

## Structure

### Ajout d'élèves
`./src/components/AddStudent`
Cette vue permet d'ajouter un élève.

Le format de l'adresse sera géré par l'api google place qui permet d'être sûr que l'adresse exite.

Le calcul se fait de la même manière que le script qui permet de mettre à jour la base de données tous les mois. Les calculs sont expliqués dans ce projet et dans le compte rendu technique.

La fonction <b>handleSubmit</b> n'est pas utilisée pour l'instant car nous n'avons pas eu le temps de formater les données entrées dans la base, pour l'instant c'est la fonction <b>handleSuccess</b> pour un semblant de validation.

`./src/components/UpdateStudent`
Cette vue permet de mettre un élève déjà existant, cette partie est en cours de développement donc indisponible.
Réflexion sur la mise en place:
- D'une part un moyen de s'authentifier pour avoir accès à ses informations si l'élève souhaite changer ses informations.
- Ou alors la modification des adresses est uniquement accessible à l'administration qui peut alors chercher l'élève dans une liste et modifier ses informations.

## But de l'application

Cette application a pour but de rendre très accessible la donnée afin d'avoir les statistiques les plus exactes possible.

## Mise en place du projet

Création du projet :
`npx create-react-app workshopReact`

Pour l'utilisation du projet, installation des dépendances suivantes :

`npm install @material-ui/core @material-ui/icons @material-ui/styles` <br/> package theme material.ui version 4  [https://mui.com/](https://mui.com/) <br/>
`npm install axios` pour les requêtes api <br/>
`npm install firebase` pour récupérer les données sur la base, les accès base seront communiqués ultérieurement <br/>
`npm install moment` pour obtenir les dates <br/>

## Déploiement de l'application

Plusieurs options sont viables :

### Firebase
`npm install -g firebase-tools`
<br/>`firebase login`
<br/> `firebase init` <br/>
Ensuite chosir le dossier built pour le déploiement.

### AWS

Via AWS Amplify Console, le déploiement se fait en continu et simplement [AWS Amplify Console](https://signin.aws.amazon.com/signin?redirect_uri=https%3A%2F%2Fconsole.aws.amazon.com%2Famplify%2Fhome%3Ffromtb%3Dtrue%26hashArgs%3D%2523%26isauthcode%3Dtrue%26state%3DhashArgsFromTB_us-east-1_f5d0daa6621ab0bc&client_id=arn%3Aaws%3Asignin%3A%3A%3Aconsole%2Famplify&forceMobileApp=0&code_challenge=SV8oZ0IV2-9KasgeCzWX4RnGw8XsNVLjdytLG0dSLGA&code_challenge_method=SHA-256)

#### Le choix va dépendre de la tarification

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
