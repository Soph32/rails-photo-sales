import React from 'react';
import { Link } from 'react-router-dom';


export default function Album(props) {
    const albumId = props.location.state.albumId;
    const user = props.location.state.user;
    const photos = props.location.state.photos;
    const title = props.location.state.title;
    const website = "http://" + user.website;
    
    let photoList = [];
        photos.forEach(e => {            
            photoList.push(
                <Photos 
                    title={e.title} 
                    url={e.url} 
                    key={e.id}
                />
            )
        });
    
    let url2 = "/users/" + user.id;

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
}

function Photos(props) {
    return (
        <div>
            <p>{props.title}</p>
            <img src={props.url}></img>
        </div>
    )
}
