import React from "react";
import { shallow } from "enzyme";
import { storeFactory, findByTestAttr } from "../test/testUtils";
import App, { UnconnectedApp } from "./App";

/**
 * Create a shallow wrapper
 * @param {object} props Component props
 * @param {object} state Component state
 * @returns {ShallowWrapper}
 */
const setup = (initialState = {}) => {
  const store = storeFactory(initialState);
  const wrapper = shallow(<App store={store} />)
    .dive()
    .dive();

  return wrapper;
};

test("renders without errors", () => {
  const wrapper = setup();
  const appComponent = findByTestAttr(wrapper, "component-app");
  expect(appComponent.length).toBe(1);
});

describe("Redux state", () => {
  test("should pass `success` from state to props", () => {
    const success = true;
    const wrapper = setup({ success });
    const successProp = wrapper.instance().props.success;
    expect(successProp).toBe(success);
  });
  test("should pass `secretWord` from state to props", () => {
    const secretWord = "party";
    const wrapper = setup({ secretWord });
    const secretWordProp = wrapper.instance().props.secretWord;
    expect(secretWordProp).toEqual(secretWord);
  });
  test("should pass `guessedWords` from state to props", () => {
    const guessedWords = [{ guessedWord: "train", letterMatchCount: 3 }];
    const wrapper = setup({ guessedWords });
    const guessedWordsProp = wrapper.instance().props.guessedWords;
    expect(guessedWordsProp).toEqual(guessedWords);
  });
  test("should pass `getSecretWord` function to props", () => {
    const wrapper = setup();
    const getSecretWordProp = wrapper.instance().props.getSecretWord;
    expect(getSecretWordProp).toBeInstanceOf(Function);
  });
});

test("componentDidMount should run getSecretWord action creator", () => {
  const getSecretWordMock = jest.fn();

  const props = {
    success: false,
    guessedWords: [],
    getSecretWord: getSecretWordMock
  };

  const wrapper = shallow(<UnconnectedApp {...props} />);

  wrapper.instance().componentDidMount();

  const getSecretWordMockCount = getSecretWordMock.mock.calls.length;

  expect(getSecretWordMockCount).toBe(1);
});
