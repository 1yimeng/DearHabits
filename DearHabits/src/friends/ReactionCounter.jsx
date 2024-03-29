import { Component } from "react";
import { FacebookCounter, FacebookSelector } from "@charkour/react-reactions";
import { auth } from "../firebase.jsx";
import axios from 'axios';
import _ from "lodash";

export class Facebook extends Component {
  //['like', 'love', 'haha', 'wow', 'sad', 'angry']
  state = {
    counters: this.props.counters,
    user: auth.currentUser.email,
    showSelector: false,
  };

  getJSON = reactions => {
    const json = {};
    reactions.forEach((value, index) => json[`${index+1}`] = value); 
    return json;
  };

  handleAdd = () => {
    if (this.state.showSelector) {
      this.setState({ showSelector: false });
    } else {
      this.setState({ showSelector: true });
    }
  };

  handleSelect = async (emoji) => {
    let updated = [];

    const index = _.findIndex(this.state.counters, { by: this.state.user });
    if (index > -1) {
      const newState = {
        counters: [
          ...this.state.counters.slice(0, index),
          { emoji, by: this.state.user },
          ...this.state.counters.slice(index + 1),
        ],
      };
      updated = [...newState.counters];
      this.setState(() => newState);
    } else {
      const newState = { counters: [...this.state.counters, { emoji, by: this.state.user }], };
      updated = [...newState.counters];
      this.setState(() => newState);
    }

    await axios.put(`http://localhost:5001/api/habits/posts/update/${this.props.pid}`, {"update":this.getJSON(updated)})
                    .then(res => console.log(res))
                    .catch(err => console.log(err));
  };

  showListOfReactions = () => {
    return this.state.counters.map((reaction, i) => {
      return (
        <div key={i}>
            {reaction.emoji} by {reaction.by}
        </div>
      );
    });
  };

  render() {
    return (
      <div style={{ position: "relative" }}>
        <div
          style={{
            marginBottom: "30px",
          }}
        >
          <FacebookSelector onSelect={this.handleSelect} />
        </div>

        <FacebookCounter
          counters={this.state.counters}
          user={this.state.user}
          onClick={this.handleAdd}
          bg="#fafafa"
        />

        {this.state.showSelector ? (
          <div>
            <this.showListOfReactions></this.showListOfReactions>
          </div>
        ) : null}
      </div>
    );
  }
}

export default Facebook;
