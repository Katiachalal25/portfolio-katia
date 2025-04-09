"use client"
import './header.css'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
// import { logout, setUser, setUsers } from '../stores/action_creators'
import { logout, setUser, setUsers } from '@/stores/action_creators'
function Header() {
    const token = useSelector(state => state.auth.token)
    const dispatch = useDispatch()
    const disconnect = () => {
        dispatch(logout())
        dispatch(setUsers([]))
        dispatch(setUser({}))
    }
    return (
        <header className='header'>
            <nav className='wrapper'>
                <ul>
                    {/* On utilise les balises <a></a> juste avant de voir le routage */}
                    <li><Link href="/">accueil</Link></li>
                    <li><Link href="/utilisateurs">utilisateurs</Link></li>
                    <li><Link href="/departements">departements</Link></li>
                    {!token ? <li><Link href="/login">login</Link></li>
                        : <li onClick={disconnect}><Link href="/logout">logout</Link></li>
                    }
                </ul>
            </nav>
        </header>
    )
}

export default Header