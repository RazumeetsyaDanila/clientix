export interface IClientsState {
    clients: any[];
    loading: boolean;
    error: null | string;
}

export enum ClientsActionTypes {
    FETCH_CLIENTS = 'FETCH_CLIENTS',
    FETCH_CLIENTS_SUCCESS = 'FETCH_CLIENTS_SUCCESS',
    FETCH_CLIENTS_ERROR = 'FETCH_CLIENTS_ERROR'
}

interface IFetchClientsAction {
    type: ClientsActionTypes.FETCH_CLIENTS;
}

interface IFetchClientsSuccessAction {
    type: ClientsActionTypes.FETCH_CLIENTS_SUCCESS;
    payload: any[];
}

interface IFetchClientsErrorAction {
    type: ClientsActionTypes.FETCH_CLIENTS_ERROR;
    payload: string;
}

export type IClientsAction = IFetchClientsAction | IFetchClientsSuccessAction | IFetchClientsErrorAction 