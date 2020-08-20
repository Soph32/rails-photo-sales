import React, {useEffect, useState} from 'react';

export default function Albums() {
    return (
        <div>
            <h1> Photography Album Selling Company </h1>
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
                />
            )
        });
    };

    return (
        <div>
            <table>
                <tbody>
                    <tr>
                        <th>Title</th>
                        <th>Owner</th>
                        <th>Thumbnail</th>
                    </tr>
                    {rows}
                </tbody>
            </table>
        </div>
    )
};

function AlbumsRow(props) {
    const [photos, setPhotos] = useState();

    useEffect(() => {
        fetch("http://localhost:3000/albums/request_photos/" + props.id)
            .then(response => response.json())
            .then(data => setPhotos(data));
    }, []);

    if (photos) {
        return (
            <tr>
                <td><img src={photos[0].thumbnailUrl}></img></td>
                <td>{props.title}</td>
                <td>{props.owner}</td>
            </tr>
        ) 
    } else {
        return null
    }
};
