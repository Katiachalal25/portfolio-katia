"use client"
import { useState } from 'react'
import { login } from '@/services/loginService'
import { useDispatch } from 'react-redux'
import { logedInUser } from '@/stores/action_creators'
import { useRouter } from 'next/navigation'
import axios from 'axios'

function Login() {
    const [loginInfo, setLogin] = useState({
        email: '',
        mot_de_passe: ''
    })
    const dispatch = useDispatch()
    const router = useRouter()
    const onChange = (event) => {
        const { id, name, value } = event.target
        setLogin(loginInfo => ({ ...loginInfo, [name]: value }))
    }

    const connexion = (identifiants) => {
        axios.post(`${process.env.SERVER_URL}/auth/login`, identifiants)
            .then(res => {
                const { token, user } = res.data;
                localStorage.setItem("token", token);
                dispatch(logedInUser(user));
                router.push('/');
            })
            .catch(err => {
                // Erreur silencieuse
            })
    }

    const connecter = (e) => {
        e.preventDefault()
        connexion(loginInfo)
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