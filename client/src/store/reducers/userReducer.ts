import { UserInitialState } from '../initialState';
import { IUserAction, IUserState, UserActionTypes } from '../../types/userTypes';

export const userReducer = (state = UserInitialState, action: IUserAction): IUserState => {
    switch(action.type){
        case UserActionTypes.SET_USER:
            return {isAuth: true, login: action.payload.login, role: action.payload.role} 
        case UserActionTypes.UNSET_USER:
            return {isAuth: false, login: '', role: ''}
        default:
            return state
    }
}