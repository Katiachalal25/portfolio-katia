import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Department from './Department'

function Profil() {
    const { id } = useParams()
    const [user, setUser] = useState({})
    const serverUrl = import.meta.env.VITE_SERVER_URL  //Variable d'environnement
    const getUser = () => {
        axios.get(`${serverUrl}/users/${id}`)
            .then(res => setUser(res.data.data))
            .catch(err => {
                // Erreur silencieuse lors de la lecture d'utilisateur
            })
    }
    useEffect(() => {
        getUser()
    }, [id])
    return (
        <main className='wrapper'>
            {user.photo ?
                <img src={user.photo} alt={`${user.prenom} ${user.nom}`} crossOrigin='anonymous' />
                : <h3>Celui n'a pas encore de photo !</h3>
            }

            <div>
                Nom:{user.nom}
            </div>
            <div>
                prenom:{user.prenom}
            </div>
            email:{user.email}
            <h3>Departement de {user.nom}</h3>
            <Department department={user.Department}/>
        </main>
    )
}

export default Profil