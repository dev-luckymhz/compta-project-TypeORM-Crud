<!DOCTYPE html>
<html lang="fr">
<body>
    <h1>Projet Node.js + Express</h1>
    <p>Ce projet est une application Node.js développée avec Express, TypeScript, et TypeORM, utilisant une base de données MySQL. L'application fournit des opérations CRUD pour gérer les clients et leurs bilans comptables.</p>
<div class="section">
            <h2>Installation du Projet</h2>
            <pre>
            <code>
            git clone https://github.com/dev-luckymhz/compta-project-TypeORM-Crud.git
            cd compta-project-TypeORM-Crud.git
            npm install
            </code></pre>
    </div>

<div class="section">
        <h2>Scripts</h2>
        <p>Le projet inclut plusieurs scripts npm pour des tâches courantes :</p>
        <ul>
            <li><code>npm run build</code> : Compile le TypeScript en JavaScript.</li>
            <li><code>npm start</code> : Démarre l'application en utilisant les fichiers JavaScript compilés.</li>
            <li><code>npm run dev</code> : Démarre l'application en mode développement en utilisant <code>ts-node</code> et <code>nodemon</code>.</li>
            <li><code>npm test</code> : Exécute la suite de tests avec Jest.</li>
            <li><code>npm run seed</code> : Peuple la base de données avec des données initiales.</li>
        </ul>
    </div>

<div class="section">
        <h2>Routes de l'API</h2>
        <p>L'application fournit les routes API suivantes :</p>
        <h3>Bilans Comptables</h3>
        <ul>
            <li><strong>GET /api/balance-sheets/client/:clientId</strong> : Récupérer les bilans d'un client spécifique.</li>
            <li><strong>GET /api/balance-sheets/:id</strong> : Récupérer un bilan spécifique par ID, incluant les informations du client.</li>
            <li><strong>POST /api/balance-sheets/</strong> : Créer un nouveau bilan pour un client.</li>
            <li><strong>PUT /api/balance-sheets/:id</strong> : Mettre à jour un bilan existant.</li>
            <li><strong>DELETE /api/balance-sheets/delete/:id</strong> : Supprimer un bilan.</li>
        </ul>
        <h3>Clients</h3>
        <ul>
            <li><strong>GET /api/clients/get/:id</strong> : Récupérer un client spécifique par ID.</li>
            <li><strong>POST /api/clients/create</strong> : Créer un nouveau client.</li>
            <li><strong>PUT /api/clients/:id</strong> : Mettre à jour les informations d'un client.</li>
            <li><strong>DELETE /api/clients/:id</strong> : Supprimer un client.</li>
            <li><strong>GET /api/clients/check-duplicates</strong> : Vérifier les clients potentiellement en double.</li>
            <li><strong>GET /api/clients/duplicates</strong> : Obtenir la liste de tous les clients en double.</li>
        </ul>
    </div>

<div class="section">
        <h2>Tests</h2>
        <p>Le projet inclut des tests écrits avec Jest. Pour exécuter les tests, utilisez la commande suivante :</p>
        <pre><code>npm test</code></pre>
    </div>

<div class="section">
        <h2>Contribution</h2>
        <p>Merci de suivre le workflow Git standard pour contribuer :</p>
        <ol>
            <li>Forkez le repository</li>
            <li>Créez une nouvelle branche pour votre fonctionnalité ou correction de bug</li>
            <li>Faites vos commits</li>
            <li>Push vos modifications sur votre fork</li>
            <li>Soumettez une pull request</li>
        </ol>
    </div>

<div class="section">
        <h2>Licence</h2>
        <p>Ce projet est sous licence MIT.</p>
    </div>
</body>
</html>
