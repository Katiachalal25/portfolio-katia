import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  utilisateur: null,
  estConnecte: false,
  utilisateursInscrits: [],
  erreur: null
};

const authentificationSlice = createSlice({
  name: 'authentification',
  initialState,
  reducers: {
    connexion: (state, action) => {
      const utilisateurTrouve = state.utilisateursInscrits.find(
        u => u.email === action.payload.email && u.motDePasse === action.payload.motDePasse
      );
      
      if (utilisateurTrouve) {
        state.utilisateur = utilisateurTrouve;
        state.estConnecte = true;
        state.erreur = null;
      } else {
        state.erreur = "Email ou mot de passe incorrect";
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

export const { connexion, inscription, deconnexion, effacerErreur } = authentificationSlice.actions;
export default authentificationSlice.reducer; 