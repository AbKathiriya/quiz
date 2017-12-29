import React, { Component } from 'react';
import './Thumbnail.css';

class Thumbnail extends Component {
  render() {
    return (
      <div>
        <div>
          <img src={this.props.quizImage} className="thumbnail-image" alt="quiz_image" />
        </div>
        <div className="thumbnail-title">
          {this.props.quizTitle}
        </div>
      </div>
    );
  }
}

export default Thumbnail;
