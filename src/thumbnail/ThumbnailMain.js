import React, { Component } from 'react';
import ThumbnailList from './ThumbnailList';
import Thumbnail_data from '../sample_thumbnail.json';

export default class ThumbnailMain extends Component {
    render(){
        return(
            <div>
                <ThumbnailList data={Thumbnail_data.quiz_iq} title='IQ Quizzes' type='quiz_iq'/>
                <ThumbnailList data={Thumbnail_data.quiz_personality} title='Personality Quizzes' type='quiz_personality'/>
            </div>
        )
    }
}
