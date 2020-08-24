import React, {useEffect, useState} from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Album from './album';
import User from './user';

export default function App() {
    return(
        <div>
            <Router>
                <Switch>
                    <Route path="/albums/" component={Album} />
                    <Route path="/users/" component={User} />
                    <Route path="/" component={Albums} />
                </Switch>
            </Router>
        </div>
    )
}

function Albums() {
    return (
        <div>
            <h1 className="mainTitle"> Photography Album Selling Company </h1>
            <AlbumsTable />
        </div>
    )
}

function AlbumsTable() {
    const [albums, setAlbums] = useState();

    useEffect(() => {
        // get albums data on component load/change
        fetch("http://localhost:3000/albums/request_albums")
            .then(response => response.json())
            .then(data => setAlbums(data));
    }, []);

    // for each album object generate a table row with the relevant data
    let rows = [];
    if(albums) {
        albums.forEach(element => {            
            rows.push(
                <AlbumsRow 
                    title={element.title} 
                    owner={element.userId} 
                    id={element.id} 
                    key={element.id}
                    albums={albums}
                />
            )
        });
    };

    return (
        <div>
            <table>
                <tbody>
                    <tr>
                        <th>Thumbnail</th>
                        <th>Title</th>
                        <th>Owner</th>
                    </tr>
                    {rows}
                </tbody>
            </table>
        </div>
    )
};

function AlbumsRow(props) {
    const [photos, setPhotos] = useState();
    const [user, setUser] = useState();
    
    // grab the photos in the album for the thumbnail
    // and the user for the name
    useEffect(() => {
        fetch("http://localhost:3000/albums/request_photos/" + props.id)
            .then(response => response.json())
            .then(data => setPhotos(data));

        fetch("http://localhost:3000/users/request_user/" + props.owner)
            .then(response => response.json())
            .then(data => setUser(data));
    }, []);

    let url = "/albums/" + props.id;
    let url2 = "/users/" + props.owner;
    if (photos && user) {
        return (
                <tr>
                    <td><img src={photos[0].thumbnailUrl} className="thumbnails"></img></td>
                    <td>
                        <Link to={{
                            pathname: url,
                            state: {
                                albumId: props.id,
                                title: props.title,
                                photos: photos,
                                user: user,
                                albums: props.albums
                            }
                            }}
                        >
                        {props.title}
                        </Link>
                    </td>
                    <td>
                        <Link to={{
                            pathname: url2,
                            state: {
                                user: user,
                                albums: props.albums,
                                photos: photos
                            }
                            }}
                        >
                        {user.name}
                        </Link>
                    </td>
                </tr>
            
        ) 
    } else {
        return null
    }
};
