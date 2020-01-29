# Agregateur ville de Montréal
### Configuration
## 1. Installer NodeJs
Le programme utilise la version [12.12.0](https://nodejs.org/en/download/current/) de NodeJs.

## 2. Installation des modules
Pour installer les modules nodes, il faut entrer la commande suivante.
`npm install`

## 3. Lancement du programme
Pour lancer le programme, il faut entrer la commande suivante.
`npm run start`

## 4. Lancer le broker et les clients
Brocker :
`node moscaBroker.js`

Client :
`node client.js`

## 6. Configuration de la base de données
1. Installer [MySql](https://nodejs.org/en/download/current/)
2. Executer la requête suivante `ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'YOUR_PASSWORD'`
3. `node server/database/create_database.js`
4. `node server/database/create_tables.js`
