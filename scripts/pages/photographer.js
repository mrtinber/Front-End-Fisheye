/* eslint-disable linebreak-style */
import { PhotographerFactory } from "../factories/photographerFactory.js";
import { generateLightBox } from "../utils/lightbox.js";
import { photographerTemplate } from "../templates/photographer.js";

let createdMedia = [];

async function getPhotographers() {
    // Charger le fichier JSON
    const response = await fetch("./data/photographers.json");

    // Convertir la réponse en JSON
    const photographersData = await response.json();

    // Retourner les données des photographes
    return photographersData;
}

async function displayData(photographers) {
    const photographersHeader = document.querySelector(".photographer_header");

    //Récupération de l'ID dans l'URL
    let params = new URL(document.location).searchParams;
    let photographerID = params.get("id");

    // Recherche du photographe avec l'ID correspondant
    const photographer = photographers.find(photographer => photographer.id === parseInt(photographerID));

    if (photographer) {
        // eslint-disable-next-line no-undef
        const photographerModel = photographerTemplate(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersHeader.appendChild(userCardDOM);
    }

    //Ajout du nom dans la modal
    const modalHeader = document.querySelector(".modal header h2");
    modalHeader.innerHTML = `Contactez-moi <br>${photographer.name}`;

    //Transformation du h2 en h1
    const titleName = document.querySelector("h2");
    const newH1 = document.createElement("h1");
    const photographerInfos = document.querySelector(".photographerInfos");
    newH1.textContent = titleName.textContent;
    newH1.setAttribute("aria-label", "Page du photographe : " + newH1.textContent);
    titleName.parentNode.replaceChild(newH1, titleName);
    // Insérer newH1 au début de photographerInfos
    photographerInfos.insertBefore(newH1, photographerInfos.firstChild);
}

function generateMedia(photographers, media) {

    // Création de la factory pour chaque media
    media.forEach(mediaUnit => {
        const factory = new PhotographerFactory(photographers, mediaUnit);
        const createdElement = factory.createMediaElement();

        if (createdElement) {
            createdElement.textContent = mediaUnit.title;
            createdMedia.push(createdElement);
        }
    });

    generateLightBox(createdMedia);
}


function generateLikes(createdMedia) {
    // Somme des likes pour les éléments créés
    let totalLikes = 0;

    createdMedia.forEach(function (unit) {
        const likes = unit.getAttribute("data-likes");
        if (likes) {
            totalLikes += parseInt(likes);
        }
    });

    //Création de l'onglet flottant avec le prix et le total de likes
    const divPrice = document.querySelector(".photographer_price");
    const photographerLikes = document.createElement("div");
    divPrice.appendChild(photographerLikes);
    const photographerPrice = document.getElementById("dailyPrice");
    divPrice.appendChild(photographerPrice);
    photographerLikes.innerHTML = `<p id="total_likes">${totalLikes} <i class="fa-solid fa-heart"></i></p>`;
}

export function updateTotalLikes() {
    let totalLikes = 0;
    createdMedia.forEach(function (unit) {
        const likes = unit.getAttribute("data-likes");
        if (likes) {
            totalLikes += parseInt(likes);
        }
    });
    const photographerLikes = document.getElementById("total_likes");
    if (photographerLikes) {
        photographerLikes.innerHTML = `<p id="total_likes">${totalLikes} <i class="fa-solid fa-heart"></i></p>`;
    }
}

async function init() {
    // Récupère les datas des photographes
    const { photographers, media } = await getPhotographers();
    displayData(photographers);

    generateMedia(photographers, media);
    generateLikes(createdMedia);

    filters(photographers, media);
}

init();

// Tri des médias grâce aux filtres
function filters(photographers, media) {
    const filterPopularity = document.getElementById("filter_popularity");
    const filterDate = document.getElementById("filter_date");
    const filterTitle = document.getElementById("filter_title");
    const photographersMedia = document.querySelector(".photographer_media");

    function applyFilter(sortFunction) {
        createdMedia = []; //Réinitialisation de createdMedia pour éviter le cumul du total de likes
        media.sort(sortFunction);
        photographersMedia.innerHTML = "";
        generateMedia(photographers, media);
        generateLightBox(createdMedia);
    }

    filterPopularity.addEventListener("click", function () {
        applyFilter(function (a, b) {
            return b.likes - a.likes;
        });
        filterPopularity.style.display = "none";
        filterTitle.style.display = "flex";
        filterDate.style.display = "flex";
    });

    filterPopularity.addEventListener("keydown", e => {
        const key = e.key;
        if (key === "Enter") {
            applyFilter(function (a, b) {
                return b.likes - a.likes;
            });
        }
        filterPopularity.style.display = "none";
        filterTitle.style.display = "flex";
        filterDate.style.display = "flex";
    });

    filterDate.addEventListener("click", function () {
        applyFilter(function (a, b) {
            return new Date(b.date) - new Date(a.date);
        });
        filterDate.style.display = "none";
        filterPopularity.style.display = "flex";
        filterTitle.style.display = "flex";
    });

    filterDate.addEventListener("keydown", e => {
        const key = e.key;
        if (key === "Enter") {
            applyFilter(function (a, b) {
                return new Date(b.date) - new Date(a.date);
            });
        }
        filterDate.style.display = "none";
        filterPopularity.style.display = "flex";
        filterTitle.style.display = "flex";
    });

    filterTitle.addEventListener("click", function () {
        applyFilter(function (a, b) {
            if (a.title < b.title) {
                return -1;
            }
            if (a.title > b.title) {
                return 1;
            }
            return 0;
        });
        filterTitle.style.display = "none";
        filterPopularity.style.display = "flex";
        filterDate.style.display = "flex";
    });

    filterTitle.addEventListener("keydown", e => {
        const key = e.key;
        if (key === "Enter") {
            applyFilter(function (a, b) {
                if (a.title < b.title) {
                    return -1;
                }
                if (a.title > b.title) {
                    return 1;
                }
                return 0;
            });
            filterTitle.style.display = "none";
            filterPopularity.style.display = "flex";
            filterDate.style.display = "flex";
        }
    });
}