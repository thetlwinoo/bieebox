import { Action } from '@ngrx/store';
import { StockItem } from '@box/models';

export enum StockItemActionTypes {
    Search = '[StockItem] Search',
    SearchComplete = '[StockItem] Search Complete',
    SearchError = '[StockItem] Search Error',
    Load = '[StockItem] Load',
    Select = '[StockItem] Select',
}

export class Search implements Action {
    readonly type = StockItemActionTypes.Search;

    constructor(public payload: any) { }
}

export class SearchComplete implements Action {
    readonly type = StockItemActionTypes.SearchComplete;

    constructor(public payload: any) { }
}

export class SearchError implements Action {
    readonly type = StockItemActionTypes.SearchError;

    constructor(public payload: string) { }
}

export class Load implements Action {
    readonly type = StockItemActionTypes.Load;

    constructor(public payload: StockItem) { }
}

export class Select implements Action {
    readonly type = StockItemActionTypes.Select;

    constructor(public payload: string) { }
}

export type StockItemActionsUnion =
    | Search
    | SearchComplete
    | SearchError
    | Load
    | Select;

