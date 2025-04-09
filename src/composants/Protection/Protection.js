'use client';

import { useSelector } from 'react-redux';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function Protection({ children }) {
  const { estConnecte } = useSelector((state) => state.auth);
  const router = useRouter();
  const pathname = usePathname();
  
  // Vérifie si c'est une page d'avis (témoignages)
  const estPageAvis = pathname.startsWith('/avis');
  const routesPubliques = ['/connexion', '/inscription'];
  const estRoutePublique = routesPubliques.includes(pathname);

  useEffect(() => {
    // Rediriger vers la connexion uniquement si c'est une page d'avis et que l'utilisateur n'est pas connecté
    if (!estConnecte && estPageAvis && !estRoutePublique) {
      router.push('/connexion');
    }
    
    // Si connecté et sur une page d'authentification, rediriger vers l'accueil
    if (estConnecte && estRoutePublique) {
      router.push('/');
    }
  }, [estConnecte, estPageAvis, estRoutePublique, router, pathname]);

  // Ne pas afficher les enfants pendant la redirection pour les pages d'avis
  if (!estConnecte && estPageAvis && !estRoutePublique) {
    return null;
  }
  
  // Ne pas afficher les enfants si connecté et sur une page publique
  if (estConnecte && estRoutePublique) {
    return null;
  }

  return children;
} 