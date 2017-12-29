import React, { Component } from 'react';
import './Quiz.css';
import Question from './Question';

class Quiz extends Component {
  constructor(props){
    super(props);

    this.setCorrectAnswer = this.setCorrectAnswer.bind(this);
    this.onClickHandler = this.onClickHandler.bind(this);

    this.state = {
      questionIndex:0,
      score:0,
      totalQuestions:this.props.questionsList.length,
      correctAns: '',
      selectedAns: ''
    };

    //setCorrectAnswer();
  }

  setCorrectAnswer(){
    let ansList = this.props.questionsList[this.state.questionIndex].answers_list;
    for(var i=0;i<ansList.length;i++){
      if(ansList[i].correct_answer === 1){
        this.setState({ correctAns: ansList[i].answer_text});
        break;
      }
    }
  }

  onClickHandler(value) {
    setCorrectAnswer();
    if(value === this.state.correctAns){
      this.setState({score:score+1});
    }
    this.setState({
      questionIndex: this.state.questionIndex+1,
      selectedAns: value
    })
  }


  render() {
    return (
      <div>
        <Question
        question={this.props.questionsList[this.state.questionIndex]}
        onClickHandler={this.onClickHandler}
        />
      </div>
    );
  }
}

export default Quiz;
