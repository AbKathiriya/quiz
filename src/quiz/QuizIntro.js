import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Quiz.css';
import Quiz_data from '../sample_quiz.json';
import { PageHeader, Button } from 'react-bootstrap';

class QuizIntro extends Component {

  render() {
      if(!this.props.location.state.id){
          return '';
      }else{
        let quizId = this.props.location.state.id;
        let quizInfo = Object.values(Quiz_data).filter((value) => {return value.quiz_description.quiz_id === quizId})
        if(quizInfo.length){
            return (
              <div className="quizIntro">
                <PageHeader className="quizTitle">
                  {quizInfo[0].quiz_description.quiz_title}
                </PageHeader>
                <div className="quizDescription">
                  {quizInfo[0].quiz_description.quiz_text}
                </div>
                <Link to={{
                    pathname: '/quiz/questions',
                    state: {questionsList: quizInfo[0].questions_list, resultList : quizInfo[0].results }
                }}>
                <div>
                  <Button
                    bsStyle="success"
                    bsSize="large"
                  >START
                  </Button>
                </div>
                </Link>
              </div>
            );
        } else {
            return 'No quiz found...';
        }
    }
  }
}

export default QuizIntro;
