import {$authHost} from "./index";

export const org_add = async (org_name: string, simed_admin_pass: string, remote_access: string,  city: string, comment: string,) => {
    const {data} = await $authHost.post('api/user/add_org', {org_name, simed_admin_pass, remote_access, city, comment})
    return ("Клиент добавлен!")
}

export const org_delete = async (org_id: number) => {
    const {data} = await $authHost.post('api/admin/delete_org', {org_id})
    return ("Уалено!")
}