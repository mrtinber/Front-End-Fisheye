/* eslint-disable linebreak-style */
import { photographerTemplate } from "../templates/photographer.js";

async function getPhotographers() {
    // Charger le fichier JSON
    const response = await fetch("./data/photographers.json");

    // Convertir la réponse en JSON
    const photographersData = await response.json();

    // Retourner les données des photographes
    return photographersData;
}

async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");

    photographers.forEach((photographer) => {
        const photographerModel = photographerTemplate(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
}

async function init() {
    // Récupère les datas des photographes
    const { photographers } = await getPhotographers();
    displayData(photographers);
}

init();

