function fetchAlbums() {
    return fetch("http://localhost:3000/albums/request_albums")
        .then(response => response.json())
}

function fetchAlbum(id) {
    return fetch("http://localhost:3000/albums/request_album/" + id)
        .then(response => response.json())
}

function fetchPhotos(id) {
    return fetch("http://localhost:3000/albums/request_photos/" + id)
        .then(response => response.json())
}

function fetchUser(id) {
    return fetch("http://localhost:3000/users/request_user/" + id)
        .then(response => response.json())
}

document.addEventListener('DOMContentLoaded', () => {
    fetchAlbums().then(data => console.log(data));
    fetchAlbum(1).then(data => console.log(data));
    fetchPhotos(1).then(data => console.log(data));
    fetchUser(1).then(data => console.log(data));
})