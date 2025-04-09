import React from 'react'

function Department({ department, supprimer }) {
    
    return (
        <div>
            <img src={department.image} alt={department.nom} crossOrigin='anonymous' width='200' height='200' />
            <div>
                {department.nom}
                <p>{department.description}</p>
            </div>
            <div>
                <button className='btn btn-success'>Update</button>
                <button onClick={() => supprimer(department.id)} className='btn btn-danger'>Delete</button>
                <button className='btn btn-secondary'>Details</button>
            </div>
        </div>
    )
}

export default Department