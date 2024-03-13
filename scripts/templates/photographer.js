function photographerTemplate(data) {
    const { name, portrait, city, country, tagline, price, id } = data;

    const picture = `assets/photographers/ID/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement('article');
        // Création de la balise lien et attribution de l'id du photographe
        const a = document.createElement('a');
        a.setAttribute("href", `photographer.html?id=${id}`);
        // Création de la balise image et de ses attributs
        const img = document.createElement('img');
        img.setAttribute("src", picture);
        img.setAttribute("aria-label", `Photo de profil de ${name}`);
        // Création des différentes informations liées au photographe
        const div = document.createElement('div');
        div.classList.add("photographerInfos");
        div.setAttribute("tabindex", "0");
        // Création des éléments <span> pour la description
        // const spanH2 = document.createElement('span');
        // spanH2.classList.add('sr-only');
        // spanH2.textContent = `Nom du photographe : ${name}`;
        // spanH2.id = `name-description-${id}`;
        const h2 = document.createElement('h2');
        h2.textContent = name;
        // h2.setAttribute("aria-hidden", "true"); // Cacher pour les lecteurs d'écran
        // div.appendChild(spanH2);
        h2.setAttribute("aria-label", `Nom du photographe : ${name}`);

        // const spanH3 = document.createElement('span');
        // spanH3.classList.add('sr-only');
        // spanH3.textContent = `Ville et pays : ${city}, ${country}`;
        // spanH3.id = `location-description-${id}`;
        const h3 = document.createElement('h3');
        h3.textContent = `${city}, ${country}`;
        // h3.setAttribute("aria-hidden", "true"); // Cacher pour les lecteurs d'écran
        // div.appendChild(spanH3);
        h3.setAttribute("aria-label", `Ville et pays : ${city}, ${country}`);

        // const spanH4 = document.createElement('span');
        // spanH4.classList.add('sr-only');
        // spanH4.textContent = `Slogan : ${tagline}`;
        // spanH4.id = `tagline-description-${id}`;
        const h4 = document.createElement('h4');
        h4.textContent = tagline;
        // h4.setAttribute("aria-hidden", "true"); // Cacher pour les lecteurs d'écran
        // div.appendChild(spanH4);
        h4.setAttribute("aria-label", `Slogan : ${tagline}`);

        // const spanP = document.createElement('span');
        // spanP.classList.add('sr-only');
        // spanP.textContent = `Prix par jour : ${price} euros`;
        // spanP.id = `price-description-${id}`;
        const p = document.createElement('p')
        p.setAttribute("id", "dailyPrice")
        p.innerText = `${price}€/jour`;
        // p.setAttribute("aria-hidden", "true");
        // div.appendChild(spanP);
        p.setAttribute("aria-label", `Prix par jour : ${price} euros`);

        // Rattachement au code HTML
        article.appendChild(a);
        article.appendChild(div);
        a.appendChild(img);
        div.appendChild(h2);
        div.appendChild(h3);
        div.appendChild(h4);
        div.appendChild(p);
        return article;
    }

    return { name, picture, id, getUserCardDOM }
}
