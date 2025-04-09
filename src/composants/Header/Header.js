'use client';

import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { deconnexion } from '@/stores/auth/authReducteur';
import { useState } from 'react';

export default function Header() {
  const { estConnecte } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [menuOuvert, setMenuOuvert] = useState(false);

  return (
    <header className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
      <div className="container">
        <Link href="/" className="navbar-brand fw-bold text-primary">
          Portfolio de Katia
        </Link>
        
        <button 
          className="navbar-toggler" 
          type="button" 
          onClick={() => setMenuOuvert(!menuOuvert)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className={`collapse navbar-collapse ${menuOuvert ? 'show' : ''}`}>
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link href="/" className="nav-link">
                Accueil
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/projets" className="nav-link">
                Projets
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/avis" className="nav-link">
                Témoignages
              </Link>
            </li>
            
            {estConnecte ? (
              <li className="nav-item">
                <button 
                  className="nav-link btn btn-link"
                  onClick={() => dispatch(deconnexion())}
                >
                  Déconnexion
                </button>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <Link href="/connexion" className="nav-link">
                    Connexion
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/inscription" className="nav-link">
                    Inscription
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </header>
  );
} 