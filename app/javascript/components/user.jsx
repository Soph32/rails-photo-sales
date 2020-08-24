import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';

export default function User(props) {
    const [user, setUser] = useState();
    const [albums, setAlbums] = useState();

    // if page loaded through clicking links in other pages, this info will be passed to the component
    // otherwise fetch the relevant info from rails
    useEffect(() => {
        if(!props.location.state) {
            const path = window.location.pathname;
            const userId = path.split('/')[2];
            fetch("http://localhost:3000/users/request_user/" + userId)
                .then(response => response.json())
                .then(data => setUser(data));

            fetch("http://localhost:3000/albums/request_albums")
                .then(response => response.json())
                .then(data => setAlbums(data));
        } else {
            setUser(props.location.state.user);
            setAlbums(props.location.state.albums);
        }
    }, []);

    let website;
    if(user) {
        website = "http://" + user.website;
    }

    let userAlbums = [];
    if(albums && user) {
        albums.forEach(e => {
            if(e.userId === user.id) {
                userAlbums.push(
                    <AlbumLinks 
                        albumTitle={e.title}
                        albumId={e.id}
                        user={user}
                        photos={props.location.state ? props.location.state.photos : null}
                        key={e.id}
                    />
                ); 
            }
        });
    }

    if(user) {
        return (
            <div>
                <div>
                    <h1>{user.name}</h1>
                    <p>ID: {user.id}</p>
                    <p>Username: {user.username}</p>
                    <p>Email: {user.email}</p>
                    <p>Address:</p>
                        <p>Street: {user.address.street}</p>
                        <p>Suite: {user.address.suite}</p>
                        <p>City: {user.address.city}</p>
                        <p>Zipcode: {user.address.zipcode}</p>
                        <p>Geo:</p>
                            <p>Lat: {user.address.geo.lat}</p>
                            <p>Lng: {user.address.geo.lng}</p>
                    <p>Phone: {user.phone}</p>
                    <p>Website: <a href={website}>{user.website}</a></p>
                    <p>Company:</p>
                        <p>Name: {user.company.name}</p>
                        <p>Catch Phrase: {user.company.catchPhrase}</p>
                        <p>BS: {user.company.bs}</p>
                </div>
                <div>
                    {userAlbums}
                </div>
            </div>
        )
    } else {
        return null
    }
};

function AlbumLinks(props) {
    const [photos, setPhotos] = useState();

    useEffect(() => {
        if(!props.photos) {
            fetch("http://localhost:3000/albums/request_photos/" + props.albumId)
                .then(response => response.json())
                .then(data => setPhotos(data));
        } else {
            setPhotos(props.photos);
        }
    }, []);

    const link = "/albums/" + props.albumId;

    return (
        <div>
            <Link to={{
                pathname: link,
                state: {
                    albumId: props.albumId,
                    user: props.user,
                    photos: photos,
                    title: props.albumTitle
                }
                }}
            > 
                <div>{props.albumTitle}</div><br />
            </Link>
        </div>
    )
};