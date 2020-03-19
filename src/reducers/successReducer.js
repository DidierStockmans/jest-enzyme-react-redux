import { actionTypes } from "../actions";

/**
 * SuccessReducer
 * @function
 * @param {Object} state
 * @param {Object} action
 * @returns {boolean}
 */
export default (state = false, action) => {
  switch (action.type) {
    case actionTypes.CORRECT_GUESS:
      return true;
    default:
      return state;
  }
};
