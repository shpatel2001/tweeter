import React, { Component } from "react";
import { Link } from "react-router-dom";
import { signin } from "../helpers/auth";
import { auth, db } from "../services/firebase";
import '../bulma.min.css';

export default class Feed extends Component 
{
    constructor(props) {
        super(props);
        this.state = {
          user: auth().currentUser,
          chats: [],
          content: '',
          readError: null,
          writeError: null,
          loadingChats: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.myRef = React.createRef();
      }

    async componentDidMount() {
        this.setState({ readError: null, loadingChats: true });
        try {
          db.ref("chats").on("value", snapshot => {
            let chats = [];
            snapshot.forEach((snap) => {
              chats.push(snap.val());
            });
            chats.sort(function (a, b) { return a.timestamp - b.timestamp })
            this.setState({ chats });
            this.setState({ loadingChats: false });
          });
        } catch (error) {
          this.setState({ readError: error.message, loadingChats: false });
        }
      }

    handleChange(event)
    {
        this.setState({
            content: event.target.value
        });
    }

    async handleSubmit(event) {
        event.preventDefault();
        this.setState({ writeError: null });
        const chatArea = this.myRef.current;
        try {
          await db.ref("chats").push({
            content: this.state.content,
            timestamp: Date.now(),
            uid: this.state.user.uid
          });
          this.setState({ content: '' });
        } catch (error) {
          this.setState({ writeError: error.message });
        }
      }

    render()
    {
        return (
            <div className="container">
                <div className="container">
                  <h1 className="is-size-1 is-text-centered">Tweeter</h1>
                </div>
                <div className="tweets">
                    {this.state.chats.map(chat => {
                        let date = new Date(chat.timestamp);
                        let time = (date.getHours() % 12) + ":" + (date.getMinutes()<10?'0':'') + date.getMinutes() + ' ' + (date.getHours()>12?'PM':'AM');
                        date = date.toString();
                        return <p key={chat.timestamp}>{time}: <strong>{chat.content}</strong></p>
                    })}
                </div>
                <form onSubmit={this.handleSubmit}>
                    { this.state.error ? <p>{this.state.writeError}</p> : null}
                    <div className="field has-addons is-fullwidth">
                      <div className="control is-expanded">
                        <input class="input" type="text" onChange={this.handleChange} value={this.state.content}></input>
                      </div>
                      <div className="control">
                        <button type="submiit" className="button">Send</button>
                      </div>
                    </div>
                </form>
                <div>
                    Logged in as: <strong>{this.state.user.email}</strong>
                </div>
            </div>
        );
    }
}