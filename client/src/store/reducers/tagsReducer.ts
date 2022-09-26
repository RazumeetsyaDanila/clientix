import { TagsInitialState } from '../initialState';
import { ITagsAction, TagsActionTypes, ITagsState } from '../../types/tagsTypes';

export const tagsReducer = (state = TagsInitialState, action: ITagsAction): ITagsState => {
    switch (action.type){
        case TagsActionTypes.FETCH_TAGS:
            return {...state, loading: true}
        case TagsActionTypes.FETCH_TAGS_SUCCESS:
            return {...state, loading: false, tags: action.payload}
        case TagsActionTypes.FETCH_TAGS_ERROR:
            return {...state, loading: false, error: action.payload}
        case TagsActionTypes.FETCH_TAGS_GROUPS:
            return {...state, loading: true}
        case TagsActionTypes.FETCH_TAGS_GROUPS_SUCCESS:
            return {...state, loading: false, tagsGroups: action.payload}
        case TagsActionTypes.FETCH_TAGS_GROUPS_ERROR:
            return {...state, loading: false, error: action.payload}
        default:
            return state
    }
}