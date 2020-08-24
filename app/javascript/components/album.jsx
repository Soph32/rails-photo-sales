import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';

export default function Album(props) {
    const [album, setAlbum] = useState();
    const [photos, setPhotos] = useState();
    const [user, setUser] = useState();

    let albumId;
    let title;

    // if page loaded through clicking links in other pages, this info will be passed to the component
    // otherwise grab the album ID from the URL and fetch the data through rails - see useEffect 
    if(props.location.state) {
        albumId = props.location.state.albumId;
        title = props.location.state.title; 
    } else {
        const path = window.location.pathname;
        albumId = path.split('/')[2];
        if (album) {
            title = album.title;
        }
    }

    useEffect(() => {
        if(!props.location.state && albumId) {
            fetch("http://localhost:3000/albums/request_album/" + albumId)
                .then(response => response.json())
                .then(data => setAlbum(data));

            fetch("http://localhost:3000/albums/request_photos/" + albumId)
                .then(response => response.json())
                .then(data => setPhotos(data));
        } else {
            setPhotos(props.location.state.photos);
            setUser(props.location.state.user);
        }
    }, []);

    useEffect(() => {
        if(album) {
            const userId = album.userId;
            fetch("http://localhost:3000/users/request_user/" + userId)
                .then(response => response.json())
                .then(data => setUser(data));
        }
    }, [album]);

    let website;
    let url2;
    if(user) {
        website = "http://" + user.website;
        url2 = "/users/" + user.id;
    }

    let photoList = [];
    if(photos) {
        photos.forEach(e => {            
            photoList.push(
                <Photos 
                    title={e.title} 
                    url={e.url} 
                    key={e.id}
                />
            )
        });
    }
    
    if(user) {
        return (
            <div>
                <h1>Album {albumId} - {title}</h1>
                <Link to={{
                    pathname: url2,
                    state: {
                        user: user,
                        albums: props.albums
                    }
                    }}
                >   
                    <h3>By {user.name}</h3>
                </Link>
                <p>Email: {user.email}</p>
                <p>Phone: {user.phone}</p>
                <p>Website: <a href={website}>{user.website}</a></p>

                <div>
                    {photoList}
                </div>
            </div>
        )
    } else {
        return null
    }
}

function Photos(props) {
    return (
        <div>
            <p>{props.title}</p>
            <img src={props.url}></img>
        </div>
    )
}
