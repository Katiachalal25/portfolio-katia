'use client';

import Image from 'next/image';
import { useSelector } from 'react-redux';
import Protection from '@/composants/Protection/Protection';

export default function Accueil() {
  const { utilisateur } = useSelector((state) => state.auth);

  return (
    <Protection>
      <div className="container my-5">
        <div className="row align-items-center">
          <div className="col-md-4 mb-4 mb-md-0">
            <div className="position-relative rounded-circle overflow-hidden mx-auto" style={{ width: '280px', height: '280px' }}>
              <Image
                src="/images/katia.jpeg"
                alt="Katia"
                fill
                priority
                style={{ objectFit: 'cover' }}
              />
            </div>
          </div>
          <div className="col-md-8">
            <h1 className="display-4 fw-bold text-primary mb-3">Bonjour, je suis Katia</h1>
            <p className="lead fs-3 mb-4">Développeuse Full Stack passionnée</p>
            <p className="mb-4 fs-5">
              Bienvenue {utilisateur ? utilisateur.prenom : ''} sur mon portfolio ! Je suis spécialisée dans le développement 
              d'applications web modernes et performantes. Mon expertise couvre l'ensemble de la chaîne 
              de développement, du front-end au back-end, en passant par la conception UX/UI.
              Je m'attache à créer des solutions digitales qui répondent aux besoins des utilisateurs
              tout en offrant une expérience fluide et agréable.
            </p>
          </div>
        </div>

        <div className="mt-5">
          <h2 className="text-center mb-5 fw-bold text-primary">Mes compétences</h2>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center">
                  <i className="bi bi-laptop fs-1 text-primary mb-3"></i>
                  <h3 className="card-title h4 mb-3">Front-end</h3>
                  <ul className="list-unstyled">
                    <li className="mb-2">React.js / Next.js</li>
                    <li className="mb-2">HTML / CSS </li>
                    <li className="mb-2">JavaScript </li>
                    <li className="mb-2">Bootstrap / Tailwind CSS</li>
                    <li className="mb-2">Redux / Context API</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center">
                  <i className="bi bi-server fs-1 text-primary mb-3"></i>
                  <h3 className="card-title h4 mb-3">Back-end</h3>
                  <ul className="list-unstyled">
                    <li className="mb-2">Node.js / Express</li>
                    <li className="mb-2">MongoDB / MySQL</li>
                    <li className="mb-2">API RESTful</li>
                    <li className="mb-2">GraphQL</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center">
                  <i className="bi bi-tools fs-1 text-primary mb-3"></i>
                  <h3 className="card-title h4 mb-3">Outils & Méthodes</h3>
                  <ul className="list-unstyled">
                    <li className="mb-2">Git / GitHub</li>
                    <li className="mb-2">Tests unitaires / E2E</li>
                    <li className="mb-2">Méthodologie Agile / Scrum</li>
                    <li className="mb-2">Figma / Adobe XD</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Protection>
  );
} 