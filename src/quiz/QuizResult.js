import React, { Component } from 'react';
import './Quiz.css';
import { Link } from 'react-router-dom';
import { PageHeader, Button, Glyphicon, ButtonGroup } from 'react-bootstrap';
import ThumbnailList from '../thumbnail/ThumbnailList';
import Thumbnail_data from '../sample_thumbnail.json';

class QuizResult extends Component {

  constructor(props) {
      super(props)
      this.quizId = this.props.location.state.quizId;
      this.quizType = this.props.location.state.quizType;
  }

  moreQuizList(){

    if(this.quizType === 'quiz_iq'){
        let data = Thumbnail_data.quiz_iq.filter((obj) => obj.quiz_id !== this.quizId);
        return <ThumbnailList data={data} title='More IQ Quizzes' type='quiz_iq'/>
    } else {
        let data = Thumbnail_data.quiz_personality.filter((obj, quizId) => {return obj.quiz_id === this.quizId});
        return <ThumbnailList data={data} title='Personality Quizzes' type='quiz_personality'/>
    }
  }

  render() {
    let result = this.props.location.state.result;
    let score = this.props.location.state.score;
    return (
        <div>
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
              {score}
            </PageHeader>
            <div className="quizDescription" dangerouslySetInnerHTML={{__html: result}}>
            </div>
            <div>
                <Link to={{
                    pathname: '/quiz',
                    state: {
                        id:this.quizId,
                        type:this.quizType
                    }
                    }}>
                    <Button bsStyle="success" bsSize="large" className="btnTryAgain" >
                        <span className="glyphicon glyphicon-repeat" aria-hidden="true"></span>
                        Try Again
                    </Button>
                </Link>
            </div>
          </div>
          <div className="thumbnailMain">
            { this.moreQuizList() }
          </div>
        </div>
    );
  }
}

export default QuizResult;
