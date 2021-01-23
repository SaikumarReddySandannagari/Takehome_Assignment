import React, {Component} from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import "./style.css";
import {Table, Row, Col, Card,Container, FormControl, Image} from "react-bootstrap";
import Navigationbar from "../Navbar/Navigationbar";

class Users extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      Users: [],
      allUsers: [],
      page: 0,
    };
  }
  

  infiniteScroll = () => {
    // End of the document reached?
    if (window.innerHeight + document.documentElement.scrollTop
    === document.documentElement.offsetHeight){
     
       let newPage = this.state.page;
       console.log(newPage)
       newPage++;
       console.log(newPage)
        this.setState({
             page: newPage
        });
       this.getUsers(newPage);
       }
    }

  getUsers(page) {
    axios
      .get(
        'https://api.github.com/users?since='+page.toString()
      )
      .then((response) => {
        var temp=this.state.Users
        temp.push(...response.data)
        this.setState({
          Users: temp,
          allUsers: temp,
        });
      });
  }
  

  // API call 
  componentDidMount() {
    document.title = "Users";
    window.addEventListener('scroll', this.infiniteScroll);
    this.getUsers(this.state.page);
    
  }

  // Search Change Handler
  onSearch = (e) => {
    let search_input = e.target.value;
    let allUsers = this.state.allUsers;
    if (typeof search_input === "undefined" || search_input.trim() === "") {
      this.setState({
        Users: allUsers,
      });
    } else {
      let filteredUsers = search_input.length
        ? allUsers.filter(
            (issue) =>
              issue.login.toLowerCase().includes(search_input)
          )
        : allUsers;

      this.setState({
        Users: filteredUsers,
      });
    }
  };

  render() {
    let issueRows = [];
    let Users = this.state.Users;

    // User Cards
    if (Users.length) {
      for (
        let i = 0;
         i < Users.length;
        i++
      ) {
        let row = (
          <Card style={{ width: "80%", height: "6rem" }}>

    <Card.Body >
    <Row style={{width:"80vw"}}>
            <Col xs={1} align="center">
                  <Image src={this.state.Users[i].avatar_url} roundedCircle width="40"  style={{width:"4vw"}} height="auto"></Image>
            </Col>
            <Col>
              <Card.Title style={{fontSize:"3vw"}} align="left">
                  <Link to={{ pathname: '/repos', state: Users[i] }}>
                      {Users[i].login}
                  </Link>
              </ Card.Title>
              <Row>
                  <Col sm='10' align="left">
                      <Card.Text>
                      <Link to={{ pathname: '/followers', state: Users[i] }}>
                      Followers
                  </Link>
                      </Card.Text>
                  </Col>
              </Row>  
            </Col> 
    </Row>    
    </Card.Body> 
  </Card>
  
        );
        issueRows.push(row);
      }

   }

    return (
      <div>
        <Navigationbar />
        <div class="container">
              <FormControl
                placeholder="Search Users.."
                aria-label=""
                aria-describedby="basic-addon2"
                name="search_input"
                onChange={this.onSearch}
                style={{marginLeft:100,"width":"68vw"}}
              />
          <br />
          <Table >
      <tbody>
        <Container align="center">
          {issueRows}
        </Container>
      </tbody>  
    </Table>
        </div>
      </div>
    );
  }
}

export default Users;
