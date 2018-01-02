import React, { Component } from 'react';
import './Quiz.css';
import { PageHeader } from 'react-bootstrap';
import ThumbnailList from '../thumbnail/ThumbnailList';
import Thumbnail_data from '../sample_thumbnail.json';

class QuizResult extends Component {

  moreQuizList(){
    let quizId = this.props.location.state.quizId;
    let quizType = this.props.location.state.quizType;
    if(quizType === 'quiz_iq'){
        let data = Thumbnail_data.quiz_iq.filter((obj, quizId) => {return obj.quiz_id === quizId});
        return <ThumbnailList data={data} title='More IQ Quizzes' type='quiz_iq'/>
    } else {
        let data = Thumbnail_data.quiz_personality.filter((obj, quizId) => {return obj.quiz_id === quizId});
        return <ThumbnailList data={Thumbnail_data.quiz_personality} title='Personality Quizzes' type='quiz_personality'/>
    }
  }

  render() {
    let result = this.props.location.state.result;
    let score = this.props.location.state.score;
    return (
        <div>
          <div className="quizIntro">
            <PageHeader className="quizTitle">
              {score}
            </PageHeader>
            <div className="quizDescription" dangerouslySetInnerHTML={{__html: result}}></div>
          </div>
          { this.moreQuizList() }
        </div>
    );
  }
}

export default QuizResult;
