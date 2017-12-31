import React, { Component } from 'react';
import './Quiz.css';
import { PageHeader } from 'react-bootstrap';

class QuizResult extends Component {
  render() {
    let result = this.props.location.state.result;
    let score = this.props.location.state.score;
    return (
      <div className="quizIntro">
        <PageHeader className="quizTitle">
          {score}
        </PageHeader>
        <div className="quizDescription" dangerouslySetInnerHTML={{__html: result}}>
        </div>
      </div>
    );
  }
}

export default QuizResult;
