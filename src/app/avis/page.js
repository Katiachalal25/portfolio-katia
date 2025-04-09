'use client';

import { useSelector } from 'react-redux';
import Link from 'next/link';
import Protection from '@/composants/Protection/Protection';

export default function Avis() {
  const { liste: avis } = useSelector((state) => state.avis);
  
  return (
    <Protection>
      <div className="container my-5">
        <div className="d-flex justify-content-between align-items-center mb-5">
          <h1 className="display-5 fw-bold text-primary">Avis</h1>
          <Link href="/avis/ajouter" className="btn btn-primary">
            <i className="bi bi-plus-circle me-2"></i>
            Ajouter un avis
          </Link>
        </div>
        
        {avis.length === 0 ? (
          <div className="card border-0 shadow-sm mb-4 p-5 text-center">
            <div className="card-body">
              <i className="bi bi-chat-square-text fs-1 text-muted mb-3"></i>
              <h2 className="h4 mb-3">Aucun avis pour le moment</h2>
              <p className="text-muted mb-4">Soyez le premier à partager votre expérience !</p>
              <Link href="/avis/ajouter" className="btn btn-primary">
                Ajouter un avis
              </Link>
            </div>
          </div>
        ) : (
          <div className="row g-4">
            {avis.map((item) => (
              <div className="col-md-6 col-lg-4" key={item.id}>
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-body">
                    <div className="d-flex justify-content-between mb-3">
                      <h2 className="card-title h5 mb-0">{item.nom}</h2>
                      <span className="badge bg-light text-dark">
                        {new Date(item.date).toLocaleDateString('fr-FR')}
                      </span>
                    </div>
                    <p className="card-text mb-4">{item.message}</p>
                    <div className="d-flex align-items-center justify-content-between mt-auto">
                      <div>
                        <span className="text-warning me-1">
                          {Array.from({ length: 5 }, (_, i) => (
                            <i 
                              key={i} 
                              className={`bi ${i < item.note ? 'bi-star-fill' : 'bi-star'}`}
                            ></i>
                          ))}
                        </span>
                        <span className="text-muted ms-2">({item.note}/5)</span>
                      </div>
                      <Link 
                        href={`/avis/modifier/${item.id}`}
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
    </Protection>
  );
} 