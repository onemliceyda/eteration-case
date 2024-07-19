import { ActionTypes } from "../constants/action-types";

const initialProductState = {
  products: [],
};

export const productReducer = (
  state = initialProductState,
  { type, payload }
) => {
  switch (type) {
    case ActionTypes.SET_PRODUCTS:
      return state;

    default:
      break;
  }
};
