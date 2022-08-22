import { Dispatch } from "react"
import { $authHost } from "../../http"
import { IClientsAction, ClientsActionTypes } from '../../types/clientsTypes';


export const fetchClients = () => {
    return async (dispatch: Dispatch<IClientsAction>) => {
        try {
            dispatch({ type: ClientsActionTypes.FETCH_CLIENTS })
            const { data } = await $authHost.get('api/admin/get_clients')
            dispatch({ type: ClientsActionTypes.FETCH_CLIENTS_SUCCESS, payload: data })
        } catch (e) {
            dispatch({ type: ClientsActionTypes.FETCH_CLIENTS_ERROR, payload: 'Ошибка при загрузке списка организаций!' })
        }
    }
}