import React from 'react'
//Importer la liste des utilisateurs
// import users from '../data'
import { useState } from 'react'

// const firstUser = users[0]

function User(props) {
    const [commentaire, setCommentaire] = useState("")
    const [border, setBorder] = useState("")
    const rouge = "2px solid red"
    const green = "2px solid green"
    const jaune = "2px solid yellow"
    // setInterval(changerCommentaire, 1000)
    // setTimeout(changerCommentaire, 3000)
    const { firstUser } = props
    // console.log("commentaire", commentaire)
    // Lier le mouvement de la souris a l'etat
    function changerCommentaire() {
        // setCommentaire(commentaire === firstUser.prenom ? "" : firstUser.prenom)
        // setBorder(border === rouge ? green : (border === green ? jaune : rouge))
    }

    const handleChange = (e) => {
        const { value } = e.target
        
        // Mise à jour du commentaire
        setCommentaire(value)
    }

    return (
        <div style={{ border: border }}>
            {firstUser.photo?
               <img onMouseEnter={changerCommentaire} src={firstUser.photo} alt={`${firstUser.prenom} ${firstUser.nom}`} crossOrigin='anonymous' width='200' height='200' /> 
            :<h3>Celui n'a pas encore de photo !</h3>
            }
            
            <div>
                Nom:{firstUser.nom}
            </div>
            <div>
                prenom:{firstUser.prenom}
            </div>
            email:{firstUser.email}
            <div>
                <button className='btn btn-success'>Modifier</button>
                <button className='btn btn-danger'>Supprimer</button>
                <button className='btn btn-primary'>Profil</button>
            </div>
        </div>
        
    )
}

export default User