import { combineReducers } from "redux";
import { userReducer } from './userReducer';
import { usersReducer } from './usersReducer';
import { clientsReducer } from './clientsReducer';


export const  rootReducer = combineReducers({
    user: userReducer,
    users: usersReducer,
    clients: clientsReducer
    
})

export type rootState = ReturnType<typeof rootReducer>