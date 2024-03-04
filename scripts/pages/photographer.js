//Mettre le code JavaScript lié à la page photographer.html

async function getPhotographers() {
    // Charger le fichier JSON
    const response = await fetch('./data/photographers.json');

    // Convertir la réponse en JSON
    const photographersData = await response.json();
    //console.log(photographersData);
    
    // Retourner les données des photographes
    return photographersData;
}

async function displayData(photographers) {
    const photographersHeader = document.querySelector(".photographer_header");

    //Récupération de l'ID dans l'URL
    let params = new URL(document.location).searchParams;
    let photographerID = params.get("id");
    console.log(photographerID);

    // Recherche du photographe avec l'ID correspondant
    const photographer = photographers.find(photographer => photographer.id === parseInt(photographerID));

    if (photographer) {
        const photographerModel = photographerTemplate(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersHeader.appendChild(userCardDOM);
    }
}

async function init() {
    // Récupère les datas des photographes
    const { photographers, media } = await getPhotographers();
    displayData(photographers);

    // Création de la factory pour chaque media
    const mediaElements = media.map(mediaUnit => {
        const factory = new photographerFactory(photographers, mediaUnit);
        return factory.createMediaElement();
    });
}

init();