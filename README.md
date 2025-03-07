# Daily Dice

:warning: Code entierrement généré par IA avec Copilot Edit ! Aucun changement humain n'a été apporté.

Un outil simple pour tirer au sort les membres de l'équipe lors des réunions daily.

## Fonctionnalités

- Ajouter/supprimer des membres d'équipe
- Tirage au sort aléatoire
- Historique des membres sélectionnés
- Persistance des données dans le navigateur

## Déploiement

Ce projet est automatiquement déployé sur Surge.sh grâce aux GitHub Actions.

### Configuration des secrets GitHub

Pour que le déploiement fonctionne, vous devez ajouter deux secrets dans les paramètres de votre dépôt GitHub:

1. `SURGE_DOMAIN` : Le domaine sur lequel vous souhaitez déployer (ex: daily-dice.surge.sh)
2. `SURGE_TOKEN` : Votre token Surge.sh (obtenez-le en exécutant `surge token` en ligne de commande)

## Développement local

Ouvrez simplement le fichier `index.html` dans votre navigateur ou utilisez un serveur local comme Live Server (extension VS Code).