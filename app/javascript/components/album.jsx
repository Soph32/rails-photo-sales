import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import Pagination from './pagination';

export default function Album(props) {
    const [album, setAlbum] = useState();
    const [albums, setAlbums] = useState();
    const [photos, setPhotos] = useState();
    const [user, setUser] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);

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

        if(albumId) {
            fetch("http://localhost:3000/albums/request_albums")
                .then(response => response.json())
                .then(data => setAlbums(data));
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

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    let photoList = [];
    if(photos) {
        const currentItems = photos.slice(indexOfFirstItem, indexOfLastItem);
        currentItems.forEach(e => {            
            photoList.push(
                <Photos 
                    title={e.title} 
                    url={e.url} 
                    key={e.id}
                />
            )
        });
    }

    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    
    if(user) {
        return (
            <div>
                <div className="albumTitle">
                    <h1>Album {albumId}</h1>
                    <h1>{title}</h1>
                    <Link to={{
                        pathname: url2,
                        state: {
                            user: user,
                            albums: albums,
                            photos: photos
                        }
                        }}
                    >   
                        <h3 className="user">By {user.name}</h3>
                    </Link>
                </div>
                <div className="contact">
                    <p>Email: {user.email}</p>
                    <p>Phone: {user.phone}</p>
                    <p>Website: <a href={website}>{user.website}</a></p>
                </div>
                <div className="photosList">
                    {photoList}
                </div>
                <Pagination paginate={paginate} totalItems={photos.length} itemsPerPage={itemsPerPage}/>
            </div>
        )
    } else {
        return null
    }
}

function Photos(props) {
    return (
        <div>
            <p className="photoTitles">{props.title}</p>
            <img className="photosFull" src={props.url}></img>
        </div>
    )
}
