import React from 'react'
import style from './pagination.module.css'

function Pagination({postPerPage, totalPost, paginate}) {
    
    const pageNumbers = [];
    for(let i= 1; i <= Math.ceil(totalPost/postPerPage); i++){
        pageNumbers.push(i)
    }
    return (
        <nav>
            <ul className={[["justify-content-center"],["pagination"],style['pagination-style']].join(' ')}>
                {pageNumbers.map(number=>(
                    <li key={number} className="page-item">
                        <button onClick={()=>paginate(number)} className="page-link">{number}</button>
                    </li>
                ))}
            </ul>
            
        </nav>
    )
}

export default Pagination
