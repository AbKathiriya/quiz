import React, { Component } from 'react';
import './App.css';
import Home from './home/Home';
import ThumbnailList from './thumbnail/ThumbnailList';
import Thumbnail_data from './sample_thumbnail.json';
import QuizIntro from './quiz/QuizIntro'
import Quiz_data from './sample_quiz.json';
import Quiz from './quiz/Quiz'

class App extends Component {
  render() {
    return (
      <div className="app container">
        <Home />
        <ThumbnailList data={Thumbnail_data.quiz_iq} title='IQ Quizzes'/>
        <ThumbnailList data={Thumbnail_data.quiz_personality} title='Personality Quizzes'/>
        <QuizIntro quizDescription={Quiz_data.quiz_description} />
        <Quiz questionsList={Quiz_data.questions_list} />
      </div>
    );
  }
}

export default App;
