class photographerFactory {
    constructor (data, type) {
        if (image) {
            return new displayPictures(media)
        } else if (video) {
            return new displayVideos(media)
        } else {
            throw 'Not a video or a picture'
        }
    }
}