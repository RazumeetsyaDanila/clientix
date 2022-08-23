import { ClientsInitialState } from '../initialState';
import { IClientsAction, ClientsActionTypes, IClientsState } from '../../types/clientsTypes';

export const clientsReducer = (state = ClientsInitialState, action: IClientsAction): IClientsState => {
    switch (action.type){
        case ClientsActionTypes.FETCH_CLIENTS:
            return {...state, loading: true}
        case ClientsActionTypes.FETCH_CLIENTS_SUCCESS:
            return {...state, loading: false, clients: action.payload}
        case ClientsActionTypes.FETCH_CLIENTS_ERROR:
            return {...state, loading: false, error: action.payload}
        default:
            return state
    }
}