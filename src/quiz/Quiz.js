import React, { Component } from 'react';
import { Redirect } from 'react-router';
import './Quiz.css';
import Question from './Question';

class Quiz extends Component {
  constructor(props){
    super(props);
    console.log(this.props.location.state.questionsList)
    this.setCorrectAnswer = this.setCorrectAnswer.bind(this);
    this.onClickHandler = this.onClickHandler.bind(this);

    this.questionsList = this.props.location.state.questionsList;
    this.resultList = this.props.location.state.resultList;
    this.state = {
      questionIndex:0,
      score:0,
      totalQuestions:this.questionsList.length,
      correctAns: '',
    };
  }

  componentDidMount(){
      this.setCorrectAnswer();
  }

  setCorrectAnswer(){
    let ansList = this.questionsList[this.state.questionIndex].answers_list;
    for(var i=0;i<ansList.length;i++){
      if(ansList[i].correct_answer === 1){
        this.setState({ correctAns: ansList[i].answer_text});
        break;
      }
    }
  }

  async onClickHandler(selectedAns) {
    await this.setCorrectAnswer();
    console.log(selectedAns, this.state.correctAns)
    if(selectedAns === this.state.correctAns){
      this.setState({score:this.state.score+1});
    }
    this.setState({
      questionIndex: this.state.questionIndex+1,
    })
  }

  calculateResult(){
      let percent = (this.state.score*100)/this.state.totalQuestions;
      let buckets = 100/this.resultList.length;
      let resultIndex = parseInt(percent/buckets, 10)-1;
      let resultValue = this.resultList[resultIndex];
      return resultValue;
  }

  render() {
    if(this.state.questionIndex < this.state.totalQuestions){
        return (
          <div>
            <Question
            question={this.questionsList[this.state.questionIndex]}
            onClickHandler={this.onClickHandler}
            />
          </div>
        );
    }else{
            let result = this.calculateResult();
            let score = this.state.score + "/" + this.state.totalQuestions;
            // return <QuizResult result={ result } score={score} />
            return <Redirect to={{
                pathname: '/quiz/result',
                state: {result, score}
            }} />
        }
  }
}

export default Quiz;
