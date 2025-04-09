'use client';

import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { deconnexion } from '@/stores/auth/authReducteur';
import { useState, useEffect, useRef } from 'react';

export default function Entete() {
  const { utilisateur, estConnecte } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [menuOuvert, setMenuOuvert] = useState(false);
  const [menuUtilisateurOuvert, setMenuUtilisateurOuvert] = useState(false);
  const menuUtilisateurRef = useRef(null);

  // Debug - Afficher l'état d'authentification dans la console
  useEffect(() => {
    console.log('État de connexion:', estConnecte);
    console.log('Utilisateur:', utilisateur);
  }, [estConnecte, utilisateur]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuUtilisateurRef.current && !menuUtilisateurRef.current.contains(event.target)) {
        setMenuUtilisateurOuvert(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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
            {/* Navigation principale - toujours visible */}
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
            
            {/* Authentification */}
            {estConnecte ? (
              <li className="nav-item dropdown" ref={menuUtilisateurRef}>
                <button 
                  className={`nav-link dropdown-toggle d-flex align-items-center ${menuUtilisateurOuvert ? 'show' : ''}`}
                  id="navbarDropdownMenuLink" 
                  onClick={(e) => {
                    e.preventDefault();
                    setMenuUtilisateurOuvert(!menuUtilisateurOuvert);
                  }}
                  aria-expanded={menuUtilisateurOuvert}
                  style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  <i className="bi bi-person-circle me-1"></i>
                  <span>{utilisateur?.email || 'Utilisateur'}</span>
                </button>
                <ul 
                  className={`dropdown-menu dropdown-menu-end ${menuUtilisateurOuvert ? 'show' : ''}`} 
                  aria-labelledby="navbarDropdownMenuLink"
                  style={{ display: menuUtilisateurOuvert ? 'block' : 'none' }}
                >
                  <li>
                    <button 
                      className="dropdown-item"
                      onClick={() => {
                        dispatch(deconnexion());
                        setMenuUtilisateurOuvert(false);
                      }}
                    >
                      <i className="bi bi-box-arrow-right me-2"></i>
                      Déconnexion
                    </button>
                  </li>
                </ul>
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