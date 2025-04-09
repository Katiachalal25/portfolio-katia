'use client';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { ajouterTemoignage } from '@/stores/fonctionnalites/temoignages/temoignagesSlice';
import { useRouter } from 'next/navigation';
import ProtectionRoute from '@/composants/ProtectionRoute/ProtectionRoute';
import Link from 'next/link';

export default function AjouterTemoignage() {
  const dispatch = useDispatch();
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    message: '',
    note: 5
  });
  
  const [erreurs, setErreurs] = useState({
    nom: '',
    email: '',
    message: ''
  });
  
  const validerFormulaire = () => {
    const nouvellesErreurs = {
      nom: '',
      email: '',
      message: ''
    };
    
    let estValide = true;
    
    if (!formData.nom.trim()) {
      nouvellesErreurs.nom = 'Le nom est requis';
      estValide = false;
    }
    
    if (!formData.email) {
      nouvellesErreurs.email = 'L\'email est requis';
      estValide = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      nouvellesErreurs.email = 'Format d\'email invalide';
      estValide = false;
    }
    
    if (!formData.message.trim()) {
      nouvellesErreurs.message = 'Le message est requis';
      estValide = false;
    } else if (formData.message.trim().length < 10) {
      nouvellesErreurs.message = 'Le message doit contenir au moins 10 caractères';
      estValide = false;
    }
    
    setErreurs(nouvellesErreurs);
    return estValide;
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Effacer l'erreur du champ modifié
    if (erreurs[name]) {
      setErreurs({ ...erreurs, [name]: '' });
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validerFormulaire()) {
      dispatch(ajouterTemoignage(formData));
      alert('Témoignage ajouté avec succès !');
      router.push('/temoignages');
    }
  };
  
  return (
    <ProtectionRoute>
      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card border-0 shadow-sm">
              <div className="card-body p-4 p-md-5">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h1 className="card-title h3 fw-bold text-primary">Ajouter un témoignage</h1>
                  <Link 
                    href="/temoignages" 
                    className="btn btn-outline-secondary"
                  >
                    <i className="bi bi-arrow-left me-2"></i>
                    Retour
                  </Link>
                </div>
                
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
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
                  
                  <div className="mb-4">
                    <label htmlFor="message" className="form-label">Votre témoignage</label>
                    <textarea
                      className={`form-control ${erreurs.message ? 'is-invalid' : ''}`}
                      id="message"
                      name="message"
                      rows="5"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Partagez votre expérience..."
                    ></textarea>
                    {erreurs.message && (
                      <div className="invalid-feedback">
                        {erreurs.message}
                      </div>
                    )}
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="note" className="form-label">Note</label>
                    <div className="d-flex align-items-center">
                      <input
                        type="range"
                        className="form-range me-3"
                        min="1"
                        max="5"
                        step="1"
                        id="note"
                        name="note"
                        value={formData.note}
                        onChange={handleChange}
                      />
                      <div className="text-warning">
                        {Array.from({ length: 5 }, (_, i) => (
                          <i 
                            key={i} 
                            className={`bi ${i < formData.note ? 'bi-star-fill' : 'bi-star'}`}
                          ></i>
                        ))}
                      </div>
                      <span className="ms-2">({formData.note}/5)</span>
                    </div>
                  </div>
                  
                  <div className="d-grid mt-4">
                    <button type="submit" className="btn btn-primary btn-lg">
                      Soumettre le témoignage
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectionRoute>
  );
} 