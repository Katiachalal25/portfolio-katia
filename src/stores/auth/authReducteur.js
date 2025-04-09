import { createSlice } from '@reduxjs/toolkit';

// Ajout de données d'exemple pour tester la connexion
const utilisateursParDefaut = [
  {
    id: 1,
    prenom: 'Utilisateur',
    nom: 'Test',
    email: 'test@example.com',
    motDePasse: 'password123'
  }
];

const initialState = {
  utilisateur: null,
  estConnecte: false,
  utilisateursInscrits: utilisateursParDefaut, // Utilisez les utilisateurs par défaut
  erreur: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    connexion: (state, action) => {
      // Log des informations de connexion pour le débogage (ne pas faire en production)
      console.log('Tentative de connexion avec:', action.payload);
      console.log('Utilisateurs inscrits:', state.utilisateursInscrits);
      
      // Vérifier si des données sont vides
      if (!action.payload.email || !action.payload.motDePasse) {
        state.erreur = "Veuillez remplir tous les champs";
        return;
      }
      
      const utilisateurTrouve = state.utilisateursInscrits.find(
        u => u.email === action.payload.email && u.motDePasse === action.payload.motDePasse
      );
      
      if (utilisateurTrouve) {
        console.log('Utilisateur trouvé:', utilisateurTrouve);
        state.utilisateur = utilisateurTrouve;
        state.estConnecte = true;
        state.erreur = null;
      } else {
        // Vérifier si l'email existe mais le mot de passe est incorrect
        const emailExiste = state.utilisateursInscrits.some(u => u.email === action.payload.email);
        
        if (emailExiste) {
          console.log('Échec de connexion: mot de passe incorrect');
          state.erreur = "Le mot de passe est incorrect";
        } else {
          console.log('Échec de connexion: email introuvable');
          state.erreur = "Aucun compte n'existe avec cet email";
        }
      }
    },
    inscription: (state, action) => {
      const utilisateurExistant = state.utilisateursInscrits.find(
        u => u.email === action.payload.email
      );
      
      if (utilisateurExistant) {
        state.erreur = "Un compte avec cet email existe déjà";
      } else {
        state.utilisateursInscrits.push(action.payload);
        state.erreur = null;
      }
    },
    deconnexion: (state) => {
      state.utilisateur = null;
      state.estConnecte = false;
      state.erreur = null;
    },
    effacerErreur: (state) => {
      state.erreur = null;
    }
  }
});

export const { connexion, inscription, deconnexion, effacerErreur } = authSlice.actions;
export default authSlice.reducer; 