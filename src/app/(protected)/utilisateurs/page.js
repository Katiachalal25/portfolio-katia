"use client"
import { useEffect, useState } from 'react'
// Importer le module axios pour la connexion avec le serveur (Backend)
import User from '@/app/components/User'
import '@/app/components/list.css'
import Link from 'next/link'
import { useDispatch } from 'react-redux'
import { setUsers } from '@/stores/action_creators'
import { getAllUsers } from '@/services/userService'
import axios from 'axios'

function ListUsers() {
    //Code javascript
    //Variable d'etat pour contenir la liste des utilisateurs
    const [users, setUserss] = useState([])
   // const serverUrl = import.meta.env.VITE_SERVER_URL  //Variable d'environnement
    const dispatch = useDispatch()
    function getUsers() {
        getAllUsers()
            .then(res => {
                setUserss(res.users)  //1er data=structure de donnees depuis axios, 2eme data=provient du serveur
                dispatch(setUsers(res.users))
            })  // Les resultats attendus
            .catch() // En cas de probleme
    }

    useEffect(() => {
        // Récupérer la liste des utilisateurs
        axios.get(`${process.env.SERVER_URL}/utilisateurs`)
          .then(res => {
            setUserss(res.data)
          })
          .catch(err => {
            // Erreur silencieuse
          })
    }, [])
    // getUsers()
    return (
        <main className='wrapper'>
            <h1>Liste des utilisateurs</h1>
            <div className='item-list'>
                {users.map(user => <User firstUser={user} key={user.id} />)}

            </div>
            <button className='btn btn-primary'><Link style={{ color: 'white' }} href='/ajout-utilisateur'>Ajouter</Link></button>
        </main>

    )
}

export default ListUsers