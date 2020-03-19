import React from "react";
import PropTypes from "prop-types";

const GuessedWords = ({ guessedWords }) => {
  return (
    <div data-test="guessed-words-component">
      {guessedWords.length === 0 && (
        <span data-test="instruction-message">Guess the secret word!</span>
      )}
      {guessedWords.length > 0 && (
        <div data-test="guessed-words">
          <table className="table table-sm">
            <thead className="thead-light">
              <tr>
                <th>guess</th>
                <th>matching letters</th>
              </tr>
            </thead>
            <tbody>
              {guessedWords.map(({ guessedWord, letterMatchCount }, index) => (
                <tr data-test="guessed-word" key={index}>
                  <td>{guessedWord}</td>
                  <td>{letterMatchCount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

GuessedWords.propTypes = {
  guessedWords: PropTypes.arrayOf(
    PropTypes.shape({
      letterMatchCount: PropTypes.number,
      guessedWord: PropTypes.string
    })
  ).isRequired
};

export default GuessedWords;
