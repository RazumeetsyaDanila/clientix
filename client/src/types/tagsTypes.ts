export interface ITagsState {
    tags: any[];
    tagsGroups: any[];
    loading: boolean;
    error: null | string;
}

export enum TagsActionTypes {
    FETCH_TAGS = 'FETCH_TAGS',
    FETCH_TAGS_SUCCESS = 'FETCH_TAGS_SUCCESS',
    FETCH_TAGS_ERROR = 'FETCH_TAGS_ERROR',
    FETCH_TAGS_GROUPS = 'FETCH_TAGS_GROUPS',
    FETCH_TAGS_GROUPS_SUCCESS = 'FETCH_TAGS_GROUPS_SUCCESS',
    FETCH_TAGS_GROUPS_ERROR = 'FETCH_TAGS_GROUPS_ERROR'
}

interface IFetchTagsAction {
    type: TagsActionTypes.FETCH_TAGS;
}

interface IFetchTagsSuccessAction {
    type: TagsActionTypes.FETCH_TAGS_SUCCESS;
    payload: any[];
}

interface IFetchTagsErrorAction {
    type: TagsActionTypes.FETCH_TAGS_ERROR;
    payload: string;
}

interface IFetchTagsGroupsAction {
    type: TagsActionTypes.FETCH_TAGS_GROUPS;
}

interface IFetchTagsGroupsSuccessAction {
    type: TagsActionTypes.FETCH_TAGS_GROUPS_SUCCESS;
    payload: any[];
}

interface IFetchTagsGroupsErrorAction {
    type: TagsActionTypes.FETCH_TAGS_GROUPS_ERROR;
    payload: string;
}

export type ITagsAction = IFetchTagsAction
    | IFetchTagsSuccessAction
    | IFetchTagsErrorAction
    | IFetchTagsGroupsAction
    | IFetchTagsGroupsSuccessAction
    | IFetchTagsGroupsErrorAction