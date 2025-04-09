"use client"
import { useEffect, useState } from 'react'
import Department from './Department'
import './list.css'
import Link from 'next/link'
import { deleteDepartment, getAllDepartments } from '@/services/departmentService'

function Home() {
    // const serverUrl = process.env.SERVER_URL

    const [departments, setDepartments] = useState([])
    const [sideEffect, setSideEffect] = useState(false)

    const getDepartments = () => {
        getAllDepartments()
            .then(res => setDepartments(res.departments))
            .catch(err => {
                // Erreur silencieuse lors de la lecture des départements
            })
    }

    useEffect(() => {
        getDepartments()
    }, [sideEffect])

    const deleteDepartment = (id) => {
        deleteDepartment(id)
            .then(res => {
                // Déclencher le rechargement des départements
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
            <button className='btn btn-primary'><Link href='/creation-departement'>Creer un departement</Link></button>
        </main>
    )
}

export default Home