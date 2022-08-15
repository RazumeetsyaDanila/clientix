import { Dispatch } from "react"
import { $authHost } from "../../http"
import { IUsersAction, UsersActionTypes } from '../../types/usersTypes';


export const fetchUsers = () => {
    return async (dispatch: Dispatch<IUsersAction>) => {
        try {
            dispatch({ type: UsersActionTypes.FETCH_USERS })
            const { data } = await $authHost.get('api/admin/users')
            dispatch({ type: UsersActionTypes.FETCH_USERS_SUCCESS, payload: data })


        } catch (e) {
            dispatch({ type: UsersActionTypes.FETCH_USERS_ERROR, payload: 'Ошибка при загрузке списка пользователей!' })
        }
    }
}