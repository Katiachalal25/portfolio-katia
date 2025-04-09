//Les actions
import { SET_AUTH_USER, LOGOUT_USER } from "../actions";

//Etat initial

const initLoginUser = {
    authUser: {},
    token: ''
}

//Le reducteur

export const loginReducer = (state = initLoginUser, action)=>{
    const { type, payload } = action
    switch (type) {
        case SET_AUTH_USER:
            return { ...state, authUser: payload.data, token: payload.token }
        case LOGOUT_USER:
            return { ...state, authUser: {}, token: null }
        default:
            return state
    }
}