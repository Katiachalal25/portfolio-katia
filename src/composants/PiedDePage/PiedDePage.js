'use client';

import Link from 'next/link';

export default function PiedDePage() {
  return (
    <footer className="bg-dark text-white py-4 mt-5">
      <div className="container">
        <div className="row">
          <div className="col-md-4 mb-3">
            <h5>Portfolio de Katia</h5>
            <p className="text-muted">
              Développeuse Web Full Stack passionnée par la création d'applications web modernes et élégantes.
            </p>
          </div>
          
          <div className="col-md-4 mb-3">
            <h5>Navigation</h5>
            <ul className="list-unstyled">
              <li><Link href="/accueil" className="text-light">Accueil</Link></li>
              <li><Link href="/projets" className="text-light">Projets</Link></li>
              <li><Link href="/temoignages" className="text-light">Témoignages</Link></li>
            </ul>
          </div>
          
          <div className="col-md-4 mb-3">
            <h5>Retrouvez-moi</h5>
            <div className="d-flex gap-3 mt-3">
              <a href="https://github.com/Katiachalal25" target="_blank" rel="noopener noreferrer" className="text-light fs-5">
                <i className="bi bi-github"></i>
              </a>
              <a href="https://linkedin.com/in/katia-chalal-08b1b8321" target="_blank" rel="noopener noreferrer" className="text-light fs-5">
                <i className="bi bi-linkedin"></i>
              </a>
              <a href="https://x.com/KatiaChala49701" target="_blank" rel="noopener noreferrer" className="text-light fs-5">
                <i className="bi bi-twitter-x"></i>
              </a>
              <a href="mailto:chalalkatia2022@gmail.com" className="text-light fs-5">
                <i className="bi bi-envelope"></i>
              </a>
            </div>
          </div>
        </div>
        
        <hr className="my-4" />
        
        <div className="text-center">
          <p className="mb-0">&copy; {new Date().getFullYear()} Portfolio de Katia. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
} 