import { Action } from '@ngrx/store';

export enum KeywordActionTypes {
    Search = '[Keyword] Search',
    SearchComplete = '[Keyword] Search Complete',
    SearchError = '[Keyword] Search Error',
    Load = '[Keyword] Load',
    Select = '[Keyword] Select',
}

export class Search implements Action {
    readonly type = KeywordActionTypes.Search;

    constructor(public payload: any) { }
}

export class SearchComplete implements Action {
    readonly type = KeywordActionTypes.SearchComplete;

    constructor(public payload: String[]) { }
}

export class SearchError implements Action {
    readonly type = KeywordActionTypes.SearchError;

    constructor(public payload: string) { }
}

export class Load implements Action {
    readonly type = KeywordActionTypes.Load;

    constructor(public payload: String) { }
}

export class Select implements Action {
    readonly type = KeywordActionTypes.Select;

    constructor(public payload: string) { }
}

export type KeywordActionsUnion =
    | Search
    | SearchComplete
    | SearchError
    | Load
    | Select;

