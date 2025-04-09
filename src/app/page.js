'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import ContactForm from '@/composants/ContactForm/ContactForm';

export default function Accueil() {
  const [visible, setVisible] = useState(false);
  const [activeSkill, setActiveSkill] = useState(0);
  const [showContactForm, setShowContactForm] = useState(false);
  const { estConnecte } = useSelector((state) => state.auth);
  const router = useRouter();
  
  const skills = [
    { name: 'React.js', level: 75 },
    { name: 'Next.js', level: 80 },
    { name: 'JavaScript', level: 80 },
    { name: 'Node.js', level: 85 },
    { name: 'HTML/CSS', level: 85 },
    { name: 'SQL/NoSQL', level: 70 }
  ];
  
  const temoignages = [
    {
      id: 1,
      nom: "Alexandre Dumas",
      poste: "CEO, TechInnovate",
      texte: "Katia a transformé notre vision en réalité avec une plateforme web incroyablement intuitive. Son expertise technique et sa créativité ont dépassé toutes nos attentes.",
      avatar: "https://randomuser.me/api/portraits/men/41.jpg"
    },
    {
      id: 2,
      nom: "Sophia Saadi",
      poste: "Directrice Marketing, BrandFusion",
      texte: "Le travail de Katia sur notre site e-commerce a été exceptionnel. Sa maîtrise des technologies front-end a permis de créer une expérience utilisateur fluide et engageante.",
      avatar: "https://randomuser.me/api/portraits/women/65.jpg"
    },
    {
      id: 3,
      nom: "Lucas Francier",
      poste: "Fondateur, DigitalStudio",
      texte: "Collaborer avec Katia a été une expérience fantastique. Sa compréhension profonde de nos besoins et sa capacité à résoudre des problèmes complexes ont fait toute la différence.",
      avatar: "https://randomuser.me/api/portraits/men/22.jpg"
    }
  ];

  const handleLaisserTemoignage = () => {
    if (!estConnecte) {
      router.push('/inscription');
    } else {
      router.push('/avis/ajouter');
    }
  };
  
  useEffect(() => {
    setVisible(true);
    
    const interval = setInterval(() => {
      setActiveSkill((prev) => (prev + 1) % skills.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <main>
      {/* Contact Form Modal */}
      <ContactForm 
        show={showContactForm} 
        handleClose={() => setShowContactForm(false)} 
      />
      
      {/* Hero Section avec effet parallaxe */}
      <section className="position-relative overflow-hidden bg-dark text-white" style={{ minHeight: '100vh' }}>
        <div
          className="position-absolute w-100 h-100 top-0 start-0"
          style={{
            backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5))',
            zIndex: 1
          }}
        ></div>
        
        <div
          className="position-absolute w-100 h-100 top-0 start-0"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
            opacity: 0.5,
            zIndex: 0
          }}
        ></div>
        
        <div className="container position-relative" style={{ zIndex: 2 }}>
          <div className="row vh-100 align-items-center">
            <div className="col-md-6 d-flex flex-column justify-content-center">
              <div className={`transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <h1 className="display-3 fw-bold mb-4" style={{ 
                  opacity: visible ? 1 : 0, 
                  transform: visible ? 'translateY(0)' : 'translateY(20px)',
                  transition: 'opacity 1s ease, transform 1s ease' 
                }}>
                  Katia <span className="text-primary">Développeuse</span> Full Stack
                </h1>
                <p className="lead fs-4 mb-5" style={{ 
                  opacity: visible ? 1 : 0, 
                  transform: visible ? 'translateY(0)' : 'translateY(20px)',
                  transition: 'opacity 1s ease 0.3s, transform 1s ease 0.3s' 
                }}>
                  Création d'applications web modernes et innovantes. 
                  Spécialisée dans le développement frontend et backend avec les technologies les plus récentes.
                </p>
                <div style={{ 
                  opacity: visible ? 1 : 0, 
                  transform: visible ? 'translateY(0)' : 'translateY(20px)',
                  transition: 'opacity 1s ease 0.6s, transform 1s ease 0.6s' 
                }}>
                  <div className="d-flex flex-column flex-sm-row gap-3">
                    <Link href="/projets" className="btn btn-primary btn-lg px-4 py-2 w-100">
                      Voir mes projets
                    </Link>
                    <Link href="/avis" className="btn btn-outline-light btn-lg px-4 py-2 w-100">
                      Témoignages
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 d-flex justify-content-center">
              <div className="position-relative d-none d-md-block" style={{ 
                width: '350px', 
                height: '350px',
                opacity: visible ? 1 : 0,
                transform: visible ? 'scale(1)' : 'scale(0.8)',
                transition: 'opacity 1s ease 0.9s, transform 1s ease 0.9s'
              }}>
                <div className="rounded-circle position-absolute" style={{ 
                  width: '100%', 
                  height: '100%', 
                  border: '10px solid rgba(255, 255, 255, 0.1)',
                  animation: 'spin 15s linear infinite',
                }}>
                </div>
                <div className="rounded-circle overflow-hidden position-relative" style={{ 
                  width: '100%', 
                  height: '100%',
                  boxShadow: '0 0 30px rgba(232, 62, 140, 0.5)'
                }}>
                  <Image
                    src="/images/katia.jpeg"
                    alt="Katia"
                    fill
                    sizes="(max-width: 768px) 100vw, 350px"
                    priority
                    style={{ objectFit: 'cover' }}
                  />
                </div>
              </div>
              
              {/* Version mobile de l'image de profil */}
              <div className="d-md-none text-center mt-5" style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'scale(1)' : 'scale(0.8)',
                transition: 'opacity 1s ease 0.9s, transform 1s ease 0.9s'
              }}>
                <div className="position-relative mx-auto" style={{ 
                  width: '200px', 
                  height: '200px'
                }}>
                  <div className="rounded-circle overflow-hidden position-relative" style={{ 
                    width: '100%', 
                    height: '100%',
                    boxShadow: '0 0 20px rgba(232, 62, 140, 0.5)'
                  }}>
                    <Image
                      src="/images/katia.jpeg"
                      alt="Katia"
                      fill
                      sizes="(max-width: 768px) 100vw, 200px"
                      priority
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="position-absolute bottom-0 start-50 translate-middle-x pb-4" style={{ zIndex: 2 }}>
          <div className="text-center">
            <a href="#about" className="text-white">
              <i className="bi bi-chevron-down fs-2" style={{ animation: 'bounce 2s infinite' }}></i>
            </a>
          </div>
        </div>
      </section>
      
      {/* À propos */}
      <section id="about" className="py-5">
        <div className="container py-5">
          <div className="row">
            <div className="col-lg-6 mb-4 mb-lg-0">
              <h2 className="display-5 fw-bold mb-4">À propos de <span className="text-primary">moi</span></h2>
              <p className="lead mb-4">Développeuse passionnée, spécialisée en systèmes d'information et programmation informatique, avec une expérience pratique dans la création de solutions web et mobiles innovantes.</p>
              <p className="mb-4">
              Je suis une développeuse passionnée par la technologie et l'innovation, avec un parcours académique de plus de 5 ans dans le domaine des systèmes d'information. Mon parcours m'a permis de me spécialiser dans l'analyse et la conception des systèmes intelligents, où j'ai exploré des domaines tels que l'intelligence artificielle et les systèmes intelligents. Cette expérience m'a permis d'acquérir des compétences solides en résolution de problèmes complexes et en conception de solutions robustes.

              Dans le cadre de mes études à La Cité, j'ai approfondi mes connaissances en programmation informatique et en développement d'applications web et mobiles. J'ai eu l'opportunité de travailler sur des projets concrets, allant de petites applications web à des solutions mobiles plus complexes. J'ai exploré une variété de technologies, telles que React.js, Next.js, Node.js, MongoDB, et bien d'autres.

              Ma passion pour l'apprentissage continu me pousse à rester à jour avec les dernières avancées du domaine, et mon objectif est toujours de créer des solutions numériques efficaces, intuitives et capables d'offrir une expérience utilisateur exceptionnelle. En tant que développeuse, j'aspire à contribuer à des projets innovants qui répondent à des besoins réels et apportent une réelle valeur ajoutée.
              </p>
              <p className="mb-4">
                J'adore résoudre des problèmes complexes et transformer des idées en produits numériques qui offrent une expérience utilisateur exceptionnelle.
              </p>
              <div className="d-flex flex-wrap gap-2 gap-md-3 mt-4">
                <a href="https://github.com/katiachalal25" target="_blank" rel="noopener noreferrer" className="btn btn-dark px-3">
                  <i className="bi bi-github me-2"></i>GitHub
                </a>
                <a href="https://linkedin.com/in/katia-chalal-08b1b8321" target="_blank" rel="noopener noreferrer" className="btn btn-primary px-3">
                  <i className="bi bi-linkedin me-2"></i>LinkedIn
                </a>
                <button 
                  onClick={() => setShowContactForm(true)} 
                  className="btn btn-outline-dark px-3"
                >
                  <i className="bi bi-envelope me-2"></i>Contact
                </button>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="card border-0 shadow-lg rounded-3 p-4">
                <h3 className="mb-4 fw-bold">Mes compétences</h3>
                {skills.map((skill, index) => (
                  <div key={index} className="mb-4">
                    <div className="d-flex justify-content-between mb-2">
                      <span className="fw-medium">{skill.name}</span>
                      <span>{skill.level}%</span>
                    </div>
                    <div className="progress" style={{ height: '10px' }}>
                      <div 
                        className="progress-bar bg-primary" 
                        role="progressbar" 
                        style={{ 
                          width: `${index === activeSkill ? skill.level : 0}%`,
                          transition: 'width 1.5s ease-in-out'
                        }}
                        aria-valuenow={skill.level} 
                        aria-valuemin="0" 
                        aria-valuemax="100"
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Services */}
      <section className="py-5 bg-light">
        <div className="container py-5">
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold">Mes <span className="text-primary">services</span></h2>
            <p className="lead">Des solutions sur mesure pour répondre à vos besoins digitaux</p>
          </div>
          
          <div className="row g-4">
            <div className="col-12 col-md-6 col-lg-4 mb-4 mb-lg-0">
              <div className="card h-100 border-0 shadow-sm rounded-3 p-4 transition-all hover:shadow-lg hover:-translate-y-2" style={{ transition: 'all 0.3s ease' }}>
                <div className="text-primary mb-3">
                  <i className="bi bi-laptop fs-1"></i>
                </div>
                <h3 className="h4 mb-3">Développement Frontend</h3>
                <p className="text-muted mb-4">Création d'interfaces utilisateur interactives et responsive avec les frameworks modernes comme React et Next.js.</p>
                <ul className="list-unstyled mb-0">
                  <li className="mb-2"><i className="bi bi-check2-circle text-primary me-2"></i>Sites web responsive</li>
                  <li className="mb-2"><i className="bi bi-check2-circle text-primary me-2"></i>Applications SPA/PWA</li>
                  <li><i className="bi bi-check2-circle text-primary me-2"></i>Optimisation des performances</li>
                </ul>
              </div>
            </div>
            
            <div className="col-12 col-md-6 col-lg-4 mb-4 mb-lg-0">
              <div className="card h-100 border-0 shadow-sm rounded-3 p-4 transition-all hover:shadow-lg hover:-translate-y-2" style={{ transition: 'all 0.3s ease' }}>
                <div className="text-primary mb-3">
                  <i className="bi bi-server fs-1"></i>
                </div>
                <h3 className="h4 mb-3">Développement Backend</h3>
                <p className="text-muted mb-4">Développement d'APIs performantes et de systèmes serveur robustes pour alimenter vos applications.</p>
                <ul className="list-unstyled mb-0">
                  <li className="mb-2"><i className="bi bi-check2-circle text-primary me-2"></i>APIs RESTful</li>
                  <li className="mb-2"><i className="bi bi-check2-circle text-primary me-2"></i>Bases de données SQL/NoSQL</li>
                  <li><i className="bi bi-check2-circle text-primary me-2"></i>Authentification & Sécurité</li>
                </ul>
              </div>
            </div>
            
            <div className="col-12 col-md-6 col-lg-4">
              <div className="card h-100 border-0 shadow-sm rounded-3 p-4 transition-all hover:shadow-lg hover:-translate-y-2" style={{ transition: 'all 0.3s ease' }}>
                <div className="text-primary mb-3">
                  <i className="bi bi-phone fs-1"></i>
                </div>
                <h3 className="h4 mb-3">Applications Web</h3>
                <p className="text-muted mb-4">Conception et développement d'applications web complètes, du concept au déploiement.</p>
                <ul className="list-unstyled mb-0">
                  <li className="mb-2"><i className="bi bi-check2-circle text-primary me-2"></i>E-commerce</li>
                  <li className="mb-2"><i className="bi bi-check2-circle text-primary me-2"></i>Tableaux de bord</li>
                  <li><i className="bi bi-check2-circle text-primary me-2"></i>Systèmes de gestion de contenu</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Témoignages */}
      <section className="py-5">
        <div className="container py-5">
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold">Ce que disent mes <span className="text-primary">clients</span></h2>
            <p className="lead">Des témoignages des personnes avec qui j'ai eu le plaisir de travailler</p>
          </div>
          
          <div className="row g-4">
            {temoignages.map((temoignage) => (
              <div key={temoignage.id} className="col-12 col-md-6 col-lg-4">
                <div className="card h-100 border-0 shadow-sm rounded-3 p-4 transition-all hover:shadow-lg" style={{ transition: 'all 0.3s ease' }}>
                  <div className="d-flex align-items-center mb-4">
                    <div className="me-3">
                      <Image
                        src={temoignage.avatar}
                        alt={temoignage.nom}
                        width={60}
                        height={60}
                        className="rounded-circle"
                      />
                    </div>
                    <div>
                      <h5 className="mb-0 fw-bold">{temoignage.nom}</h5>
                      <p className="text-muted mb-0">{temoignage.poste}</p>
                    </div>
                  </div>
                  <p className="mb-3 fst-italic">"{temoignage.texte}"</p>
                  <div className="text-warning">
                    <i className="bi bi-star-fill me-1"></i>
                    <i className="bi bi-star-fill me-1"></i>
                    <i className="bi bi-star-fill me-1"></i>
                    <i className="bi bi-star-fill me-1"></i>
                    <i className="bi bi-star-fill"></i>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-5">
            <button 
              onClick={handleLaisserTemoignage}
              className="btn btn-primary btn-lg px-5"
            >
              Laisser un témoignage
            </button>
            <p className="mt-3 text-muted small">
              {!estConnecte && "Vous devrez vous inscrire pour laisser un témoignage."}
            </p>
          </div>
        </div>
      </section>
      
      {/* CTA Projets */}
      <section className="py-5 text-white" style={{ backgroundColor: '#e83e8c' }}>
        <div className="container py-5 text-center">
          <h2 className="display-5 fw-bold mb-4">Découvrez mes projets</h2>
          <p className="lead mb-4">Explorez mon portfolio pour voir des exemples de mon travail et de mes réalisations.</p>
          <Link href="/projets" className="btn btn-light btn-lg px-5 py-3 fw-medium">
            Voir tous les projets
          </Link>
        </div>
      </section>
      
      <style jsx global>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-20px); }
          60% { transform: translateY(-10px); }
        }
      `}</style>
    </main>
  );
}