import React, { Component } from "react";
import { connect } from "react-redux";
import { guessWord } from "./actions";

export class UnconnectedInput extends Component {

  constructor(props) {
    super(props);

    this.state = {
      currentGuess: ''
    }

    this.updateCurrentGuess = this.updateCurrentGuess.bind(this);
    this.submitCurrentGuess = this.submitCurrentGuess.bind(this);
  }

  updateCurrentGuess(e) {
    const value = e.target.value;
    this.setState({ currentGuess: value });
  }

  submitCurrentGuess(e) {
    e.preventDefault();

    const guess = this.state.currentGuess;
    if (guess && guess.length > 0) {
      this.props.guessWord(guess);
      this.setState({ currentGuess: '' })
    }
  }

  render() {
    const contents = this.props.success ? null : (
      <form>
        <input type="text" data-test="input-box" onChange={(e) => this.updateCurrentGuess(e)} />
        <button type="submit" data-test="submit-button" onClick={(e) => this.submitCurrentGuess(e)} >Submit</button>
      </form>
    );
    return <div data-test="input-component">{contents}</div>;
  }
}

const mapStateToProps = ({ success }) => {
  return { success };
};

export default connect(
  mapStateToProps,
  { guessWord }
)(UnconnectedInput);
