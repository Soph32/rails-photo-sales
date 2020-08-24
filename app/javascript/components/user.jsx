import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import GoogleMapReact from 'google-map-react';

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
            <div className="userPage">
                <div>
                    <h1 className="mainTitle">{user.name}</h1>
                    <div className="idUser">
                        <div className="id">
                            ID: {user.id}
                        </div>
                        <div className="username">
                            Username: {user.username}
                        </div>
                    </div>
                    <div className="userDetails">
                        <div className="contactDetails">
                            <br/><span className="heading">Contact details:</span><br/>
                            Email: {user.email}<br/>
                            Phone: {user.phone}<br />
                            Website: <a href={website}>{user.website}</a>
                        </div>
                        <div className="company">
                            <span className="heading">Company:</span><br/>
                            Name: {user.company.name}<br/>
                            Catch Phrase: {user.company.catchPhrase}<br/>
                            BS: {user.company.bs}
                        </div>
                    </div>
                    <div className="address">
                        <span className="heading">Address:</span><br/>
                        Street: {user.address.street}<br/>
                        Suite: {user.address.suite}<br/>
                        City: {user.address.city}<br/>
                        Zipcode: {user.address.zipcode}<br/>
                        Lat: {user.address.geo.lat}<br/>
                        Lng: {user.address.geo.lng}
                    </div>
                    <Map lat={user.address.geo.lat} lng={user.address.geo.lng}/>
                </div>
                <div className="albums">
                    <h2>Albums</h2>
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
                <div className="album">{props.albumTitle}</div><br />
            </Link>
        </div>
    )
};

function MapLabel(props) {
    return (
        <div className="label">{props.text}</div>
    )
};

function Map(props) {
    const [center] = useState({lat: parseFloat(props.lat), lng: parseFloat(props.lng)});
    const [zoom] = useState(11);

    console.log(center);
    return (
        <div className="map">
            <GoogleMapReact
                defaultCenter={center}
                defaultZoom={zoom}
            >
                <MapLabel
                    lat={parseFloat(props.lat)}
                    lng={parseFloat(props.lng)}
                    text=""
                />
            </GoogleMapReact>
        </div>
    )
};