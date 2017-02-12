import React, { Component } from 'react';
import { pubnub, createNewComment } from '../../../../helpers/pubnub/userHelpers.js';

class TextEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      comment: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    createNewComment(pubnub, {
      comment: this.state.comment,
      path: this.props.path,
      googleId: this.props.googleId,
      name: this.props.name,
      annotation: this.props.selectionArea
    });
  }

  render() {
    console.log("rendered text editor");
    return (
      <div className="annotate">
        <form onSubmit={this.handleSubmit}>
          <label className="annotateLabel">Annotate</label>
          <textarea
            className="annotateText"
            value={this.state.comment}
            onChange={this.handleChange}
          />
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default TextEditor;
