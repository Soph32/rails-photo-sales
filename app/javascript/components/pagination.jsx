import React from 'react';

export default function Pagination(props) {
    const pageNumbers = [];

    for(let i = 1; i <= Math.ceil(props.totalItems / props.itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    return ( 
        <nav className="pagination">
            {pageNumbers.map(n => (
                <button onClick={() => props.paginate(n)}>
                    {n}
                </button>
            ))}
        </nav>
    )
}