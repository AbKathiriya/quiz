import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Home from './home/Home';
import QuizIntro from './quiz/QuizIntro'
import Quiz from './quiz/Quiz';
import Result from './quiz/QuizResult'

class App extends Component {
  render() {
    return (
        <BrowserRouter>
            <div className="app container">
                <Switch>
                    <Route exact path='/' component={Home}/>
                    <Route exact path='/quiz' component={QuizIntro}/>
                    <Route path='/quiz/questions' component={Quiz}/>
                    <Route path='/quiz/result' component={Result}/>
                </Switch>
            </div>
      </BrowserRouter>
    );
  }
}

export default App;

// <Route path='/quiz/:id' render={(props) => (<Quiz questionsList={Quiz_data.questions_list} resultList = {Quiz_data.results}/>)}/>
