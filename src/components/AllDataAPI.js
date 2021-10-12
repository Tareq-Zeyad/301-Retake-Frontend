import React, { Component } from 'react';
import { withAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import HomeItem from './HomeItem';
import { Row } from 'react-bootstrap';


class AllDataAPI extends Component {
    constructor(props) {
        super(props);
        this.state = {
            DataArr: [],
        }
    }

    componentDidMount = () => {
        const url = 'http://localhost:3010/getData';
        axios
            .get(url)
            .then(result => {
                this.setState({
                    DataArr: result.data
                })
            })
            .catch(err => {
                console.log(err);
            });
    };

    addToMyFav=(object)=>{
        const url="http://localhost:3010/addToFav";
        axios
        .post(url,object)
        .then(result=>{
            console.log('Added to Favorites successfully')
        })
        .catch(err => {
            console.log(err);
        });
    }

    render() {
        return (
            <>
                <div>
                    <h1>All Data from the API</h1>
                    <h3>Select your favorites :)</h3>

                    <Row>
                        {this.state.DataArr.map(item => {
                            return (
                                <HomeItem
                                    item={item}
                                    addToMyFav={this.addToMyFav}
                                />
                            )
                        })}
                    </Row>

                </div>


            </>
        )
    }
}

export default withAuth0(AllDataAPI);
