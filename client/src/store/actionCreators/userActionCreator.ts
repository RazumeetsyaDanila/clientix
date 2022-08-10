import { Dispatch } from "react"
import { UserActionTypes, IUserAction } from '../../types/userTypes';

export const setUser = (login: string, role: string) => {
    return (dispatch: Dispatch<IUserAction>) => {
        try{
            dispatch({ type: UserActionTypes.SET_USER, payload: {login: login, role: role}})
        } catch (e){
            console.log("ba");
        }        
    }
}

export const unsetUser = () => {
    return (dispatch: Dispatch<IUserAction>) => {
        dispatch({ type: UserActionTypes.UNSET_USER})
    }
}