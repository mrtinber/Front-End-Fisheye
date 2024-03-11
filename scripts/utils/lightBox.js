const lightBox = document.getElementById("lightbox");

function displayLightbox(){
    lightBox.classList.add("active");
}

function closeLightbox(){
    lightBox.classList.remove("active");
}

export function generateLightBox(createdMedia){ 

    const cardTitles = document.querySelectorAll(".photographer_media h3");
    const cardMedia = document.querySelectorAll(".photographer_media img, .photographer_media video");
    
    console.log(cardMedia);
    console.log(cardTitles);

    let currentImageIndex = 0; // Indice de l'image actuellement affichée

    function showPictureInLightbox() {
        createdMedia.forEach((picture, index) => {
            picture.addEventListener("click", () => {
                currentImageIndex = index; // Met à jour l'indice de l'image actuelle
                displayLightbox();
                displayImage(currentImageIndex);
            });
            
            picture.addEventListener("keydown", e => {
                const key = e.key

                if(key === "Enter"){
                currentImageIndex = index;
                displayLightbox();
                displayImage(currentImageIndex);
                }
            });
        });
    }

    function displayImage(index) {
        const mediaType = createdMedia[index].tagName.toLowerCase(); // Récupérer le type de média (img ou video)

        const displayedImage = `
            <div class="lightbox_content" aria-label="image close-up view">
                <i class="fa-solid fa-chevron-left" aria-label="previous image"></i>
                <div>
                    ${mediaType === "video" ? `<video src="${createdMedia[index].src}" controls></video>` : createdMedia[index].outerHTML}
                    <h3>${createdMedia[index].textContent}</h3>
                </div>
                <i class="fa-solid fa-chevron-right" aria-label="next image"></i>
                <i class="fa-solid fa-xmark" aria-label="close dialog"></i>
                </div>`;
        while (lightBox.firstChild) {
            lightBox.removeChild(lightBox.firstChild);
        }
        lightBox.innerHTML = displayedImage;
        
        // Ajouter un écouteur d'événements pour détecter le clic sur "avant" ou "après"
        const leftArrow = document.querySelector(".fa-chevron-left")
        const rightArrow = document.querySelector(".fa-chevron-right")
        
        rightArrow.addEventListener("click", () => {
            currentImageIndex = (currentImageIndex + 1) % cardMedia.length;
            displayImage(currentImageIndex)
        });
        leftArrow.addEventListener("click", ()=> {
            currentImageIndex = (currentImageIndex - 1 + cardMedia.length) % cardMedia.length;
            displayImage(currentImageIndex);
        });

        const closeBtn = document.querySelector(".fa-xmark");
        closeBtn.addEventListener("click", () => {
            closeLightbox();
        })
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
            currentImageIndex = (currentImageIndex + 1) % cardMedia.length;
            displayImage(currentImageIndex);
        } else if (key === "ArrowLeft") { // Touche "arrière"
            currentImageIndex = (currentImageIndex - 1 + cardMedia.length) % cardMedia.length;
            displayImage(currentImageIndex);
        }
    });

    showPictureInLightbox()
};