export enum VisibilityActionTypes {
  SET_VISIBILITY = "SET_VISIBILITY",
  CLEAR_VISIBILITY = "CLEAR_VISIBILITY",
}

interface SetVisibilityAction {
  type: VisibilityActionTypes.SET_VISIBILITY;
  payload: string;
}

interface ClearVisibilityAction {
  type: VisibilityActionTypes.CLEAR_VISIBILITY;
}

export type SelectVisibilityAction =
  | SetVisibilityAction
  | ClearVisibilityAction;

export const setVisibility = (visibility: string): SelectVisibilityAction => ({
  type: VisibilityActionTypes.SET_VISIBILITY,
  payload: visibility,
});

export const clearVisibility = (): SelectVisibilityAction => ({
  type: VisibilityActionTypes.CLEAR_VISIBILITY,
});
