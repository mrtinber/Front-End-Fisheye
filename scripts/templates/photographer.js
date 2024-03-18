/* eslint-disable linebreak-style */
export function photographerTemplate(data) {
    const { name, portrait, city, country, tagline, price, id } = data;

    const picture = `assets/photographers/ID/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement("article");
        // Création de la balise lien et attribution de l'id du photographe
        const a = document.createElement("a");
        a.setAttribute("href", `photographer.html?id=${id}`);
        // Création de la balise image et de ses attributs
        const img = document.createElement("img");
        img.setAttribute("src", picture);
        img.setAttribute("aria-label", `Photo de profil de ${name}`);
        // Création des différentes informations liées au photographe
        const div = document.createElement("div");
        div.classList.add("photographerInfos");
        div.setAttribute("tabindex", "0");
        const h2 = document.createElement("h2");
        h2.textContent = name;
        h2.setAttribute("aria-label", `Nom du photographe : ${name}`);

        const location = document.createElement("span");
        location.textContent = `${city}, ${country}`;
        location.setAttribute("aria-label", `Ville et pays : ${city}, ${country}`);
        location.setAttribute("class", "location_photographer");

        const tagLine = document.createElement("span");
        tagLine.textContent = tagline;
        tagLine.setAttribute("aria-label", `Slogan : ${tagline}`);
        tagLine.setAttribute("class", "tagline_photographer");

        const p = document.createElement("p");
        p.setAttribute("id", "dailyPrice");
        p.innerText = `${price}€/jour`;
        p.setAttribute("aria-label", `Prix par jour : ${price} euros`);

        // Rattachement au code HTML
        article.appendChild(a);
        article.appendChild(div);
        a.appendChild(img);
        a.appendChild(h2);
        div.appendChild(location);
        div.appendChild(tagLine);
        div.appendChild(p);
        return article;
    }

    return { name, picture, id, getUserCardDOM };
}
