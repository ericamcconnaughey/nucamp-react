import React, { Component } from 'react';
import { Card, CardImg, CardBody, CardText, Breadcrumb, 
  BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, Label, Row, Col } from 'reactstrap';
import { LocalForm, Control, Errors } from 'react-redux-form';
import { Link } from 'react-router-dom';

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
    console.log("Current state is: " + JSON.stringify(values));
    alert("Current state is: " + JSON.stringify(values));
  }

  render() {
    return (
      <React.Fragment>
        <Button outline onClick={this.toggleModal}>
          <i className="fa fa-pencil fa-lg" />
          Submit Comment
        </Button>
        
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={values => this.handleSubmit(values)}>
              <Row className="form-group">
                <Col>
                  <Label htmlFor="rating">Rating</Label>
                    <Control.select model=".rating" id="rating" name="rating">
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
                        placeholder="Your Name"
                  />
                </Col>
              </Row>
              <Row className="form-group">
                <Col>
                  <Label htmlFor="text">Comment</Label>
                    <Control.textarea model=".text" id="text" name="text"
                        rows="6"
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
          <Card>
            <CardImg top src={campsite.image} alt={campsite.name} />
            <CardBody>
              <CardText>{campsite.description}</CardText>
            </CardBody>
          </Card>
        </div>
      );
  }

  function RenderComments({comments}) {
    if (comments) {
      return (
      <div className="col-md-5 m-1">
        <h4>Comments</h4>
        {comments.map(comment => 
        <div key={comment.id}> {comment.text} <br />
         -- {comment.author} 
         {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}
        </div>)}
      </div>) 
      }
      return <div />;
    }
    
  

  function CampsiteInfo(props) {
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
              <RenderComments comments={props.comments} />
              <CommentForm />
            </div>
          </div>
        </div>);

    } 
    return <div />;
    }


export default CampsiteInfo;