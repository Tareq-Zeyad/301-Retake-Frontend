import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { withAuth0 } from '@auth0/auth0-react';

class FavItem extends React.Component{

    deleteThis=()=>{
        const obj={
            title: this.props.item.title,
            imageUrl: this.props.item.imageUrl,
            dateCreated: this.props.item.dateCreated,
            description: this.props.item.description,
            email: this.props.auth0.user.email,
            id: this.props.item._id

        }
        this.props.deleteItem(obj);

    };

    render(){
        return(
            <>
            <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={this.props.item.imageUrl} />
                    <Card.Body>
                        <Card.Title> Title: {this.props.item.title} </Card.Title>
                        <Card.Text>Date Created: {this.props.item.dateCreated} </Card.Text>
                        <Card.Text>Description: {this.props.item.description} </Card.Text>

                        <Button variant="primary" onClick={()=>this.props.showUpdateForm(this.props.item)} >Update</Button>
                        <Button variant="danger" onClick={this.deleteThis} >Delete</Button>

                    </Card.Body>
                </Card>
            </>
        )
    }
}

export default withAuth0(FavItem);