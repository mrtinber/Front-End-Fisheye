/* eslint-disable linebreak-style */
/* eslint-disable no-undef */

import { updateTotalLikes } from "../pages/photographer.js";

export class PhotographerFactory {
    constructor(data, media) {
        this.data = data;
        this.media = media;
        this.likes = 0;
        this.mediaObjects = []; // Variable pour stocker les objets media
    }

    createMediaElement() {
        const type = Object.prototype.hasOwnProperty.call(this.media, "image") ? "image" : "video";

        if (type === "image") {
            return this.displayPictures();
        } else if (type === "video") {
            return this.displayVideos();
        } else {
            throw "Not a video or a picture";
        }
    }

    displayPictures() {
        // Récupération de l'ID dans l'URL
        let params = new URL(document.location).searchParams;
        let photographerID = params.get("id");

        const photographersMedia = document.querySelector(".photographer_media");

        // Recherche des médias avec l'ID du photographe correspondant
        const mediaId = this.media.photographerId === parseInt(photographerID);

        if (mediaId) { // Vérifie si des médias ont été trouvés
            const mediaCard = document.createElement("article");
            const img = document.createElement("img");
            img.setAttribute("src", `./assets/photographers/${this.media.photographerId}/${this.media.image}`);
            img.setAttribute("data-likes", `${this.media.likes}`);
            // img.setAttribute("aria-label", `Cliquez pour agrandir`);
            img.setAttribute("tabindex", "0");
            img.setAttribute("alt", `${this.media.alt}, cliquez pour agrandir`);
            // img.setAttribute("title", `${this.media.alt}`);

            //Création d'un span pour les lecteurs d'écrans seulement
            img.setAttribute("aria-describedby", "imageDescription");
            const imageDescription = document.createElement("span");
            imageDescription.classList.add("sr-only");
            imageDescription.innerText = "Cliquez pour agrandir";
            imageDescription.setAttribute("id", "imageDescription");
            mediaCard.appendChild(imageDescription);

            const mediaInfos = document.createElement("div");
            const mediaTitle = document.createElement("h2");
            mediaTitle.innerText = `${this.media.title}`;
            const mediaLikes = document.createElement("p");
            mediaLikes.innerHTML = `${this.media.likes} <i class="fa-solid fa-heart" aria-label="Bouton like, cliquez pour aimer" tabindex="0"></i>`;
            photographersMedia.appendChild(mediaCard);
            mediaCard.appendChild(img);
            mediaCard.appendChild(mediaInfos);
            mediaInfos.appendChild(mediaTitle);
            mediaInfos.appendChild(mediaLikes);

            // Stocker une référence aux données du média
            const mediaData = this.media;

            //Incrémentation des likes au clic
            mediaLikes.addEventListener("click", function () {
                if (mediaData.liked) {
                    mediaData.likes--; // Diminuer les likes si l'utilisateur a déjà aimé
                    mediaLikes.innerHTML = `${mediaData.likes} <i class="fa-solid fa-heart" aria-label="Bouton like, cliquez pour aimer" style="opacity: 0.5;" tabindex="0"></i>`;
                } else {
                    mediaData.likes++; // Augmenter les likes si l'utilisateur n'a pas encore aimé
                    mediaLikes.innerHTML = `${mediaData.likes} <i class="fa-solid fa-heart" aria-label="Bouton like, cliquez pour ne plus aimer" style="opacity: 1;" tabindex="0"></i>`;
                }
                mediaData.liked = !mediaData.liked; // Inverser l'état du like (true/false)
                console.log(mediaData.liked);
                
                img.setAttribute("data-likes", `${mediaData.likes}`);
                
                updateTotalLikes();
            });

            //Incrémentation des likes avec la touche Entrée
            mediaLikes.addEventListener("keydown", e => {
                const key = e.key;
                if (key === "Enter") {
                    if (mediaData.liked) {
                        mediaData.likes--; // Diminuer les likes si l'utilisateur a déjà aimé
                        mediaLikes.innerHTML = `${mediaData.likes} <i class="fa-solid fa-heart" aria-label="Bouton like, cliquez pour aimer" style="opacity: 0.5;" tabindex="0"></i>`;
                    } else {
                        mediaData.likes++; // Augmenter les likes si l'utilisateur n'a pas encore aimé
                        mediaLikes.innerHTML = `${mediaData.likes} <i class="fa-solid fa-heart" aria-label="Bouton like, cliquez pour ne plus aimer" style="opacity: 1;" tabindex="0"></i>`;
                    }
                    mediaData.liked = !mediaData.liked; // Inverser l'état du like (true/false)
                    console.log(mediaData.liked);

                    img.setAttribute("data-likes", `${mediaData.likes}`);

                    updateTotalLikes();
                }
            });

            return img;
        }
    }

    displayVideos() {
        // Récupération de l'ID dans l'URL
        let params = new URL(document.location).searchParams;
        let photographerID = params.get("id");

        const photographersMedia = document.querySelector(".photographer_media");

        // Recherche des médias avec l'ID du photographe correspondant
        const mediaId = this.media.photographerId === parseInt(photographerID);

        if (mediaId === true) { // Vérifie si des médias ont été trouvés
            const mediaCard = document.createElement("article");
            const video = document.createElement("video");
            video.setAttribute("src", `./assets/photographers/${this.media.photographerId}/${this.media.video}`);
            video.setAttribute("data-likes", `${this.media.likes}`);
            video.setAttribute("tabindex", "0");
            video.setAttribute("title", `${this.media.alt}, cliquez pour agrandir`);

            //Création d'un span pour les lecteurs d'écrans seulement
            video.setAttribute("aria-describedby", "imageDescription");
            const imageDescription = document.createElement("span");
            imageDescription.classList.add("sr-only");
            imageDescription.innerText = "Cliquez pour agrandir";
            imageDescription.setAttribute("id", "imageDescription");
            mediaCard.appendChild(imageDescription);

            const mediaInfos = document.createElement("div");
            const mediaTitle = document.createElement("h2");
            mediaTitle.innerText = `${this.media.title}`;
            const mediaLikes = document.createElement("p");
            mediaLikes.innerHTML = `${this.media.likes} <i class="fa-solid fa-heart" aria-label="Bouton like, cliquez pour liker" tabindex="0"></i>`;
            photographersMedia.appendChild(mediaCard);
            mediaCard.appendChild(video);
            mediaCard.appendChild(mediaInfos);
            mediaInfos.appendChild(mediaTitle);
            mediaInfos.appendChild(mediaLikes);

            // Stocker une référence aux données du média
            const mediaData = this.media;

            //Incrémentation des likes au clic
            mediaLikes.addEventListener("click", function () {
                if (mediaData.liked) {
                    mediaData.likes--; // Diminuer les likes si l'utilisateur a déjà aimé
                    mediaLikes.innerHTML = `${mediaData.likes} <i class="fa-solid fa-heart" aria-label="Bouton like, cliquez pour liker" style="opacity: 0.5;" tabindex="0"></i>`;
                } else {
                    mediaData.likes++; // Augmenter les likes si l'utilisateur n'a pas encore aimé
                    mediaLikes.innerHTML = `${mediaData.likes} <i class="fa-solid fa-heart" aria-label="Bouton like, cliquez pour liker" style="opacity: 1;" tabindex="0"></i>`;
                }
                mediaData.liked = !mediaData.liked; // Inverser l'état du like (true/false)
                console.log(mediaData.liked);

                video.setAttribute("data-likes", `${mediaData.likes}`);

                updateTotalLikes();
            });

            //Incrémentation des likes avec la touche Entrée
            mediaLikes.addEventListener("keydown", e => {
                const key = e.key;
                if (key === "Enter") {
                    if (mediaData.liked) {
                        mediaData.likes--; // Diminuer les likes si l'utilisateur a déjà aimé
                        mediaLikes.innerHTML = `${mediaData.likes} <i class="fa-solid fa-heart" aria-label="Bouton like, cliquez pour liker" style="opacity: 0.5;" tabindex="0"></i>`;

                    } else {
                        mediaData.likes++; // Augmenter les likes si l'utilisateur n'a pas encore aimé
                        mediaLikes.innerHTML = `${mediaData.likes} <i class="fa-solid fa-heart" aria-label="Bouton like, cliquez pour liker" style="opacity: 1;" tabindex="0"></i>`;

                    }
                    mediaData.liked = !mediaData.liked; // Inverser l'état du like (true/false)
                    console.log(mediaData.liked);

                    video.setAttribute("data-likes", `${mediaData.likes}`);

                    updateTotalLikes();
                }
            });

            return video;
        }
    }
}