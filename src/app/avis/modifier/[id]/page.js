'use client';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  modifierAvis, 
  supprimerAvis, 
  selectionnerAvis, 
  reinitialiserAvisCourant 
} from '@/stores/avis/avisReducteur';
import { useParams, useRouter } from 'next/navigation';
import Protection from '@/composants/Protection/Protection';
import Link from 'next/link';

export default function ModifierAvis() {
  const dispatch = useDispatch();
  const router = useRouter();
  const params = useParams();
  const id = params.id;
  
  const { liste, avisCourant } = useSelector((state) => state.avis);
  
  const [formData, setFormData] = useState({
    id: '',
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
  
  // Charger l'avis au chargement de la page
  useEffect(() => {
    dispatch(selectionnerAvis(id));
    
    return () => {
      dispatch(reinitialiserAvisCourant());
    };
  }, [dispatch, id]);
  
  // Remplir le formulaire quand l'avis courant change
  useEffect(() => {
    if (avisCourant) {
      setFormData(avisCourant);
    } else {
      // Si l'avis n'est pas trouvé, vérifier dans la liste
      const avis = liste.find(t => t.id === id);
      if (avis) {
        setFormData(avis);
      } else {
        router.push('/avis');
      }
    }
  }, [avisCourant, liste, id, router]);
  
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
      dispatch(modifierAvis(formData));
      alert('Avis modifié avec succès !');
      router.push('/avis');
    }
  };
  
  const handleDelete = () => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet avis ?')) {
      dispatch(supprimerAvis(id));
      alert('Avis supprimé avec succès !');
      router.push('/avis');
    }
  };
  
  if (!formData.id) {
    return (
      <Protection>
        <div className="container my-5 text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Chargement...</span>
          </div>
        </div>
      </Protection>
    );
  }
  
  return (
    <Protection>
      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card border-0 shadow-sm">
              <div className="card-body p-4 p-md-5">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h1 className="card-title h3 fw-bold text-primary">Modifier l'avis</h1>
                  <Link 
                    href="/avis" 
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
                    <label htmlFor="message" className="form-label">Votre avis</label>
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
                  
                  <div className="d-flex justify-content-between mt-4">
                    <button 
                      type="button" 
                      className="btn btn-danger"
                      onClick={handleDelete}
                    >
                      <i className="bi bi-trash me-2"></i>
                      Supprimer
                    </button>
                    
                    <button type="submit" className="btn btn-primary">
                      <i className="bi bi-save me-2"></i>
                      Enregistrer les modifications
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Protection>
  );
} 