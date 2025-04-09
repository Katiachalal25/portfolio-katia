import React, { useState } from 'react'
import { addDepartment } from '../services/departmentService'
import { useNavigate } from 'react-router-dom'
function AddDepartment() {
    //Variable pour stocker les inofrmations du formulaire
    const [department, setDepartment] = useState({
        nom: '',
        histoire: '',
        domaine: '',
        image: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setDepartment({ ...department, [name]: value })
    }

    //Redirection apres la creation d'un departement
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        
        addDepartment(department)
            .then(res => {
                // Succès de l'ajout, redirection
                navigate('/departments')
            })
            .catch(err => {
                // Erreur silencieuse lors de la création du département
            })
    }

    return (
        <main className='wrapper'>
            <h1>Creation d'un departement</h1>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="mb-3">
                    <label htmlFor="nom" className="form-label">Nom</label>
                    <input type="text" onChange={handleChange} value={department.nom} name='nom' className="form-control" id="nom" />
                </div>
                <div className="mb-3">
                    <label htmlFor="histoire" className="form-label">Histoire</label>
                    <textarea onChange={handleChange} name='histoire' value={department.histoire} className="form-control" id="histoire" ></textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="domaine" className="form-label">Domaine</label>
                    <select className="form-select" onChange={handleChange} value={department.domaine} name='domaine' id='domaine'>
                        <option>Choisir un domaine</option>
                        <option value="sciences">Sciences</option>
                        <option value="literature">Literature</option>
                        <option value="autre">Autre</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="image" className="form-label">Image</label>
                    <input type="file" onChange={handleChange} name='image' className="form-control" id="image" />
                </div>
                <button type="submit" className="btn btn-primary">Envoyer</button>
            </form>
        </main>
    )
}

export default AddDepartment