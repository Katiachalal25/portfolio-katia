import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Department from './Department'
import './list.css'
import { Link } from 'react-router-dom'
import { deleteDepartment } from '../services/departmentService'

function ListDepartments() {
    const serverUrl = import.meta.env.VITE_SERVER_URL

    const [departments, setDepartments] = useState([])
    const [sideEffect, setSideEffect] = useState(false)

    const getAllDepartments = () => {
        return axios.get(`${serverUrl}/departments`)
    }

    useEffect(() => {
        getAllDepartments()
            .then(res => setDepartments(res.data.data.departments))
            .catch(err => {
                // Erreur silencieuse lors de la lecture des départements
            })
    }, [sideEffect])

    const deleteDepartment = (id) => {
        deleteDepartment(id)
            .then(res => {
                // Mise à jour de l'état pour déclencher un rechargement
                setSideEffect(prev => !prev)
            }).catch(err => {
                // Erreur silencieuse lors de la suppression
            })
    }

    return (
        <main className='wrapper'>
            <h1>Nos departements</h1>
            <div className='item-list'>
                {
                    departments.map(depart => <Department supprimer={deleteDepartment} department={depart} key={depart.id} />)
                }
            </div>
            <button className='btn btn-primary'><Link to='/creation-departement'>Creer un departement</Link></button>
        </main>
    )
}

export default ListDepartments