import React, { Component } from 'react';
import './Quiz.css';
import {Grid, Row, Col} from 'react-bootstrap';
import AnswerListItem from './Answer'

class Question extends Component {
  render() {

    const answerListItem = this.props.question.answers_list.map(answer => {
      return (
        <AnswerListItem
          answer={answer}
          onClickHandler={this.props.onClickHandler}
        />
      );
    });

    let image = this.props.question.question_img === "" ? "" : <img src={this.props.question.question_img} alt="" />
    return (
      <div>
        <Grid>
          <Row className="question">
            <Col xs={12} md={12}>{this.props.question.question_text}</Col>
          </Row>
          <Row className="question">
            <Col xs={6} md={6}>
              {image}
            </Col>
          </Row>
          {answerListItem}
        </Grid>
      </div>
    );
  }
}

export default Question;
