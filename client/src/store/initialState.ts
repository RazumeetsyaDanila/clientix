import { IClientsState } from '../types/clientsTypes';
import { IUserState } from '../types/userTypes';


export const UsersInitialState: IClientsState = {
    clients: [],
    loading: false,
    error: null
}

export const UserInitialState: IUserState = {
    login: '',
    role: '',
    isAuth: false
}