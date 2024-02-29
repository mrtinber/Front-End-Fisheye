function photographerTemplate(data) {
    const { name, portrait, city, country, tagline, price, id } = data;

    const picture = `assets/photographers/ID/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
    //Création de la balise lien et attribution de l'id du photographe
        const a = document.createElement('a');
        a.setAttribute("href", `photographer.html?id=${id}`);
    //Création de la balise image et de ses attributs
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        //img.setAttribute("alt", `Portrait de ${name}`)
        img.setAttribute("aria-label", `Photo de profil de ${name}`)
    //Création des différentes informations liées au photographe
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        const h3 = document.createElement('h3');
        h3.innerText = `${city}, ${country}`; 
        const h4 = document.createElement('h4');
        h4.innerText = tagline;
        const p = document.createElement('p')
        p.innerText = `${price}€/jour`;
    //Rattachement au code HTML
        article.appendChild(a);
        a.appendChild(img);
        article.appendChild(h2);
        article.appendChild(h3);
        article.appendChild(h4);
        article.appendChild(p);
        return (article);
    }
    return { name, picture, id, getUserCardDOM }
}