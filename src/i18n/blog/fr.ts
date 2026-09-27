/**
 * Traductions Blog — FRANÇAIS.
 *
 * `bodyHtml` reflète la structure des articles anglais (h2/p/table/a) en HTML
 * pré-rendu. Les liens internes vers /contact/ et /products/ utilisent le
 * préfixe /fr/. Chiffres et unités (kW, kWh, V, Ah, W) inchangés.
 */
import type { BlogTable } from '../blog-content';

export const frBlog: BlogTable = {
  'hybrid-vs-grid-tie-vs-off-grid': {
    title: 'Hybride vs Raccordé au Réseau vs Hors-Réseau : Quelle Topologie d’Onduleur pour Votre Projet ?',
    description:
      'Une comparaison pratique des trois topologies d’onduleurs pour les projets solaires — ce que fait chacune, ce qu’elles coûtent, et comment choisir la bonne pour votre marché.',
    tags: ['Guide des Onduleurs', 'Bases du Solaire'],
    bodyHtml: `
<p>Choisir la topologie de l’onduleur est la première — et la plus déterminante — des décisions dans tout projet solaire. Ce guide compare les trois topologies grand public et les met en regard des scénarios de projets réels que nous voyons chez les acheteurs B2B.</p>

<h2>Comparaison rapide</h2>

<table>
  <thead>
    <tr>
      <th></th>
      <th>Raccordé au réseau</th>
      <th>Hors-réseau</th>
      <th>Hybride</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Revente au réseau</td>
      <td>Oui</td>
      <td>Non</td>
      <td>Configurable</td>
    </tr>
    <tr>
      <td>Support batterie</td>
      <td>Non</td>
      <td>Oui</td>
      <td>Oui</td>
    </tr>
    <tr>
      <td>Fonctionne en cas de coupure</td>
      <td>Non</td>
      <td>Oui</td>
      <td>Oui (&lt; 10 ms)</td>
    </tr>
    <tr>
      <td>Usage typique</td>
      <td>Réduction de facture</td>
      <td>Pas de réseau disponible</td>
      <td>Stockage + secours</td>
    </tr>
    <tr>
      <td>Coût relatif</td>
      <td>Le plus bas</td>
      <td>Moyen</td>
      <td>Le plus élevé</td>
    </tr>
  </tbody>
</table>

<h2>Raccordé au réseau : maximiser le retour sur un réseau existant</h2>

<p>Les onduleurs raccordés au réseau convertissent le courant continu en courant alternatif et revendent le surplus au réseau. Ce sont les moins chers au watt et les plus efficaces, mais la réglementation impose leur arrêt en cas de coupure — aucune alimentation de secours.</p>

<p><strong>Idéal pour :</strong> les marchés disposant d’un comptage net ou de tarifs de rachat, et les clients dont l’objectif est purement économique.</p>

<h2>Hors-réseau : l’énergie là où le réseau n’arrive pas</h2>

<p>Les onduleurs hors-réseau forment leur propre mini-réseau à partir du PV et de la batterie, souvent avec une entrée groupe électrogène en secours. Le dimensionnement rigoureux compte : vous devez couvrir le mois le plus défavorable, pas le mois moyen.</p>

<p><strong>Idéal pour :</strong> l’électrification rurale, les sites télécoms, les îles et les chalets.</p>

<h2>Hybride : le milieu de gamme à la croissance la plus rapide</h2>

<p>Les onduleurs hybrides combinent un onduleur raccordé au réseau et un chargeur de batterie. Ils revendent quand c’est rentable, rechargent quand c’est avantageux et assurent le secours du foyer en cas de coupure du réseau — le tout dans une seule unité.</p>

<p><strong>Idéal pour :</strong> les marchés où les coupures se multiplient, avec des tarifs horaires ou des incitations à l’autoconsommation. C’est le segment à la croissance la plus rapide dans la plupart des régions que nous servons.</p>

<h2>Comment nous aidons les acheteurs B2B à décider</h2>

<p>Partagez votre marché cible et le profil type de vos projets avec nos ingénieurs commerciaux — nous recommanderons la bonne combinaison de topologies pour votre catalogue, ainsi que les exigences de certification de votre pays de destination. Commencez par le <a href="/fr/contact/">formulaire de demande</a>.</p>
`,
  },
  'how-to-size-a-hybrid-solar-system': {
    title: 'Comment Dimensionner un Système Solaire Hybride : Une Méthode Pas à Pas',
    description:
      'Dimensionner un système solaire avec stockage en cinq étapes : audit des charges, champ PV, parc de batteries, puissance de l’onduleur et contrôle de conformité — avec des exemples chiffrés.',
    tags: ['Guide de Dimensionnement', 'Systèmes Hybrides'],
    bodyHtml: `
<p>Un dimensionnement correct est ce qui distingue un système hybride qui ravit le client d’un système qui déçoit. Voici la méthode en cinq étapes utilisée par nos ingénieurs, que vous pouvez appliquer directement à vos projets clients.</p>

<h2>Étape 1 : Auditer les charges</h2>

<p>Listez chaque charge avec sa puissance absorbée et ses heures de fonctionnement quotidiennes. Le résultat est un budget d’énergie quotidien en kWh. Ne devinez pas — un enregistreur de données ou les factures d’électricité du client battent l’estimation à chaque fois.</p>

<p><strong>Exemple :</strong> un foyer consommant 12 kWh/jour avec un pic de soirée de 6 kW.</p>

<h2>Étape 2 : Dimensionner le champ PV</h2>

<p>Divisez le budget quotidien par les heures d’ensoleillement équivalentes locales, puis ajoutez 15 à 25 % pour les pertes système, le rendement aller-retour de la batterie et la dégradation des panneaux.</p>

<p><strong>Exemple :</strong> 12 kWh ÷ 4,5 h d’ensoleillement × 1,25 ≈ 3,3 kW → un champ de 4 kW (8 panneaux de 500 W) laisse une marge.</p>

<h2>Étape 3 : Dimensionner le parc de batteries</h2>

<p>Définissez l’objectif de secours : charges essentielles uniquement (réfrigérateur, éclairage, routeur) ou toute la maison. Multipliez par les heures (ou jours) d’autonomie requis, et respectez le courant de charge maximal de l’onduleur — un parc de batteries trop petit pour absorber la production PV gaspille de l’énergie.</p>

<p><strong>Exemple :</strong> 8 kWh de stockage (48 V × ~170 Ah utiles) couvrent les charges essentielles pendant la nuit avec un jour d’autonomie.</p>

<h2>Étape 4 : Choisir l’onduleur</h2>

<p>La puissance continue de l’onduleur doit dépasser la pointe simultanée des charges, et sa puissance de surcharge doit couvrir le démarrage des moteurs. Une unité de 5 kW en continu / 10 kW en surcharge — parcourez notre <a href="/fr/products/">catalogue d’onduleurs</a> — gère aisément un pic de soirée de 6 kW réparti entre des charges non simultanées, avec une marge pour l’appel de courant.</p>

<h2>Étape 5 : Vérifier la conformité</h2>

<p>Confirmez les codes réseau, les limites de revente et les exigences de certification du marché de destination avant de chiffrer. C’est là que le support OEM se rentabilise — nous pré-configurons en ligne de production un micrologiciel spécifique à chaque marché.</p>

<h2>Besoin d’une vérification ?</h2>

<p>Envoyez-nous votre audit de charges et votre marché cible via le <a href="/fr/contact/">formulaire de contact</a> — nos ingénieurs vérifieront votre dimensionnement et recommanderont les modèles adaptés, gratuitement.</p>
`,
  },
};
