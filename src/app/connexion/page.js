'use client';

import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { connexion, effacerErreur } from '@/stores/auth/authReducteur';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Connexion() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { estConnecte, erreur } = useSelector((state) => state.auth);
  const [envoiEnCours, setEnvoiEnCours] = useState(false);
  const [messageErreur, setMessageErreur] = useState('');
  const formRef = useRef(null);
  
  const [formData, setFormData] = useState({
    email: '',
    motDePasse: ''
  });
  
  const [erreurs, setErreurs] = useState({
    email: '',
    motDePasse: ''
  });

  // Lorsque l'erreur Redux change, mettre à jour notre état local
  useEffect(() => {
    if (erreur) {
      setMessageErreur(erreur);
      setEnvoiEnCours(false);
    }
  }, [erreur]);
  
  const validerFormulaire = () => {
    const nouvellesErreurs = {
      email: '',
      motDePasse: ''
    };
    
    let estValide = true;
    
    // Validation de l'email
    if (!formData.email) {
      nouvellesErreurs.email = 'L\'email est requis';
      estValide = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      nouvellesErreurs.email = 'Format d\'email invalide';
      estValide = false;
    }
    
    // Validation du mot de passe
    if (!formData.motDePasse) {
      nouvellesErreurs.motDePasse = 'Le mot de passe est requis';
      estValide = false;
    }
    
    setErreurs(nouvellesErreurs);
    return estValide;
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Réinitialiser les erreurs quand l'utilisateur commence à taper
    setMessageErreur('');
    dispatch(effacerErreur());
    
    setFormData({ ...formData, [name]: value });
    
    // Effacer l'erreur du champ modifié
    if (erreurs[name]) {
      setErreurs({ ...erreurs, [name]: '' });
    }
  };
  
  const handleSubmit = (e) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    
    console.log("Soumission du formulaire!", formData);
    
    if (validerFormulaire()) {
      setEnvoiEnCours(true);
      // Réinitialiser le message d'erreur précédent
      setMessageErreur('');
      dispatch(connexion(formData));
    }
  };
  
  useEffect(() => {
    if (estConnecte && !erreur) {
      router.push('/');
    }
    
    return () => {
      dispatch(effacerErreur());
    };
  }, [estConnecte, erreur, router, dispatch]);
  
  // Pour le débogage
  useEffect(() => {
    console.log('État de la connexion:', { estConnecte, erreur, messageLocal: messageErreur });
  }, [estConnecte, erreur, messageErreur]);
  
  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card border-0 shadow-sm">
            <div className="card-body p-4 p-md-5">
              <h1 className="text-center mb-4 text-primary fw-bold">Connexion</h1>
              
              {messageErreur && (
                <div className="alert alert-danger d-flex align-items-center mb-4" role="alert">
                  <i className="bi bi-exclamation-triangle-fill fs-4 me-2"></i>
                  <div>
                    <strong>Erreur de connexion :</strong> {messageErreur}
                  </div>
                </div>
              )}
              
              <form ref={formRef} onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="email"
                    className={`form-control ${erreurs.email || messageErreur ? 'is-invalid' : ''}`}
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="votre@email.com"
                  />
                  {erreurs.email && (
                    <div className="invalid-feedback">
                      {erreurs.email}
                    </div>
                  )}
                </div>
                
                <div className="mb-4">
                  <label htmlFor="motDePasse" className="form-label">Mot de passe</label>
                  <input
                    type="password"
                    className={`form-control ${erreurs.motDePasse || messageErreur ? 'is-invalid' : ''}`}
                    id="motDePasse"
                    name="motDePasse"
                    value={formData.motDePasse}
                    onChange={handleChange}
                    placeholder="Votre mot de passe"
                  />
                  {erreurs.motDePasse && (
                    <div className="invalid-feedback">
                      {erreurs.motDePasse}
                    </div>
                  )}
                  {messageErreur && !erreurs.motDePasse && (
                    <div className="invalid-feedback">
                      {messageErreur === "Le mot de passe est incorrect" 
                        ? "Mot de passe incorrect" 
                        : "Les identifiants sont incorrects"}
                    </div>
                  )}
                </div>
                
                <div className="d-grid">
                  <button 
                    type="submit" 
                    className="btn btn-primary btn-lg" 
                    disabled={envoiEnCours}
                    onClick={handleSubmit}
                  >
                    {envoiEnCours ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Connexion en cours...
                      </>
                    ) : 'Se connecter'}
                  </button>
                </div>
                
                <div className="text-center mt-4">
                  <p>
                    Pas encore de compte ? {' '}
                    <Link href="/inscription" className="text-primary">
                      S'inscrire
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 