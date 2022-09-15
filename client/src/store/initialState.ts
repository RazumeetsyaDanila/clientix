import { IClientsState } from '../types/clientsTypes';
import { IUserState } from '../types/userTypes';
import { IUsersState } from '../types/usersTypes';
import { ITagsState } from '../types/tagsTypes';


export const ClientsInitialState: IClientsState = {
    clients: [],
    loading: false,
    error: null
}

export const UsersInitialState: IUsersState = {
    users: [],
    loading: false,
    error: null
}

export const TagsInitialState: ITagsState = {
    tags: [],
    loading: false,
    error: null
}

export const UserInitialState: IUserState = {
    login: '',
    role: '',
    isAuth: false
}