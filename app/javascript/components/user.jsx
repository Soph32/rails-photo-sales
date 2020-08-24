import React from 'react';
import { Link } from 'react-router-dom';

export default function User(props) {
    const user = props.location.state.user
    const website = "http://" + user.website;

    let userAlbums = [];
    props.location.state.albums.forEach(e => {
        if(e.userId === user.id) {
           userAlbums.push(
               <AlbumLinks 
                   albumTitle={e.title}
                   albumId={e.id}
                   user={user}
                   photos={props.location.state.photos}
                   key={e.id}
               />
           ); 
        }});

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
};

function AlbumLinks(props) {
    const link = "/albums/" + props.albumId;

    return (
        <div>
            <Link to={{
                pathname: link,
                state: {
                    albumId: props.albumId,
                    user: props.user,
                    photos: props.photos,
                    title: props.albumTitle
                }
                }}
            > 
                <div>{props.albumTitle}</div><br />
            </Link>
        </div>
    )
};