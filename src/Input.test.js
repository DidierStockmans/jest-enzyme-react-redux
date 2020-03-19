import React from "react";
import { shallow } from "enzyme";
import { findByTestAttr, storeFactory } from "../test/testUtils";
import Input, { UnconnectedInput } from "./Input";

/**
 * Set up function for the Input component
 * @function
 * @param {Objects} props
 * @returns {ShallowWrapper}
 */
const setup = (initialState = {}) => {
  const store = storeFactory(initialState);
  const wrapper = shallow(<Input store={store} />)
    .dive()
    .dive();
  return wrapper;
};

describe("render", () => {
  describe("if word is not guessed", () => {
    let wrapper;
    beforeEach(() => {
      const initialState = { success: false };
      wrapper = setup(initialState);
    });
    test("should render without errors", () => {
      const component = findByTestAttr(wrapper, "input-component");
      expect(component.length).toBe(1);
    });
    test("should render the input field", () => {
      const inputBox = findByTestAttr(wrapper, "input-box");
      expect(inputBox.length).toBe(1);
    });
    test("should render the submit button", () => {
      const submitBtn = findByTestAttr(wrapper, "submit-button");
      expect(submitBtn.length).toBe(1);
    });
  });
  describe("if word is guessed", () => {
    let wrapper;
    beforeEach(() => {
      const initialState = { success: true };
      wrapper = setup(initialState);
    });
    test("should render without errors", () => {
      const component = findByTestAttr(wrapper, "input-component");
      expect(component.length).toBe(1);
    });
    test("should not render the input field", () => {
      const inputBox = findByTestAttr(wrapper, "input-box");
      expect(inputBox.length).toBe(0);
    });
    test("should not render the submit button", () => {
      const submitBtn = findByTestAttr(wrapper, "submit-button");
      expect(submitBtn.length).toBe(0);
    });
  });
});

describe("update state", () => {
  test("should pass the state of `success` as a prop", () => {
    const success = true;
    const wrapper = setup({ success });
    const successProp = wrapper.instance().props.success;
    expect(successProp).toBe(success);
  });
  test("should pass the guessword function as a prop", () => {
    const wrapper = setup();
    const guessWordProp = wrapper.instance().props.guessWord;
    expect(guessWordProp).toBeInstanceOf(Function);
  });
});

describe('`guessWord` action creator test', () => {
  let guessWordMockFunc;
  let wrapper;
  const currentGuess = 'train'
  beforeEach(() => {
    // create mock function
    guessWordMockFunc = jest.fn();
    // wrapper for the unconnected input component
    wrapper = shallow(<UnconnectedInput guessWord={guessWordMockFunc} />);
    // set state of controlled field
    wrapper.setState({ currentGuess });
    // find submit btn
    const submitBtn = findByTestAttr(wrapper, "submit-button");
    // simulate on click
    submitBtn.simulate('click', { preventDefault() { } });
  });
  test("should trigger the guessword function on click once", () => {
    // get count
    const guessWordMockFuncCount = guessWordMockFunc.mock.calls.length;
    // assert count
    expect(guessWordMockFuncCount).toBe(1);
  });
  test("test if the controlled field value `currentGuess` is used in the `guessWord` function", () => {
    // get count
    const guessWordMockFuncArg = guessWordMockFunc.mock.calls[0][0];
    // assert count
    expect(guessWordMockFuncArg).toEqual(currentGuess);
  });
  test('`currentGuess` state should be an empty string', () => {
    const currentGuess = wrapper.state('currentGuess');
    expect(currentGuess).toBe('');
  });
});
