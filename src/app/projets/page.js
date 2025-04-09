'use client';

import Link from 'next/link';
import Image from 'next/image';
import Protection from '@/composants/Protection/Protection';

// Données statiques des projets
const projets = [
  {
    id: '1',
    titre: 'Site web Echange de briques',
    description: 'Une plateforme d\'échange de briques Lego pour compléter vos créations',
    image: '/images/brique.jpg',
    

    technologies: ['HTML/CSS', 'Node.js', 'Express', 'SQL', 'JavaScript'],
    lien: 'https://github.com/Katiachalal25/exchange-project'
  },
 
  {
    id: '2',
    titre: 'Application Disctop InvenTrack',
    description: 'Une application desktop pour la gestion des commandes et des stocks de la cafétéria "Mocaloca"',
    image: '/images/inventrack.png', 
    technologies: ['Architecture Model-View-Controller (MVC)','Microsoft SQL Server', 'C#','Windows Forms'],
    lien: 'https://github.com/saraeiii/Project-Inventrack'
  }
];

export default function Projets() {
  return (
    <Protection>
      <div className="container my-5">
        <h1 className="display-4 fw-bold text-center text-primary mb-5">Mes Projets</h1>
        
        <div className="row g-4 mb-5">
          {projets.map((projet) => (
            <div className="col-md-4" key={projet.id}>
              <div className="card h-100 border-0 shadow-sm">
                <div className="position-relative" style={{ height: '200px' }}>
                  <Image
                    src={projet.image}
                    alt={projet.titre}
                    fill
                    style={{ objectFit: 'cover' }}
                    className="card-img-top"
                  />
                </div>
                <div className="card-body">
                  <h2 className="card-title h5 fw-bold">{projet.titre}</h2>
                  <p className="card-text text-muted">
                    {projet.description.length > 100 
                      ? `${projet.description.substring(0, 100)}...` 
                      : projet.description}
                  </p>
                  <div className="mb-3">
                    {projet.technologies.slice(0, 3).map((tech, index) => (
                      <span key={index} className="badge bg-primary me-1 mb-1">{tech}</span>
                    ))}
                    {projet.technologies.length > 3 && (
                      <span className="badge bg-secondary">+{projet.technologies.length - 3}</span>
                    )}
                  </div>
                  <Link href={`/projets/${projet.id}`} className="btn btn-outline-primary">
                    Voir les détails
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Protection>
  );
} 