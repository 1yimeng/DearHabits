import { Component } from "react";
import { FacebookCounter, FacebookSelector } from "@charkour/react-reactions";
import _ from "lodash";

export class Facebook extends Component {
  //['like', 'love', 'haha', 'wow', 'sad', 'angry']
  state = {
    counters: this.props.counters,
    user: "yimeng",
    showSelector: false,
  };

  handleAdd = () => {
    if (this.state.showSelector) {
      this.setState({ showSelector: false });
    } else {
      this.setState({ showSelector: true });
    }
  };

  handleSelect = (emoji) => {
    const index = _.findIndex(this.state.counters, { by: this.state.user });
    if (index > -1) {
      this.setState({
        counters: [
          ...this.state.counters.slice(0, index),
          { emoji, by: this.state.user },
          ...this.state.counters.slice(index + 1),
        ],
      });
    } else {
      this.setState({
        counters: [...this.state.counters, { emoji, by: this.state.user }],
      });
    }
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
