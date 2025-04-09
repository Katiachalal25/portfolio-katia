'use client';

import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Protection from '@/composants/Protection/Protection';
import Link from 'next/link';

// Données statiques des projets
const projets = [
  {
    id: '1',
    titre: 'Site web Echange de briques',
    description: "Une plateforme web dédiée aux passionnés de Lego, permettant aux utilisateurs d'échanger leurs pièces et briques pour compléter leurs créations. Les utilisateurs peuvent proposer des échanges en fonction des pièces dont ils disposent et rechercher des briques spécifiques à ajouter à leurs collections. L'application offre une interface simple et efficace pour créer, consulter, et gérer des échanges, tout en garantissant une valeur approximative équitable pour chaque échange. Grâce à des fonctionnalités comme la validation des échanges et un système d'affichage dynamique des offres, ce site facilite le partage et l'échange entre les constructeurs.",
    image: "/images/brique.jpg",
    
    technologies: ['HTML/CSS', 'Node.js', 'Express', 'SQL', 'JavaScript'],
    lien: 'https://github.com/Katiachalal25/exchange-project',
    fonctionnalites: [
      'Visualisation des échanges proposés par les utilisateurs avec des liens vers chaque échange',
      'Gestion des échanges personnels, permettant de consulter, modifier et supprimer les offres',
      'Création d\'échanges avec sélection des briques à échanger et définition d\'un nom pour l\'échange',
      'Affichage détaillé des échanges avec les informations des briques et la valeur estimée de l\'échange',
      'Validation des échanges côté client et serveur pour garantir la qualité des données'
    ],
    defis: 'Le projet de site d\'échange de briques Lego rencontre plusieurs défis, notamment en ce qui concerne la gestion des données des utilisateurs, la validation des échanges, et l\'optimisation de l\'interface pour offrir une expérience utilisateur fluide. ' + 
    'Les solutions proposées pour résoudre ces défis incluent l\'utilisation de Node.js pour le serveur, SQL pour gérer les données des échanges et des briques, ainsi que des techniques de validation côté client et serveur pour garantir la qualité des données. ' +
    'L\'interface a été conçue pour être simple et intuitive, permettant aux utilisateurs de créer, consulter et gérer leurs échanges de manière efficace.'
},

  {
    id: '2',
    titre: 'Application Desctop InvenTrack',
    description: "InvenTrack est une application desktop développée pour répondre aux besoins spécifiques de la cafétéria et du service traiteur Mocaloca. Ce projet est né d’observations sur le terrain : pertes de feuilles de commande, erreurs de communication et oublis de produits essentiels. L’application vise à centraliser les commandes, améliorer la communication interne et optimiser les achats auprès des fournisseurs. Grâce à une interface simple et intuitive, InvenTrack permet de suivre les commandes, gérer les stocks en temps réel et réduire les erreurs humaines, tout en améliorant l’efficacité du personnel au quotidien.",

    image: '/images/inventrack.png',
    technologies: ['Microsoft SQL Server', 'C#', 'Architecture Model-View-Controller (MVC)','Windows Forms'],
    lien: 'https://github.com/saraeiii/Project-Inventrack',
    fonctionnalites: [
      'Gestion centralisée des commandes et des stocks',
      'Suivi en temps réel des stocks et alertes pour les produits à réapprovisionner',
      'Gestion des informations des fournisseurs',
      'Ajout, modification, et suppression des produits',
      'Suivi des commandes : historique et état des commandes',
      'Interface simple et intuitive pour une gestion facile, même pour une équipe non technique',
      'Notifications automatiques pour les commandes en attente ou les ruptures de stock',
      'Modèle MVC utilisé pour une organisation claire et évolutive du code'
    ],
    defis: 'Le projet InvenTrack a permis de résoudre plusieurs défis rencontrés dans la gestion des commandes et des stocks de la cafétéria Mocaloca. Parmi les principaux défis, il y avait la gestion centralisée des données, le suivi inefficace des stocks, le manque de communication avec les fournisseurs, et la nécessité de créer une interface simple à utiliser pour une équipe non technique. Les solutions apportées incluent le développement d\'une application desktop personnalisée en C#, avec une base de données SQL Server pour gérer les informations sur les produits, les commandes et les fournisseurs. Une interface claire et accessible a été conçue en utilisant Windows Forms. De plus, l\'utilisation du modèle MVC a permis d\'assurer une organisation claire du code, facilitant ainsi la maintenance et les évolutions futures de l\'application.'

  }
];

export default function DetailProjet() {
  const params = useParams();
  const router = useRouter();
  const id = params.id;
  
  const projet = projets.find(p => p.id === id);
  
  if (!projet) {
    return (
      <Protection>
        <div className="container my-5 text-center">
          <h1>Projet non trouvé</h1>
          <p>Le projet que vous recherchez n'existe pas.</p>
          <Link href="/projets" className="btn btn-primary mt-3">
            Retour aux projets
          </Link>
        </div>
      </Protection>
    );
  }
  
  return (
    <Protection>
      <div className="container my-5">
        <div className="mb-4">
          <button 
            onClick={() => router.back()} 
            className="btn btn-outline-secondary"
          >
            <i className="bi bi-arrow-left me-2"></i>
            Retour aux projets
          </button>
        </div>
        
        <div className="row g-4 mb-5">
          <div className="col-md-6">
            <div className="position-relative rounded overflow-hidden" style={{ height: '400px' }}>
              <Image
                src={projet.image}
                alt={projet.titre}
                fill
                priority
                style={{ objectFit: 'cover' }}
              />
            </div>
          </div>
          
          <div className="col-md-6">
            <h1 className="display-5 fw-bold text-primary mb-3">{projet.titre}</h1>
            
            <div className="mb-4">
              <h3 className="h5 fw-bold">Technologies utilisées</h3>
              <div>
                {projet.technologies.map((tech, index) => (
                  <span key={index} className="badge bg-primary me-2 mb-2">{tech}</span>
                ))}
              </div>
            </div>
            
            <div className="mb-4">
              <a href={projet.lien} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                <i className="bi bi-github me-2"></i>
                Voir sur GitHub
              </a>
            </div>
          </div>
        </div>
        
        <div className="row">
          <div className="col-12 mb-5">
            <div className="card border-0 shadow-sm">
              <div className="card-body p-4">
                <h2 className="card-title h4 fw-bold mb-3">Description du projet</h2>
                <p className="card-text">{projet.description}</p>
              </div>
            </div>
          </div>
          
          <div className="col-md-6 mb-4">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body p-4">
                <h2 className="card-title h4 fw-bold mb-3">Fonctionnalités principales</h2>
                <ul className="list-group list-group-flush">
                  {projet.fonctionnalites.map((fonc, index) => (
                    <li key={index} className="list-group-item bg-transparent px-0">
                      <i className="bi bi-check-circle-fill text-success me-2"></i>
                      {fonc}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          
          <div className="col-md-6 mb-4">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body p-4">
                <h2 className="card-title h4 fw-bold mb-3">Défis et solutions</h2>
                <p className="card-text">{projet.defis}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Protection>
  );
} 