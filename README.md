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


## 5. Tester l'application
Une fois l'application configuré, vous pouvez tester les divers requêtes

`/read/{fichier}/agregateur?calcule={type_calcule}&lane={No_lane}&dateD={Date}&dateF={Date}`
**data_source**: indique au système la source d’ou provient les donneés. 
**read/nom_fichier** : indique au système que la source provient d’un fichier.

**type_calcule** représente la fonction d’agrégation utilisé. 
Valeur Valide:
- M : La moyenne de véhicules par voie.
- T: Le total de véhicule pour une voie(spécifier).
- Ts: Le total de véhicule pour une voie(spécifié) par seconde.

**No_lane** représente le numéro de la voie pour laquelle on veut agrégée les données. Valeur valide :
- 0 à 7

Le deux paramètre date représente l’intervalle de temps pour lequel on veut l’agrégation de donnée. Valeur valide :
Une date sous le format : Année-Mois-JourTHeure:Minutes:Secondes (2019-09-18T00:00:00)

#### Voici une requête valide : 
`localhost:8080/read/test.txt/agregateur?calcule=T&lane=2&dateD=2019-09-18T00:00:00&dateF=2019-10-19T00:00:00`
