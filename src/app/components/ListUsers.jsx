import React, { useEffect, useState } from 'react'
// Importer le module axios pour la connexion avec le serveur (Backend)
import axios from 'axios'
import User from './User'
import './list.css'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setUsers } from '../stores/action_creators'
function ListUsers() {
    //Code javascript
    //Variable d'etat pour contenir la liste des utilisateurs
    const [users, setUsers] = useState([])
    const serverUrl = import.meta.env.VITE_SERVER_URL  //Variable d'environnement
    const dispatch = useDispatch()
    function getUsers() {
        axios.get(`${serverUrl}/users`)
            .then(res => {
                setUsers(res.data.data.users)
                dispatch(setUsers(res.data.data.users))
            })  // Les resultats attendus
            .catch() // En cas de probleme
    }

    useEffect(() => {
        getUsers()
    }, [serverUrl])  //La dependance vide [] signifie la lecture seulement a l'affiche du composant
    // getUsers()
    return (
        <main className='wrapper'>
            <h1>Liste des utilisateurs</h1>
            <div className='item-list'>
                {users.map(user => <User firstUser={user} key={user.id} />)}

            </div>
            <button className='btn btn-primary'><Link style={{ color: 'white' }} to='/ajout-utilisateur'>Ajouter</Link></button>
        </main>

    )
}

export default ListUsers