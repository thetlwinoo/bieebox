import { Action } from '@ngrx/store';
import { Address } from '@box/models';

export enum AddressActionTypes {
    Load = '[Address] Load',
    LoadComplete = '[Address] Load Complete',
    LoadError = '[Address] Load Error',
    Create = '[Address] Create',
    CreateSuccess = '[Address] Create Success',
    Update = '[Address] Update',
    UpdateSuccess = '[Address] Update Success',
    // UpdateMany = '[Address] Update Many',
    // UpdateManySuccess = '[Address] Update Many Success',
    Remove = '[Address] Remove',
    RemoveSuccess = '[Address] Remove Success',
    SetDefault = '[Address] Set Default',
    SetDefaultSuccess = '[Address] Set Default Success',
    AddressError = '[Address] Error Handler',
}

export class Load implements Action {
    readonly type = AddressActionTypes.Load;

    constructor(public payload: any) { }
}

export class LoadComplete implements Action {
    readonly type = AddressActionTypes.LoadComplete;

    constructor(public payload: Address[]) { }
}

export class LoadError implements Action {
    readonly type = AddressActionTypes.LoadError;

    constructor(public payload: string) { }
}

export class Create implements Action {
    readonly type = AddressActionTypes.Create;

    constructor(public payload: Address) { }
}

export class CreateSuccess implements Action {
    readonly type = AddressActionTypes.CreateSuccess;

    constructor(public payload: any) { }
}

export class Update implements Action {
    readonly type = AddressActionTypes.Update;

    constructor(public payload: Address) { }
}

export class UpdateSuccess implements Action {
    readonly type = AddressActionTypes.UpdateSuccess;

    constructor(public payload: any) { }
}

// export class UpdateMany implements Action {
//     readonly type = AddressActionTypes.UpdateMany;

//     constructor(public payload: Address) { }
// }

// export class UpdateManySuccess implements Action {
//     readonly type = AddressActionTypes.UpdateManySuccess;

//     constructor(public payload: any) { }
// }

export class Remove implements Action {
    readonly type = AddressActionTypes.Remove;

    constructor(public payload: Address) { }
}

export class RemoveSuccess implements Action {
    readonly type = AddressActionTypes.RemoveSuccess;

    constructor(public payload: any) { }
}

export class AddressError implements Action {
    readonly type = AddressActionTypes.AddressError;

    constructor(public payload: any) { }
}

export type AddressActionsUnion =
    | Load
    | LoadComplete
    | LoadError
    | Create
    | CreateSuccess
    | Update
    | UpdateSuccess
    // | UpdateMany
    // | UpdateManySuccess
    | Remove
    | RemoveSuccess
    | AddressError;
