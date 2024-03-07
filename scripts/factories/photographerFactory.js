class photographerFactory {
    constructor(data, media) {
        this.data = data;
        this.media = media;
        this.likes = 0;
        this.mediaObjects = []; // Variable pour stocker les objets media
    }

    createMediaElement() {
        const type = this.media.hasOwnProperty("image") ? "image" : "video";

        if (type === "image") {
            return this.displayPictures();
        } else if (type === "video") {
            return this.displayVideos();
        } else {
            throw 'Not a video or a picture';
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
            // img.setAttribute("onclick", "displayLightbox()")
            const mediaInfos = document.createElement("div");
            const mediaTitle = document.createElement("h3");
            mediaTitle.innerText = `${this.media.title}`;
            const mediaLikes = document.createElement("p");
            mediaLikes.innerHTML = `${this.media.likes} <i class="fa-solid fa-heart"></i>`;
            photographersMedia.appendChild(mediaCard);
            mediaCard.appendChild(img);
            mediaCard.appendChild(mediaInfos);
            mediaInfos.appendChild(mediaTitle);
            mediaInfos.appendChild(mediaLikes);
        
            // Stocker une référence aux données du média
            const mediaData = this.media;
            console.log(mediaData)

            //Incrémentation des likes au clic
            mediaLikes.addEventListener("click", function() {
                mediaData.likes++
                mediaLikes.innerHTML = `${mediaData.likes} <i class="fa-solid fa-heart"></i>`;
                img.setAttribute("data-likes", `${mediaData.likes}`);
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
            // video.setAttribute("controls", "");
            video.setAttribute("data-likes", `${this.media.likes}`)

            const mediaInfos = document.createElement("div");
            const mediaTitle = document.createElement("h3");
            mediaTitle.innerText = `${this.media.title}`;
            const mediaLikes = document.createElement("p");
            mediaLikes.innerHTML = `${this.media.likes} <i class="fa-solid fa-heart"></i>`;
            photographersMedia.appendChild(mediaCard);
            mediaCard.appendChild(video);
            mediaCard.appendChild(mediaInfos);
            mediaInfos.appendChild(mediaTitle);
            mediaInfos.appendChild(mediaLikes);
           
            return video;
        }
    }
}