import { actionTypes } from "../actions";
import successReducer from "./successReducer";

test("should return false as the default state", () => {
  const newState = successReducer(undefined, {});
  expect(newState).toBe(false);
});

test("should return true when the CORRECT_GUESS action type is passed", () => {
  const newState = successReducer(undefined, {
    type: actionTypes.CORRECT_GUESS
  });
  expect(newState).toBe(true);
});
