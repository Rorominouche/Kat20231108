const staticCacheName = "cache-v1";
//une constante staticCacheName est définie pour représenter le nom du cache statique. Ce nom est utilisé pour identifier le cache que le service worker va créer et gérer.
const assets = ["/", "/index.html"];
//on indique la racine impérativement puis la page en cache;La constante assets contient une liste de ressources (URLs) à mettre en cache. Dans cet exemple, les ressources mises en cache sont la racine / et le fichier index.html.

// ajout fichiers en cache
self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      cache.addAll(assets);
    })
  );
});
//caches est un objet natif de JS, on en fait une variable et on lui donne un nom "cache v1". Puis on lui dit ce qu'il fait: il ajoute une variable assets;Lorsque le service worker est installé pour la première fois (ou qu'il a été mis à jour), cet événement install est déclenché. Dans cet événement, le code ouvre un cache portant le nom défini précédemment (staticCacheName) et y ajoute les ressources spécifiées dans la liste assets.

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      if (response) {
        return response;
      }

      // IMPORTANT: Cloner la requête.
      // Une requete est un flux et est à consommation unique (on utilise1 seule fois et apres on clone sa valeur)
      // Il est donc nécessaire de copier la requete pour pouvoir l'utiliser et la servir
      var fetchRequest = event.request.clone();

      return fetch(fetchRequest).then(function (response) {
        if (!response || response.status !== 200 || response.type !== "basic") {
          return response;
        }
        //L'événement fetch est déclenché chaque fois que le navigateur effectue une requête réseau (par exemple, pour récupérer une ressource). Dans cet événement, le code vérifie si la requête existe déjà dans le cache. Si oui, il renvoie la réponse en cache. Sinon, le code continue avec la gestion des requêtes réseau.

        // IMPORTANT: Même constat qu'au dessus, mais pour la mettre en cache
        var responseToCache = response.clone();

        caches.open(staticCacheName).then(function (cache) {
          cache.put(event.request, responseToCache);
        });

        return response;
      });
    })
  );
});
//Si la requête n'est pas trouvée dans le cache, le code clône la requête (fetchRequest) et effectue une requête réseau à l'aide de fetch(). Si la réponse est valide (statut 200 et type 'basic'), la réponse est mise en cache pour une utilisation ultérieure.

// supprimer caches: on se prend la clé du cache (cache-v1) et si elle n'est pas réutilisée (clé comparée à staticcachename), on supprime le cache pour ne pas surcharger l'ordi de l'utilisateur qd il revient sur le site
self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.add(
        keys
          .filter((key) => key !== staticCacheName)
          .map((key) => caches.delete(key))
      );
    })
  );
});
