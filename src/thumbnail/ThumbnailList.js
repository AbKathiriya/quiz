import React, { Component } from 'react';
import { PageHeader, Row, Col, Button } from 'react-bootstrap';
import Thumbnail from './Thumbnail';
import './Thumbnail.css';

class ThumbnailList extends Component {
  constructor(props){
    super(props)
    let load = this.props.data.length < 4? this.props.data.length : 4
    this.state = {load}
  }
  render() {
      let listLen = this.props.data.length
      let rows = []
      let thumbnails = this.props.data;
      for (var i = 0; i < this.state.load; i+=2) {
        if(i+1 < listLen){
          rows.push(
              <Row key={thumbnails[i].quiz_id}>
                <Col xs={6} md={6}>
                  <Thumbnail quizTitle={thumbnails[i].quiz_title} quizImage={thumbnails[i].quiz_image} key={thumbnails[i].quiz_id} id={thumbnails[i].quiz_id} type={this.props.type}/>
                </Col>
                <Col xs={6} md={6}>
                  <Thumbnail quizTitle={thumbnails[i+1].quiz_title} quizImage={thumbnails[i+1].quiz_image} key={thumbnails[i+1].quiz_id} id={thumbnails[i+1].quiz_id} type={this.props.type}/>
                </Col>
              </Row>);
        }else {
          rows.push(
              <Row key={thumbnails[i].quiz_id}>
                <Col xs={6} md={6}>
                  <Thumbnail quizTitle={thumbnails[i].quiz_title} quizImage={thumbnails[i].quiz_image} key={thumbnails[i].quiz_id} id={thumbnails[i].quiz_id} type={this.props.type} />
                </Col>
              </Row>);
        }
      }
      if(listLen > 4 && this.state.load === 4) {
      return (
        <div className="thumbnailList">
          <PageHeader className="quiz-type"><small>{ this.props.title }</small></PageHeader>

            {rows}
            <Row>
              <Col xs={12} md={12}>
                <Button
                  bsStyle="primary"
                  bsSize="large"
                  onClick={() => this.setState({ load: listLen })}
                >Load More Quizzes ({ listLen - 4})
                </Button>
              </Col>
            </Row>
        </div>
      )
    } else {
      return (
        <div className="thumbnailList">
          <PageHeader className="quiz-type"><small>{ this.props.title }</small></PageHeader>
            { rows }
        </div>
      );
    }

  }
}

export default ThumbnailList;
