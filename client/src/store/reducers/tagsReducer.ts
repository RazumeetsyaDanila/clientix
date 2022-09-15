import { TagsInitialState } from '../initialState';
import { ITagsAction, TagsActionTypes, ITagsState } from '../../types/tagsTypes';

export const TagsReducer = (state = TagsInitialState, action: ITagsAction): ITagsState => {
    switch (action.type){
        case TagsActionTypes.FETCH_TAGS:
            return {...state, loading: true}
        case TagsActionTypes.FETCH_TAGS_SUCCESS:
            return {...state, loading: false, tags: action.payload}
        case TagsActionTypes.FETCH_TAGS_ERROR:
            return {...state, loading: false, error: action.payload}
        default:
            return state
    }
}