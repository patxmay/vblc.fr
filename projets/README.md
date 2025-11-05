# Volley club

## Production

Pour fonctionner, il faut docker sur le serveur.

### Installation

La première fois, il faut installer les dépendances :

Lancement du projet :

```bash
docker-compose up -d
```

On rentre dans le container __app__ :

```bash
docker-compose exec app bash
```

Dans le container, on peut lancer les commandes habituelles.

D'abord, on installe les dépendances du front et on le build :

```bash
cd frontend
npm install
npm run build

# retour à la racine du projet
cd ../
```

Puis le serveur :

```bash
npm install
npm start
```

Il est possible de lancer le serveur avec un process manager (pm2). Au lieu de `npm start`, on peut faire :

```bash
npm run prod
```

PM2 : <https://pm2.keymetrics.io/>
