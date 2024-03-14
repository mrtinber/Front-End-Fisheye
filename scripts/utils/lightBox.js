/* eslint-disable linebreak-style */
const lightBox = document.getElementById("lightbox");

function displayLightbox() {
    lightBox.classList.add("active");
}

function closeLightbox() {
    lightBox.classList.remove("active");
}

export function generateLightBox(createdMedia) {

    const cardMedia = document.querySelectorAll(".photographer_media img, .photographer_media video");

    let currentImageIndex = 0; // Indice de l'image actuellement affichée

    function showPictureInLightbox() {
        createdMedia.forEach((picture, index) => {
            picture.addEventListener("click", () => {
                currentImageIndex = index; // Met à jour l'indice de l'image actuelle
                displayLightbox();
                displayImage(currentImageIndex);
            });

            picture.addEventListener("keydown", e => {
                const key = e.key;

                if (key === "Enter") {
                    currentImageIndex = index;
                    displayLightbox();
                    displayImage(currentImageIndex);
                }
            });
        });
    }

    function displayImage(index) {
        const mediaType = createdMedia[index].tagName.toLowerCase(); // Récupérer le type de média (img ou video)

        // Retirer ", cliquez pour agrandir" du texte de l'attribut alt ou title
        let textContent = "";

        if (createdMedia[index].tagName.toLowerCase() === "img") {
            textContent = createdMedia[index].alt;
        } else if (createdMedia[index].tagName.toLowerCase() === "video") {
            textContent = createdMedia[index].title;
        }

        const newTextContent = textContent.replace(", cliquez pour agrandir", "");

        if (createdMedia[index].tagName.toLowerCase() === "img") {
            createdMedia[index].alt = newTextContent;
        } else if (createdMedia[index].tagName.toLowerCase() === "video") {
            createdMedia[index].title = newTextContent;
        }

        const displayedImage = `
            <div class="lightbox_content" aria-label="image close-up view">
                <i class="fa-solid fa-chevron-left" aria-label="Image précédente" tabindex="0"></i>
                <div>
                    ${mediaType === "video" ? `<video src="${createdMedia[index].src}" controls></video>` : createdMedia[index].outerHTML}
                    <h3 tabindex="0">${createdMedia[index].textContent}</h3>
                </div>
                <i class="fa-solid fa-chevron-right" aria-label="Image suivante" tabindex="0"></i>
                <i class="fa-solid fa-xmark" aria-label="Fermer l'aperçu" tabindex="0"></i>
                </div>`;
        while (lightBox.firstChild) {
            lightBox.removeChild(lightBox.firstChild);
        }
        lightBox.innerHTML = displayedImage;

        // Définir le focus sur la balise img ou video
        const mediaElement = lightBox.querySelector(mediaType);
        if (mediaElement) {
            mediaElement.focus();
        }

        // Ajouter un écouteur d'événements pour détecter le clic sur "avant" ou "après"
        const leftArrow = document.querySelector(".fa-chevron-left");
        const rightArrow = document.querySelector(".fa-chevron-right");

        rightArrow.addEventListener("click", () => {
            currentImageIndex = (currentImageIndex + 1) % cardMedia.length;
            displayImage(currentImageIndex);
        });
        leftArrow.addEventListener("click", () => {
            currentImageIndex = (currentImageIndex - 1 + cardMedia.length) % cardMedia.length;
            displayImage(currentImageIndex);
        });

        const closeBtn = document.querySelector(".fa-xmark");
        closeBtn.addEventListener("click", () => {
            closeLightbox();
        });
    }

    lightBox.addEventListener("click", e => {
        if (e.target !== e.currentTarget) return;
        closeLightbox();
    });

    // Ajouter un écouteur d'événements pour détecter l'appui sur la touche "Escape"
    document.addEventListener("keydown", e => {
        const key = e.key;

        if (key === "Escape") {
            closeLightbox();
            createdMedia[0].focus();
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

    showPictureInLightbox();
}