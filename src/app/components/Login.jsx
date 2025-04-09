import React, { useState } from 'react'
import { login } from '../services/loginService'
import { useDispatch } from 'react-redux'
import { logedInUser } from '../stores/action_creators'
import { useNavigate } from 'react-router-dom'
function Login() {
    const [loginInfo, setLogin] = useState({
        email: '',
        mot_de_passe: ''
    })
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const onChange = (event) => {
        const { id, name, value } = event.target
        setLogin(loginInfo => ({ ...loginInfo, [name]: value }))
    }

    const connecter = (e) => {
        e.preventDefault()
        login(loginInfo)
            .then(res => {
                dispatch(logedInUser(res))
                navigate('/')
            })
            .catch(err => {
                // Erreur silencieuse
            })
    }
    return (
        <main className='wrapper'>
            <h1>Se connecter</h1>
            <form onSubmit={connecter}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Adresse email</label>
                    <input onChange={onChange} name='email' value={loginInfo.email} type="email" className="form-control" id="email" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Mot de passe</label>
                    <input onChange={onChange} name='mot_de_passe' value={loginInfo.mot_de_passe} type="password" className="form-control" id="password" />
                </div>
                <button type="submit" className="btn btn-primary">Envoyer</button>
            </form>
        </main>
    )
}

export default Login