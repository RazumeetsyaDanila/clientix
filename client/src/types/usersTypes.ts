export interface IUsersState {
    users: any[];
    loading: boolean;
    error: null | string;
}

export enum UsersActionTypes {
    FETCH_USERS = 'FETCH_USERS',
    FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS',
    FETCH_USERS_ERROR = 'FETCH_USERS_ERROR'
}

interface IFetchUsersAction {
    type: UsersActionTypes.FETCH_USERS;
}

interface IFetchUsersSuccessAction {
    type: UsersActionTypes.FETCH_USERS_SUCCESS;
    payload: any[];
}

interface IFetchUsersErrorAction {
    type: UsersActionTypes.FETCH_USERS_ERROR;
    payload: string;
}


export type IUsersAction = IFetchUsersAction | IFetchUsersSuccessAction | IFetchUsersErrorAction