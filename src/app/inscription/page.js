'use client';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { inscription, effacerErreur } from '@/stores/auth/authReducteur';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Inscription() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { erreur } = useSelector((state) => state.auth);
  
  const [formData, setFormData] = useState({
    prenom: '',
    nom: '',
    email: '',
    motDePasse: '',
    confirmationMotDePasse: ''
  });
  
  const [erreurs, setErreurs] = useState({
    prenom: '',
    nom: '',
    email: '',
    motDePasse: '',
    confirmationMotDePasse: ''
  });
  
  const validerFormulaire = () => {
    const nouvellesErreurs = {
      prenom: '',
      nom: '',
      email: '',
      motDePasse: '',
      confirmationMotDePasse: ''
    };
    
    let estValide = true;
    
    // Validation du prénom
    if (!formData.prenom.trim()) {
      nouvellesErreurs.prenom = 'Le prénom est requis';
      estValide = false;
    }
    
    // Validation du nom
    if (!formData.nom.trim()) {
      nouvellesErreurs.nom = 'Le nom est requis';
      estValide = false;
    }
    
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
    } else if (formData.motDePasse.length < 6) {
      nouvellesErreurs.motDePasse = 'Le mot de passe doit contenir au moins 6 caractères';
      estValide = false;
    }
    
    // Validation de la confirmation du mot de passe
    if (formData.motDePasse !== formData.confirmationMotDePasse) {
      nouvellesErreurs.confirmationMotDePasse = 'Les mots de passe ne correspondent pas';
      estValide = false;
    }
    
    setErreurs(nouvellesErreurs);
    return estValide;
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(effacerErreur());
    setFormData({ ...formData, [name]: value });
    
    // Effacer l'erreur du champ modifié
    if (erreurs[name]) {
      setErreurs({ ...erreurs, [name]: '' });
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validerFormulaire()) {
      // Ne pas envoyer la confirmation du mot de passe à Redux
      const { confirmationMotDePasse, ...userData } = formData;
      dispatch(inscription(userData));
      
      // Vérifier si pas d'erreur après l'inscription pour rediriger
      if (!erreur) {
        alert('Inscription réussie ! Vous pouvez maintenant vous connecter.');
        router.push('/connexion');
      }
    }
  };
  
  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card border-0 shadow-sm">
            <div className="card-body p-4 p-md-5">
              <h1 className="text-center mb-4 text-primary fw-bold">Inscription</h1>
              
              {erreur && (
                <div className="alert alert-danger" role="alert">
                  {erreur}
                </div>
              )}
              
              <form onSubmit={handleSubmit}>
                <div className="row mb-3">
                  <div className="col-md-6 mb-3 mb-md-0">
                    <label htmlFor="prenom" className="form-label">Prénom</label>
                    <input
                      type="text"
                      className={`form-control ${erreurs.prenom ? 'is-invalid' : ''}`}
                      id="prenom"
                      name="prenom"
                      value={formData.prenom}
                      onChange={handleChange}
                      placeholder="Votre prénom"
                    />
                    {erreurs.prenom && (
                      <div className="invalid-feedback">
                        {erreurs.prenom}
                      </div>
                    )}
                  </div>
                  
                  <div className="col-md-6">
                    <label htmlFor="nom" className="form-label">Nom</label>
                    <input
                      type="text"
                      className={`form-control ${erreurs.nom ? 'is-invalid' : ''}`}
                      id="nom"
                      name="nom"
                      value={formData.nom}
                      onChange={handleChange}
                      placeholder="Votre nom"
                    />
                    {erreurs.nom && (
                      <div className="invalid-feedback">
                        {erreurs.nom}
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="email"
                    className={`form-control ${erreurs.email ? 'is-invalid' : ''}`}
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
                
                <div className="mb-3">
                  <label htmlFor="motDePasse" className="form-label">Mot de passe</label>
                  <input
                    type="password"
                    className={`form-control ${erreurs.motDePasse ? 'is-invalid' : ''}`}
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
                </div>
                
                <div className="mb-4">
                  <label htmlFor="confirmationMotDePasse" className="form-label">Confirmation du mot de passe</label>
                  <input
                    type="password"
                    className={`form-control ${erreurs.confirmationMotDePasse ? 'is-invalid' : ''}`}
                    id="confirmationMotDePasse"
                    name="confirmationMotDePasse"
                    value={formData.confirmationMotDePasse}
                    onChange={handleChange}
                    placeholder="Confirmer votre mot de passe"
                  />
                  {erreurs.confirmationMotDePasse && (
                    <div className="invalid-feedback">
                      {erreurs.confirmationMotDePasse}
                    </div>
                  )}
                </div>
                
                <div className="d-grid">
                  <button type="submit" className="btn btn-primary btn-lg">
                    S'inscrire
                  </button>
                </div>
                
                <div className="text-center mt-4">
                  <p>
                    Déjà inscrit ? {' '}
                    <Link href="/connexion" className="text-primary">
                      Se connecter
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