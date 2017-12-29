import React, { Component } from 'react';
import './Quiz.css';
import { Row, Col, Well } from 'react-bootstrap';

class AnswerListItem extends Component {
  constructor(props){
    super(props);

    this.onClickHandler = this.onClickHandler.bind(this);
  }

  onClickHandler(e) {
      this.props.onClickHandler(e.target.dataset.message);
  }

  render() {
    let image = this.props.answer.answer_img === "" ? "" : <img src={this.props.answer.answer_img} alt="" />
    return (
      <Row onClick={this.onClickHandler} data-message={this.props.answer.answer_text}>
        <Col xs={12} md={12}>
          <Well bsSize="small" className="answer">
            <div name="answer_text">
              {this.props.answer.answer_text}
            </div>
            <div>
              {image}
            </div>
          </Well>
        </Col>
      </Row>
    );
  }
}

export default AnswerListItem;
