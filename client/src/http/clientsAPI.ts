import {$authHost} from "./index";

export const org_add = async (org_name: string, anydesk: string, sql_name: string, rdp: string, sa_password: string, mongo_db: string, egisz: string, simed_admin_pass: string) => {
    const {data} = await $authHost.post('api/user/add_org', {org_name, anydesk, sql_name, rdp, sa_password, mongo_db, egisz, simed_admin_pass})
    return ("Клиент добавлен!")
}