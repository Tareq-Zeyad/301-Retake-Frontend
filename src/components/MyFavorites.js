import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '././MyFavorites.js';
import { withAuth0 } from '@auth0/auth0-react';
import FavItem from './FavItem.js';
import { Row } from "react-bootstrap";
import axios from 'axios';
import UpdateModal from './UpdateModal';

class MyFavorites extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      FavDataArr: [],
      showFlag: false,
      langTitle: '',
      langDate: '',
      langDescrib: '',
      langImage: '',
      langId: '',
    }
  }

  componentDidMount = () => {
    const { user } = this.props.auth0;
    const email = user.email;
    console.log(email);
    const url = `https://retake-301-exam.herokuapp.com/getFavData?email=${this.props.auth0.user.email}`;
    axios
      .get(url)
      .then(result => {
        this.setState({
          FavDataArr: result.data

        })
      })
      .catch(err => {
        console.log(err)
      });
  };

  deleteItem = (object) => {
    const { user } = this.props.auth0;
    const email = user.email;
    const obj = {
      email: email
    }
    const id = object.id;
    const url = `https://retake-301-exam.herokuapp.com/deleteItem/${id}/${email}`;
    axios
      .delete(url, obj)
      .then(result => {
        this.setState({
          FavDataArr: result.data
        })
      })
      .catch(err => {
        console.log(err)
      });
  }

  updateData = (event) => {
    event.preventDefault();
    const { user } = this.props.auth0;
    const email = user.email;

    const obj = {
      langTitle: event.target.langTitle.value,
      langDate: event.target.langDate.value,
      langDescrib: event.target.langDescrib.value,
      langImage: event.target.langImage.value,
      langId: this.state.langId,
      email: email
    }
    const url = `https://retake-301-exam.herokuapp.com/updateData/${this.state.langId}`;
    axios
      .put(url, obj)
      .then(result => {
        this.setState({
          FavDataArr: result.data
        })
        console.log('Hello from update');
        console.log(result.data)
      })
      .catch(err => {
        console.log(err)
      });

  };

  handleClose = () => {
    this.setState({
      showFlag: false
    })
  }

  showUpdateForm = (item) => {
    this.setState({
      showFlag: true,
      langTitle: item.langTitle,
      langDate: item.langDate,
      langDescrib: item.langDescrib,
      langImage: item.langImage,
      langId: item.langId,
    })



  }

  render() {
    return (
      <>
        <h1>My Favorites</h1>
        <p>
          This is a collection of my favorites
        </p>
        <Row>
          {this.state.FavDataArr.map(item => {
            return (
              <FavItem
                item={item}
                deleteItem={this.deleteItem}
                showUpdateForm={this.showUpdateForm}


              />
            )
          })}
        </Row>

        <UpdateModal
          show={this.state.showFlag}
          handleClose={this.handleClose}
          langTitle={this.state.langTitle}
          langDate={this.state.langDate}
          langDescrib={this.state.langDescrib}
          langImage={this.state.langImage}
          updateData={this.updateData}
        />
      </>
    )
  }
}

export default withAuth0(MyFavorites);

