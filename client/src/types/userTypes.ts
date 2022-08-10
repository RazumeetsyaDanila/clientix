export interface IUserState {
    login: string,
    role: string,
    isAuth: boolean
}

export enum UserActionTypes {
    SET_USER = 'SET_USER',
    UNSET_USER = 'UNSET_USER'
}

interface ISetUserAction {
    type: UserActionTypes.SET_USER,
    payload: {login: string, role: string}
}

interface IUnsetUser {
    type: UserActionTypes.UNSET_USER
}

export type IUserAction = ISetUserAction | IUnsetUser