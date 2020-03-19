import React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import { findByTestAttr, checkProps } from "../test/testUtils";
import GuessedWords from "./GuessedWords";

const defaultProps = {
  guessedWords: [{ guessedWord: "funky", letterMatchCount: 5 }]
};

/**
 * Set up function that returns a shallow wrapper from enzyme with props
 * @function
 * @param {Object} props - React props
 * @returns {ShallowWrapper} - ShallowWrapper from enzyme
 */
const setup = (props = {}) => {
  const setupProps = { ...defaultProps, ...props };
  return shallow(<GuessedWords {...setupProps} />);
};

test("does not throw warning when prop types are wrong", () => {
  checkProps(GuessedWords, defaultProps);
});

describe("when no words are guessed", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = setup({ guessedWords: [] });
  });

  test("should render without errors", () => {
    const component = findByTestAttr(wrapper, "guessed-words-component");
    expect(component.length).toBe(1);
  });
  test("should show instruction message", () => {
    const message = findByTestAttr(wrapper, "instruction-message");
    expect(message.text().length).not.toBe(0);
  });
});

describe("when words are guessed", () => {
  let wrapper;
  const guessedWords = [
    { word: "train", letterMatchCount: 3 },
    { word: "agile", letterMatchCount: 1 },
    { word: "party", letterMatchCount: 5 }
  ];
  beforeEach(() => {
    wrapper = setup({ guessedWords });
  });

  test("should render without errors", () => {
    const component = findByTestAttr(wrapper, "guessed-words-component");
    expect(component.length).toBe(1);
  });

  test("should render the guessed words overview", () => {
    const node = findByTestAttr(wrapper, "guessed-words");
    expect(node.length).toBe(1);
  });

  test("guessed words overview should contain the same count of nodes as the `guessedWords` count", () => {
    const nodes = findByTestAttr(wrapper, "guessed-word");
    expect(nodes.length).toBe(guessedWords.length);
  });
});
