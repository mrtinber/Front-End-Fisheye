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

    //Création de l'onglet flottant avec le prix et le total de likes
    const photographerPrice = document.getElementById("dailyPrice");
    const divPrice = document.querySelector(".photographer_price");
    const totalLikes = document.createElement("p")
    totalLikes.innerHTML = `XX <i class="fa-solid fa-heart"></i>`
    divPrice.appendChild(totalLikes);
    divPrice.appendChild(photographerPrice);

    //Ajout du nom dans la modal
    const modalHeader = document.querySelector(".modal header h2");
    modalHeader.innerHTML = `Contactez-moi <br>${photographer.name}`;
    
}

function generateMedia(photographers, media){
    // Création de la factory pour chaque media
    const mediaElements = media.map(mediaUnit => {
        const factory = new photographerFactory(photographers, mediaUnit);
        return factory.createMediaElement();
    });

    console.log(mediaElements);

}

async function init() {
    // Récupère les datas des photographes
    const { photographers, media } = await getPhotographers();
    displayData(photographers);

    generateMedia(photographers, media);

    // Tri des médias grâce aux filtres
    const filterPopularity = document.getElementById("filter_popularity")
    filterPopularity.addEventListener("click", function(){
        media.sort(function(a,b){
            return b.likes - a.likes;
        })
        console.log(media);
        const photographersMedia = document.querySelector(".photographer_media");
        photographersMedia.innerHTML="";
        generateMedia(photographers, media);
    })
    const filterDate = document.getElementById("filter_date")
    filterDate.addEventListener("click", function(){
        media.sort(function(a,b){
            return new Date(b.date) - new Date(a.date);
        })
        console.log(media);
        const photographersMedia = document.querySelector(".photographer_media");
        photographersMedia.innerHTML="";
        generateMedia(photographers, media);
    })
    const filterTitle = document.getElementById("filter_title")
    filterTitle.addEventListener("click", function(){
        media.sort(function (a, b) {
            if (a.title < b.title) {
              return -1;
            }
            if (a.title > b.title) {
              return 1;
            }
            return 0;
          });
        console.log(media);
        const photographersMedia = document.querySelector(".photographer_media");
        photographersMedia.innerHTML="";
        generateMedia(photographers, media);
    })
}

init();

///////////////Filtres///////////////
const filterSelect = document.getElementById("filter_select");
const filterText = document.getElementById("filter_text");
const filterArrow = document.querySelector(".filterbar i");
const filterOptions = document.getElementById("filter_options");
const filterChoice = document.querySelectorAll(".filter_choice");

filterSelect.addEventListener("click", () => {
    if (filterOptions.classList.contains("show")){
        filterArrow.style.rotate = "0deg";
    } else {
        filterArrow.style.rotate = "-180deg";
    }
    filterOptions.classList.toggle("show");
})

window.onclick = function (e) {
    if (
        e.target.id !== "filter_select"
    ){
        filterOptions.classList.remove("show");
        filterArrow.style.rotate = "0deg";
    }
}

filterChoice.forEach(choice => {
    choice.addEventListener("click", () => {
        filterText.innerText = choice.innerText;
    });
});

