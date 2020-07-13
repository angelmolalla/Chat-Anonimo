import React, { Component } from "react";

class About extends Component {
  render() {
    return (
      <div>
        <h1>About this project:</h1>
        <div class="container-fluid">
          <div className="row">
            <div class="col-md-12">
              <div className="row">
                <div className="col-md-6">
                  <h3>Anonymous chat challenge</h3>
                  <blockquote className="blockquote">
                    <p>
                      Build a chat where each user is a new one for each tab and
                      can write to other users privately or write in group chats
                      by category, where the categories are already given from
                      the beginning to the free choice of the participant.
                    </p>
                    <p>
                      <a href="https://www.notion.so/Reto-chat-an-nimo-1ad4ccfb508f447c90171914545f365a">
                        Anonymous chat challenge
                      </a>
                    </p>
                  </blockquote>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <h3>Youtube:</h3>
                  <a href="https://www.youtube.com/watch?v=4D75dMBZdU0">
                       Youtube Anonymous chat challenge
                      </a>
                </div>
              </div>
              <br/>
              <div className="row">
                <div className="col-md-6">
                  <h3>Author: Marcelo Olalla</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default About;
