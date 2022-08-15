import { UsersInitialState } from '../initialState';
import { IUsersAction, UsersActionTypes, IUsersState } from '../../types/usersTypes';


export const usersReducer = (state = UsersInitialState, action: IUsersAction): IUsersState => {
    switch (action.type){
        case UsersActionTypes.FETCH_USERS:
            return {...state, loading: true}
        case UsersActionTypes.FETCH_USERS_SUCCESS:
            return {...state, loading: false, users: action.payload}
        case UsersActionTypes.FETCH_USERS_ERROR:
            return {...state, loading: false, error: action.payload}
        default:
            return state
    }
}