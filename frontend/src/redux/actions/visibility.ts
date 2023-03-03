import { SelectVisibilityAction } from "../../types";

export enum VisibilityActionTypes {
  SET_VISIBILITY = "SET_VISIBILITY",
  CLEAR_VISIBILITY = "CLEAR_VISIBILITY",
}

export const setVisibility = (visibility: string): SelectVisibilityAction => ({
  type: VisibilityActionTypes.SET_VISIBILITY,
  payload: visibility,
});

export const clearVisibility = (): SelectVisibilityAction => ({
  type: VisibilityActionTypes.CLEAR_VISIBILITY,
});
