import React, { Component } from 'react';
import './Quiz.css';
import { PageHeader, Button } from 'react-bootstrap';

class QuizIntro extends Component {
  render() {
    return (
      <div className="quizIntro">
        <PageHeader className="quizTitle">
          {this.props.quizDescription.quiz_title}
        </PageHeader>
        <div className="quizDescription">
          {this.props.quizDescription.quiz_text}
        </div>
        <div>
          <Button
            bsStyle="success"
            bsSize="large"
          >START
          </Button>
        </div>
      </div>
    );
  }
}

export default QuizIntro;
