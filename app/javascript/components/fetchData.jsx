export function fetchAlbums() {
    fetch("http://localhost:3000/albums/request_albums")
        .then(response => response.json())
};

export function fetchAlbum(id) {
    return fetch("http://localhost:3000/albums/request_album/" + id)
        .then(response => response.json())
        //.then(data => console.log(data));
};

export function fetchPhotos(id) {
    return fetch("http://localhost:3000/albums/request_photos/" + id)
        .then(response => response.json())
        //.then(data => console.log(data));
};

export function fetchUser(id) {
    return fetch("http://localhost:3000/users/request_user/" + id)
        .then(response => response.json())
        //.then(data => console.log(data));
};