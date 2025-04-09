import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  liste: [],
  avisCourant: null
};

const avisSlice = createSlice({
  name: 'avis',
  initialState,
  reducers: {
    ajouterAvis: (state, action) => {
      const nouvelAvis = {
        id: Date.now().toString(),
        ...action.payload,
        date: new Date().toISOString()
      };
      state.liste.push(nouvelAvis);
    },
    modifierAvis: (state, action) => {
      const index = state.liste.findIndex(t => t.id === action.payload.id);
      if (index !== -1) {
        state.liste[index] = {
          ...state.liste[index],
          ...action.payload,
          dateModification: new Date().toISOString()
        };
      }
    },
    supprimerAvis: (state, action) => {
      state.liste = state.liste.filter(t => t.id !== action.payload);
    },
    selectionnerAvis: (state, action) => {
      state.avisCourant = state.liste.find(t => t.id === action.payload);
    },
    reinitialiserAvisCourant: (state) => {
      state.avisCourant = null;
    }
  }
});

export const {
  ajouterAvis,
  modifierAvis,
  supprimerAvis,
  selectionnerAvis,
  reinitialiserAvisCourant
} = avisSlice.actions;

export default avisSlice.reducer; 