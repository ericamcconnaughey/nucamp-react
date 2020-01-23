import React, { Component } from 'react';
import { Card, CardImg, CardBody, CardText, Breadcrumb, 
  BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, Label, Row, Col } from 'reactstrap';
import { LocalForm, Control, Errors } from 'react-redux-form';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';

const minLength = len => val => val && (val.length >= len);
const maxLength = len => val => !val || (val.length <= len);

class CommentForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalOpen: false
      }

    this.toggleModal = this.toggleModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  }

  handleSubmit(values) {
    this.toggleModal();
    this.props.postComment(this.props.campsiteId, values.rating, values.author, values.text)
  }

  render() {
    return (
      <React.Fragment>
        <Button outline onClick={this.toggleModal} className="btn-lg">
          <i className="fa fa-pencil fa-lg" />{' '}
          Submit Comment
        </Button>
        
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={values => this.handleSubmit(values)}>
              <Row className="form-group">
                <Col>
                  <Label htmlFor="rating">Rating</Label>
                    <Control.select model=".rating" id="rating" name="rating"
                      className="form-control"
                      >
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                    </Control.select>
                </Col>
              </Row>
              <Row className="form-group">
                <Col>
                  <Label htmlFor="author">Your Name</Label>
                    <Control.text model=".author" id="author" name="author"
                        placeholder="Your Name" className="form-control"
                        validators={{
                          minLength: minLength(2),
                          maxLength: maxLength(15)
                      }}
                  />
                  <Errors 
                    className="text-danger"
                    model=".author"
                    show="touched"
                    component="div"
                    messages={{
                      minLength: 'Must be at least two characters',
                      maxLength: 'Must be 15 characters or fewer'
                    }} 
                  />
                </Col>
              </Row>
              <Row className="form-group">
                <Col>
                  <Label htmlFor="text">Comment</Label>
                    <Control.textarea model=".text" id="text" name="text"
                        rows="6" className="form-control"
                  />
                </Col>
              </Row>
              <Row className="form-group">
                <Col>
                  <Button type="submit" color="primary">
                    Submit
                  </Button>
                </Col>
              </Row>
            </LocalForm>
          </ModalBody>
        </Modal>
      </React.Fragment>
    );
  }
}  

function RenderCampsite({campsite}) {
      return (
        <div className="col-md-5 m-1">
          <FadeTransform
            in
            transformProps={{
                exitTransform: 'scale(0.2) translateX(-10%)'
          }}>
            <Card>
              <CardImg top src={baseUrl + campsite.image} alt={campsite.name} />
              <CardBody>
                <CardText>{campsite.description}</CardText>
              </CardBody>
            </Card>
          </FadeTransform>
        </div>
      );
  }

  function RenderComments({comments, postComment, campsiteId}) {
    if (comments) {
      return (
      <div className="col-md-5 m-1">
        <h4>Comments</h4>
        <Stagger in>
          {comments.map(comment => {
            return (
              <Fade in key={comment.id}>
                <div> 
                  <p>{comment.text} <br />
                    -- {comment.author}, {' '} {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}
                  </p>
                </div>
              </Fade>
            );
            })}
            </Stagger>
              <CommentForm 
                campsiteId={campsiteId}
                postComment={postComment}
              />
            </div>
            
            ) 
      }
      return <div />;
    }
    
  

  function CampsiteInfo(props) {
    if (props.isLoading) {
      return (
        <div className="container">
          <div className="row">
            <Loading />
          </div>
        </div>
      );
    }
    if (props.errMess) {
      return (
        <div className="container">
          <div className="row">
            <div className="col">
              <h4>{props.errMess}</h4>
            </div>
          </div>
        </div>
      );
    }
    if (props.campsite) {
      return (
        <div className="container">
          <div className="row">
              <div className="col">
                  <Breadcrumb>
                      <BreadcrumbItem><Link to="/directory">Directory</Link></BreadcrumbItem>
                      <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
                  </Breadcrumb>
                  <h2>{props.campsite.name}</h2>
                  <hr />
              </div>
          </div>
          
          <div className="row">
            <div className="col">
              <RenderCampsite campsite={props.campsite} />
              <RenderComments 
                comments={props.comments} 
                postComment={props.postComment}
                campsiteId={props.campsite.id} 
              />
            </div>
          </div>
        </div>);

    } 
    return <div />;
    }


export default CampsiteInfo;