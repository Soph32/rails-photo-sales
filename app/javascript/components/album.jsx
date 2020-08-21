import React, {useEffect, useState} from 'react';

export default function Album(props) {
    // const [album, setAlbum] = useState();
    // const [user, setUser] = useState();
    // const [photos, setPhotos] = useState();

    // let albumId;
    // let user;
    // let photos;

    // if page accessed by clicking link in table, grab photos and user props
    // else grab album id from URL
    // if (props.location.state) {
        const albumId = props.location.state.albumId;
        const user = props.location.state.user;
        const photos = props.location.state.photos;
        const title = props.location.state.title;
        const website = "http://" + user.website;
    // } else {
    //     albumId = props.location.pathname.split(/\//)[2];
    // }

    // if page loaded directly via url, grab the album to get the user id
    // then grab the user details
    // and the photos
    // useEffect(() => {
    //     if(albumId) {
    //         fetch("http://localhost:3000/albums/request_album/" + albumId)
    //             .then(response => response.json())
    //             .then(data => setAlbum(data));

    //         fetch("http://localhost:3000/albums/request_photos/" + albumId)
    //             .then(response => response.json())
    //             .then(data => setPhotos(data));
    //     }
    // }, [])

    // useEffect(() => {
    //     if(album) {
    //         fetch("http://localhost:3000/users/request_user/" + album.userId)
    //             .then(response => response.json())
    //             .then(data => setUser(data));
    //     }
    // }, [album])

    let photoList = [];
    //if(photos) {
        photos.forEach(e => {            
            photoList.push(
                <Photos 
                    title={e.title} 
                    url={e.url} 
                    key={e.id}
                />
            )
        });
   // };
    
    return (
        <div>
            <h1>Album {albumId} - {title}</h1>
            <h3>By {user.name}</h3>
            <p>Email: {user.email}</p>
            <p>Phone: {user.phone}</p>
            <p>Website: <a href={website}>{user.website}</a></p>

            <div>
                {photoList}
            </div>
        </div>
    )
}

function Photos(props) {
    return (
        <div>
            <p>{props.title}</p>
            <img src={props.url}></img>
        </div>
    )
}
