'use client';

import { useSelector } from 'react-redux';
import Link from 'next/link';
import ProtectionRoute from '@/composants/ProtectionRoute/ProtectionRoute';

export default function Temoignages() {
  const { liste: temoignages } = useSelector((state) => state.temoignages);
  
  return (
    <ProtectionRoute>
      <div className="container my-5">
        <div className="d-flex justify-content-between align-items-center mb-5">
          <h1 className="display-5 fw-bold text-primary">Témoignages</h1>
          <Link href="/temoignages/ajouter" className="btn btn-primary">
            <i className="bi bi-plus-circle me-2"></i>
            Ajouter un témoignage
          </Link>
        </div>
        
        {temoignages.length === 0 ? (
          <div className="card border-0 shadow-sm mb-4 p-5 text-center">
            <div className="card-body">
              <i className="bi bi-chat-square-text fs-1 text-muted mb-3"></i>
              <h2 className="h4 mb-3">Aucun témoignage pour le moment</h2>
              <p className="text-muted mb-4">Soyez le premier à partager votre expérience !</p>
              <Link href="/temoignages/ajouter" className="btn btn-primary">
                Ajouter un témoignage
              </Link>
            </div>
          </div>
        ) : (
          <div className="row g-4">
            {temoignages.map((temoignage) => (
              <div className="col-md-6 col-lg-4" key={temoignage.id}>
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-body">
                    <div className="d-flex justify-content-between mb-3">
                      <h2 className="card-title h5 mb-0">{temoignage.nom}</h2>
                      <span className="badge bg-light text-dark">
                        {new Date(temoignage.date).toLocaleDateString('fr-FR')}
                      </span>
                    </div>
                    <p className="card-text mb-4">{temoignage.message}</p>
                    <div className="d-flex align-items-center justify-content-between mt-auto">
                      <div>
                        <span className="text-warning me-1">
                          {Array.from({ length: 5 }, (_, i) => (
                            <i 
                              key={i} 
                              className={`bi ${i < temoignage.note ? 'bi-star-fill' : 'bi-star'}`}
                            ></i>
                          ))}
                        </span>
                        <span className="text-muted ms-2">({temoignage.note}/5)</span>
                      </div>
                      <Link 
                        href={`/temoignages/modifier/${temoignage.id}`}
                        className="btn btn-sm btn-outline-secondary"
                      >
                        <i className="bi bi-pencil me-2"></i>
                        Modifier
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </ProtectionRoute>
  );
} 