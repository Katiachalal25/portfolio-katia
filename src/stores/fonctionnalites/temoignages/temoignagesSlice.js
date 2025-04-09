import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  liste: [],
  temoignageCourant: null
};

const temoignagesSlice = createSlice({
  name: 'temoignages',
  initialState,
  reducers: {
    ajouterTemoignage: (state, action) => {
      const nouveauTemoignage = {
        id: Date.now().toString(),
        ...action.payload,
        date: new Date().toISOString()
      };
      state.liste.push(nouveauTemoignage);
    },
    modifierTemoignage: (state, action) => {
      const index = state.liste.findIndex(t => t.id === action.payload.id);
      if (index !== -1) {
        state.liste[index] = {
          ...state.liste[index],
          ...action.payload,
          dateModification: new Date().toISOString()
        };
      }
    },
    supprimerTemoignage: (state, action) => {
      state.liste = state.liste.filter(t => t.id !== action.payload);
    },
    selectionnerTemoignage: (state, action) => {
      state.temoignageCourant = state.liste.find(t => t.id === action.payload);
    },
    reinitialiserTemoignageCourant: (state) => {
      state.temoignageCourant = null;
    }
  }
});

export const {
  ajouterTemoignage,
  modifierTemoignage,
  supprimerTemoignage,
  selectionnerTemoignage,
  reinitialiserTemoignageCourant
} = temoignagesSlice.actions;

export default temoignagesSlice.reducer; 