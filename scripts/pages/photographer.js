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



    //Ajout du nom dans la modal
    const modalHeader = document.querySelector(".modal header h2");
    modalHeader.innerHTML = `Contactez-moi <br>${photographer.name}`;
    
}

function generateMedia(photographers, media) {
    let createdMedia = [];

    // Création de la factory pour chaque media
    media.forEach(mediaUnit => {
        const factory = new photographerFactory(photographers, mediaUnit);
        const createdElement = factory.createMediaElement();
        if (createdElement) {
            createdMedia.push(createdElement);
        }
    });

   // Somme des likes pour les éléments créés
   let totalLikes = 0;
   createdMedia.forEach(function(unit) {
       const likes = unit.getAttribute('data-likes');
       if (likes) {
           totalLikes += parseInt(likes);
       }
   });

    //Création de l'onglet flottant avec le prix et le total de likes
    const photographerPrice = document.getElementById("dailyPrice");
    const divPrice = document.querySelector(".photographer_price");
    const photographerLikes = document.createElement("p")
    photographerLikes.innerHTML = `${totalLikes} <i class="fa-solid fa-heart"></i>`
    divPrice.appendChild(photographerLikes);
    divPrice.appendChild(photographerPrice);

    //Incrémentation des likes au clic
    const likeBtn = document.querySelector(".fa-heart")
    const likeNumber = document.querySelector(".photographer_media p")
    console.log(likeNumber);
    likeBtn.addEventListener("click", () => {
        console.log(media);
        likeNumber.innerHTML = `${this.media.likes++} <i class="fa-solid fa-heart"></i>`
    })

    console.log(createdMedia);
    console.log("Total Likes:", totalLikes);
}

async function init() {
    // Récupère les datas des photographes
    const { photographers, media } = await getPhotographers();
    displayData(photographers);

    generateMedia(photographers, media);  

    // filters(photographers, media);
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

// Tri des médias grâce aux filtres
function filters(photographers, media) {
    const filterPopularity = document.getElementById("filter_popularity");
    const filterDate = document.getElementById("filter_date");
    const filterTitle = document.getElementById("filter_title");

    function applyFilter(sortFunction) {
        media.sort(sortFunction);
        console.log(media);
        const photographersMedia = document.querySelector(".photographer_media");
        photographersMedia.innerHTML = "";
        generateMedia(photographers, media);
    }

    filterPopularity.addEventListener("click", function() {
        applyFilter(function(a, b) {
            return b.likes - a.likes;
        });
    });

    filterDate.addEventListener("click", function() {
        applyFilter(function(a, b) {
            return new Date(b.date) - new Date(a.date);
        });
    });

    filterTitle.addEventListener("click", function() {
        applyFilter(function(a, b) {
            if (a.title < b.title) {
                return -1;
            }
            if (a.title > b.title) {
                return 1;
            }
            return 0;
        });
    });
}
