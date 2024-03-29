import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";

export const registration = async (login: string, password: string, role: string) => {
    const {data} = await $authHost.post('api/admin/registration', {login, password, role})
    return ("Пользователь добавлен!")
}

export const loginf = async (login: string, password: string) => {
    const {data} = await $host.post('api/user/login', {login, password})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const check = async () => {
    const {data} = await $authHost.get('api/user/auth' )
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}