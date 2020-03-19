import checkPropTypes from "check-prop-types";
import { createStore, applyMiddleware } from "redux";
import { middlewares } from "../src/createStore";
import rootReducer from "../src/reducers";

export const storeFactory = initialState => {
  const createStoreWithMiddlewares = applyMiddleware(...middlewares)(
    createStore
  );
  return createStoreWithMiddlewares(rootReducer, initialState);
};

export const findByTestAttr = (wrapper, val) => {
  return wrapper.find(`[data-test='${val}']`);
};

export const checkProps = (component, expectedProps) => {
  const result = checkPropTypes(
    component.propTypes,
    expectedProps,
    "prop",
    component.name
  );

  expect(result).toBeUndefined();
};
