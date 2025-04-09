//Importer tous les reducteurs
import { loginReducer } from "./loginReducer";
import { userReducer } from "./userReducer";

import { combineReducers } from "redux";

const finalReducer = combineReducers({
    auth: loginReducer,
    userReducer
})

export default finalReducer