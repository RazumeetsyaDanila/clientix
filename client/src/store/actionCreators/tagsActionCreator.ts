import { Dispatch } from "react"
import { $authHost } from "../../http"
import { ITagsAction, TagsActionTypes } from '../../types/tagsTypes';


export const fetchTags = () => {
    return async (dispatch: Dispatch<ITagsAction>) => {
        try {
            dispatch({ type: TagsActionTypes.FETCH_TAGS })
            const { data } = await $authHost.get('api/user/get_tags')
            dispatch({ type: TagsActionTypes.FETCH_TAGS_SUCCESS, payload: data })
        } catch (e) {
            dispatch({ type: TagsActionTypes.FETCH_TAGS_ERROR, payload: 'Ошибка при загрузке списка тегов!' })
        }
    }
}

export const fetchTagsGroups = () => {
    return async (dispatch: Dispatch<ITagsAction>) => {
        try {
            dispatch({ type: TagsActionTypes.FETCH_TAGS_GROUPS })
            const { data } = await $authHost.get('api/user/get_tags_groups')
            dispatch({ type: TagsActionTypes.FETCH_TAGS_GROUPS_SUCCESS, payload: data })
        } catch (e) {
            dispatch({ type: TagsActionTypes.FETCH_TAGS_GROUPS_ERROR, payload: 'Ошибка при загрузке списка групп тегов!' })
        }
    }
}