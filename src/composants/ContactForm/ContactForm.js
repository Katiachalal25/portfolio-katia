import { useState, useEffect } from 'react';

export default function ContactForm({ show, handleClose }) {
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  
  const validate = () => {
    const newErrors = {};
    
    if (!formData.nom.trim()) newErrors.nom = 'Le nom est requis';
    if (!formData.email.trim()) newErrors.email = 'L\'email est requis';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Format d\'email invalide';
    if (!formData.message.trim()) newErrors.message = 'Le message est requis';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Effacer l'erreur si l'utilisateur corrige
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validate()) {
      setIsSubmitting(true);
      
      // Simuler l'envoi d'email (remplacer par une vraie API dans un cas réel)
      setTimeout(() => {
        setIsSubmitting(false);
        setShowSuccess(true);
        
        // Réinitialiser le formulaire
        setFormData({
          nom: '',
          email: '',
          message: ''
        });
        
        // Fermer l'alerte après 3 secondes et fermer la modale
        setTimeout(() => {
          setShowSuccess(false);
          handleClose();
        }, 3000);
      }, 1000);
    }
  };
  
  // Gérer l'appui sur la touche Escape pour fermer la modale
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') handleClose();
    };
    
    if (show) {
      document.addEventListener('keydown', handleEscape);
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [show, handleClose]);
  
  // Si la modale n'est pas affichée, ne pas rendre le composant
  if (!show) return null;
  
  return (
    <>
      <div 
        className="modal-backdrop show" 
        onClick={handleClose} 
        style={{ display: 'block', opacity: '0.7', backgroundColor: '#000' }}
      ></div>
      <div 
        className="modal fade show" 
        style={{ display: 'block', zIndex: 1050 }}
        onClick={e => e.stopPropagation()}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content shadow-lg border-0">
            <div className="modal-header bg-light">
              <h5 className="modal-title text-primary fw-bold">Contactez-moi</h5>
              <button 
                type="button" 
                className="btn-close" 
                onClick={handleClose}
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body p-4">
              {showSuccess && (
                <div className="alert alert-success mb-4">
                  <i className="bi bi-check-circle-fill me-2"></i>
                  Votre message a été envoyé avec succès !
                </div>
              )}
              
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="nom" className="form-label">Nom</label>
                  <input
                    type="text"
                    className={`form-control ${errors.nom ? 'is-invalid' : ''}`}
                    id="nom"
                    name="nom"
                    value={formData.nom}
                    onChange={handleChange}
                    placeholder="Votre nom"
                  />
                  {errors.nom && (
                    <div className="invalid-feedback">
                      {errors.nom}
                    </div>
                  )}
                </div>
                
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="email"
                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="votre@email.com"
                  />
                  {errors.email && (
                    <div className="invalid-feedback">
                      {errors.email}
                    </div>
                  )}
                </div>
                
                <div className="mb-3">
                  <label htmlFor="message" className="form-label">Message</label>
                  <textarea
                    className={`form-control ${errors.message ? 'is-invalid' : ''}`}
                    id="message"
                    name="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Votre message..."
                  ></textarea>
                  {errors.message && (
                    <div className="invalid-feedback">
                      {errors.message}
                    </div>
                  )}
                </div>
                
                <div className="d-grid mt-4">
                  <button 
                    className="btn btn-primary btn-lg" 
                    type="submit" 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Envoi en cours...
                      </>
                    ) : "Envoyer le message"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 