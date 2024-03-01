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

async function displayPictures(media){
    const photographersMedia = document.querySelector(".photographer_media");

    //Récupération de l'ID dans l'URL
    let params = new URL(document.location).searchParams;
    let photographerID = params.get("id");
    console.log(photographerID);

    // Recherche des médias avec l'ID du photographe correspondant
    const photographerMedia = media.filter(mediaUnit => mediaUnit.photographerId === parseInt(photographerID));

    photographerMedia.forEach((mediaUnit) => {
        console.log(mediaUnit.image);
        console.log(mediaUnit.video);
        //Création des éléments image
        const img = document.createElement("img");
        img.setAttribute("src", `./assets/photographers/${mediaUnit.photographerId}/${mediaUnit.image}`);
        photographersMedia.appendChild(img);

        //Création des éléments vidéo
        const video = document.createElement("video");
        video.setAttribute("src", `./assets/photographers/${mediaUnit.photographerId}/${mediaUnit.video}`);
        video.setAttribute("controls", "");
        photographersMedia.appendChild(video);
    });
}

async function init() {
    // Récupère les datas des photographes
    const { photographers } = await getPhotographers();
    const { media } = await getPhotographers();
    displayData(photographers);
    console.log(media);
    displayPictures(media);
}

init();