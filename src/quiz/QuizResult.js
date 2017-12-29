import React, { Component } from 'react';
import './Quiz.css';
import { PageHeader, Grid, Row, Col, Button } from 'react-bootstrap';

class QuizResult extends Component {
  render() {
    return (
      <div className="quizIntro">
        <PageHeader className="quizTitle">
          {this.props.result}
        </PageHeader>
        <div className="quizDescription">
          {this.props.data.quiz_text}
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
