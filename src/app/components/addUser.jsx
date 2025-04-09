import React, { useEffect, useState } from 'react'
import { getAllDepartments } from '../services/departmentService'
import { addUser } from '../services/userService'
import { useNavigate } from 'react-router-dom'

function AddUser() {

    const [user, setUser] = useState({
        nom: '',
        prenom: '',
        biographie: '',
        naissance: '',
        email: '',
        mot_de_passe: '',
        conduite: '',
        photo: '',
        DepartmentId: ''
    })
    const [departments, setDepartments] = useState([])
    const onChange = event => {
        const { id, files, value, name } = event.target
        if (name === "photo")
            setUser(user => ({ ...user, photo: files[0] }))
        else
            setUser(user => ({ ...user, [name]: value }))
    }

    const getDepartements = () => {
        getAllDepartments()
            .then(res => setDepartments(res.departments))
            .catch(err => {
                // Erreur silencieuse
            })
    }

    useEffect(() => {
        getDepartements()
    }, [])

    const navigate = useNavigate()

    const send = (e) => {
        e.preventDefault()
        const userData = new FormData()
        for (let field in user) {
            userData.append(field, user[field])
        }
        // console.log("user data", userData)
        addUser(userData)
            .then(res => {
                // Succès de l'ajout, redirection
                navigate("/utilisateurs")
            })
            .catch(err => {
                // Erreur silencieuse
            })
    }
    return (
        <main className='wrapper'>
            <h1>Ajout d'un utilisateur</h1>
            <form onSubmit={send}>
                <div className="mb-3">
                    <label htmlFor="nom" className="form-label">Nom</label>
                    <input onChange={onChange} value={user.nom} type="text" name='nom' className="form-control" id="nom" />
                </div>
                <div className="mb-3">
                    <label htmlFor="prenom" className="form-label">Prenom</label>
                    <input onChange={onChange} value={user.prenom} name='prenom' type="text" className="form-control" id="prenom" />
                </div>
                <div className="mb-3">
                    <label htmlFor="biographie" className="form-label">Biographie</label>
                    <textarea onChange={onChange} value={user.biographie} name='biographie' className="form-control" id="biographie"></textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="naissance" className="form-label">Naissance</label>
                    <input onChange={onChange} value={user.naissance} name='naissance' type="date" className="form-control" id="naissance" />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Adresse email</label>
                    <input onChange={onChange} value={user.email} name='email' type="email" className="form-control" id="email" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Mot de passe</label>
                    <input onChange={onChange} value={user.mot_de_passe} name='mot_de_passe' type="password" className="form-control" id="password" />
                </div>
                <div className="mb-3">
                    <label htmlFor="conduite" className="form-label">Conduite</label>
                    <select className='form-select' name="conduite" id="conduite" onChange={onChange} value={user.conduite}>
                        <option value="Passable">Passable</option>
                        <option value="Bonne">Bonne</option>
                        <option value="Excellente">Excellente</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="department" className="form-label">Departement</label>
                    <select className='form-select' name="DepartmentId" id="department" value={user.DepartmentId} onChange={onChange}>
                        {departments.map(department => <option value={department.id} key={department.id}>{department.nom}</option>)}
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="photo" className="form-label">Photo</label>
                    <input onChange={onChange} name='photo' type="file" className="form-control" id="photo" />
                </div>
                <button type="submit" className="btn btn-primary">Envoyer</button>
            </form>
        </main>
    )
}

export default AddUser