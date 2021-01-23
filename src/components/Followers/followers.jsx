import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Card, Row, Col, Button, Alert, Image } from 'react-bootstrap';
import Navigationbar from '../Navbar/Navigationbar';

class Followers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            followers: []
        }
    }

    componentWillMount() {
        if (this.props.location.state) {
            document.title = this.props.location.state.title;
            this.setState({
                user: this.props.location.state
            });

            axios.get(this.props.location.state.followers_url)
                .then(response => {
                    this.setState({
                        followers: response.data
                    });
                });
        }
    }


    render() {
        let redirectVar, data;
        if (this.state.user) {
            let user = this.state.user;
            let followers = [];

            // user Details Card
            if (this.state.followers.length) {
                followers = this.state.followers.map(follower => {
                    return (
                        <div>
                            <Row>
                                <Col xs={0.5}>
                                    <Image src={follower.avatar_url} roundedCircle width="50" style={{width:"4vw"}}height="auto"></Image>
                                </Col>
                                <Col>
                                    <Card>
                                        <Card.Header>
                                    <h2>{follower.login}</h2>
                                        </Card.Header>
                                    </Card>
                                </Col>
                            </Row>
                            <br />
                        </div>
                    );
                });
            } else {
                followers = (
                    <Alert variant="warning">
                        There are no followers in this user.
                    </Alert>
                );
            }
            data = (
                <div>
                    <Row>
                        <Col sm="10"><h2>{user.title}&nbsp;&nbsp;
                        <font color="grey">{user.login}/followers</font>
                    </h2>
                    </Col>
                    <Col>
                    <Link to={{ pathname: "/" }}>
                    <Button variant="success" >
                        <b>Back</b>
                    </Button>&nbsp;&nbsp;&nbsp;
                    </Link></Col>
                    </Row>
                    
                    <br />
                    {followers}
                </div>
            );
    

        return (
            <div>
                <Navigationbar />
                {redirectVar}
                <div class="container">
                    <br />
                    {data}
                </div>
            </div>
        )
    }
    }
}

export default Followers;