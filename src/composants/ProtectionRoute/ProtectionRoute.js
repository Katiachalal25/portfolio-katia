'use client';

import { useSelector } from 'react-redux';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function ProtectionRoute({ children }) {
  const { estConnecte } = useSelector((state) => state.authentification);
  const router = useRouter();
  const pathname = usePathname();
  
  const routesPubliques = ['/connexion', '/inscription'];
  const estRoutePublique = routesPubliques.includes(pathname);

  useEffect(() => {
    if (!estConnecte && !estRoutePublique) {
      router.push('/connexion');
    }
    
    if (estConnecte && estRoutePublique) {
      router.push('/accueil');
    }
  }, [estConnecte, estRoutePublique, router, pathname]);

  // Ne pas afficher les enfants pendant la redirection
  if (!estConnecte && !estRoutePublique) {
    return null;
  }
  
  // Ne pas afficher les enfants si connecté et sur une route publique
  if (estConnecte && estRoutePublique) {
    return null;
  }

  return children;
} 