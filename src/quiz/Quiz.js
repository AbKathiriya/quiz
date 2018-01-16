import React, { Component } from 'react';
import { Redirect } from 'react-router';
//import { ProgressBar } from 'react-bootstrap';
import './Quiz.css';
import Question from './Question';

class Quiz extends Component {
  constructor(props){
    super(props);
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
      resultIndex = resultIndex === -1 ? 0 : resultIndex;
      let resultValue = this.resultList[resultIndex];
      return resultValue;
  }

  render() {
    let visited = [];
    for(var i=0;i<this.state.questionIndex;i++){
        visited.push(<div className="circle visited"></div>);
    }
    let active=[];
    for(i=this.state.questionIndex;i<this.state.totalQuestions;i++){
        active.push(<div className="circle active"></div>);
    }
    if(this.state.questionIndex < this.state.totalQuestions){
        return (
            <div className="questionMain">
                <div className="progressBar">
                    {visited}{active}
                </div>
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
                state: {
                    result,
                    score,
                    quizId: this.props.location.state.quizId,
                    quizType: this.props.location.state.quizType
                }
            }} />
        }
  }
}

export default Quiz;
//let progress = parseInt(((this.state.questionIndex)/this.state.totalQuestions)*100, 10)
//<div style={{ padding: 20 }}>
//    <h5>{this.state.questionIndex} out of {this.state.totalQuestions} questions answered !!</h5>
//    <ProgressBar active now={ progress } />
//</div>
