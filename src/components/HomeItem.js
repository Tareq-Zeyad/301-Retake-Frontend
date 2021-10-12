import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { withAuth0 } from '@auth0/auth0-react';

class HomeItem extends React.Component {

    addToFavorites=()=>{
        const obj={
            title: this.props.item.title,
            imageUrl: this.props.item.imageUrl,
            dateCreated: this.props.item.dateCreated,
            description: this.props.item.description,
            email: this.props.auth0.user.email,


        }
        this.props.addToMyFav(obj);
    };

    render() {
        return (
            <>
                <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={this.props.item.imageUrl} />
                    <Card.Body>
                        <Card.Title> Title: {this.props.item.title} </Card.Title>
                        <Card.Text>Date Created: {this.props.item.dateCreated} </Card.Text>
                        <Card.Text>Description: {this.props.item.description} </Card.Text>

                        <Button variant="primary" onClick={this.addToFavorites}>Add to Favorites</Button>
                    </Card.Body>
                </Card>

            </>
        )
    }
}

export default withAuth0(HomeItem);