const lightBox = document.getElementById("lightbox");

function displayLightbox(){
    lightBox.classList.add("active");
}

function closeLightbox(){
    lightBox.classList.remove("active");
}

window.addEventListener("load", function() {
    // Votre code lightBox.js ici

    const cardPictures = document.querySelectorAll("img");
    console.log(cardPictures);

    let currentImageIndex = 0; // Indice de l'image actuellement affichée

    function showPicture() {
        cardPictures.forEach((picture, index) => {
            picture.addEventListener("click", () => {
                currentImageIndex = index; // Met à jour l'indice de l'image actuelle
                displayLightbox();
                displayImage(currentImageIndex);
            });
        });
    }

    function displayImage(index) {
        const displayedImage = `
            <div class="lightbox_content">
                <img src="${cardPictures[index].src}">
                <i class="fa-solid fa-xmark" onclick="closeLightbox()"></i>
            </div>`;
        while (lightBox.firstChild) {
            lightBox.removeChild(lightBox.firstChild);
        }
        lightBox.innerHTML = displayedImage;
    }
    
    lightBox.addEventListener("click", e => {
        if(e.target !== e.currentTarget) return
        closeLightbox();
    });
    
    // Ajouter un écouteur d'événements pour détecter l'appui sur la touche "Escape"
    document.addEventListener('keydown', e => {
        const keyCode = e.keyCode ? e.keyCode : e.which;
        
        if (keyCode === 27) {
            closeLightbox();
        }
    });
    
    // Ajouter un écouteur d'événements pour détecter l'appui sur les touches "avant" ou "après"
    document.addEventListener("keydown", e => {
        const key = e.key;
        
        if (key === "ArrowRight") { // Touche "avant"
            currentImageIndex = (currentImageIndex + 1) % cardPictures.length;
            displayImage(currentImageIndex);
        } else if (key === "ArrowLeft") { // Touche "arrière"
            currentImageIndex = (currentImageIndex - 1 + cardPictures.length) % cardPictures.length;
            displayImage(currentImageIndex);
        }
    });
    
    showPicture()
});