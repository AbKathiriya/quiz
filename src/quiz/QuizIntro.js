import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Quiz.css';
import Quiz_data from '../sample_quiz.json';
import { PageHeader, Button, Glyphicon, ButtonGroup } from 'react-bootstrap';

class QuizIntro extends Component {

  render() {
      if(!this.props.location.state.id){
          return '';
      }else{
        let quizId = this.props.location.state.id;
        let quizType = this.props.location.state.type;
        let quizInfo = Object.values(Quiz_data).filter((value) => {return value.quiz_description.quiz_id === quizId})
        if(quizInfo.length){
            return (
              <div className="quizIntro">
                <div className="divHome">
                  <Link to={{ pathname: '/' }}>
                    <ButtonGroup>
                      <Button bsStyle="primary" bsSize="large">
                          <Glyphicon glyph="home" />
                      </Button>
                    </ButtonGroup>
                  </Link>
                </div>
                <PageHeader className="quizTitle">
                { quizInfo[0].quiz_description.quiz_title }
                </PageHeader>
                <div className="quizDescription" dangerouslySetInnerHTML={{__html: quizInfo[0].quiz_description.quiz_text}}>
                </div>
                <Link to={{
                    pathname: '/quiz/questions',
                    state: {
                        questionsList: quizInfo[0].questions_list,
                        resultList : quizInfo[0].results,
                        quizType,
                        quizId
                    }
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
