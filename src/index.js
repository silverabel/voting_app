import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
import SockJS from 'sockjs-client';
import Stomp from 'stomp-websocket';
import Voting from './components/Voting';
import Results from './components/Results';
import './index.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      answers: [],
    };
  }

  componentDidMount() {
    const socket = new SockJS('http://localhost:8080/resultsAPI');
    this.stompClient = Stomp.over(socket);
    this.stompClient.debug = null;
    
    this.stompClient.connect({}, (frame) => {
      this.stompClient.subscribe('/response/answers', (response) => {
        this.setState({answers: JSON.parse(response.body)});
      });
      this.stompClient.send('/app/answers', {}, '');

      this.stompClient.subscribe('/response/questions', (response) => {
        this.setState({questions: JSON.parse(response.body)});
      });
      this.stompClient.send('/app/questions', {}, '');
    });
  }

  render() {
    return (
      <Router>
        <div className="container">
          <nav>
            <ul>
              <li>
                <Link to="/voting">Voting</Link>
              </li>
              <li>
                <Link to="/results">Results</Link>
              </li>
            </ul>
          </nav>
          <div>
            <h1>Questions</h1>
            <Switch>
              <Route path="/voting">
                <Voting
                  questions={this.state.questions}
                  answers={this.state.answers}
                />
              </Route>
              <Route path="/results">
                <Results 
                  questions={this.state.questions}
                  answers={this.state.answers}
                  stompClient={this.stompClient}
                />
              </Route>
              <Route path="/">
                <Redirect to="/voting" />
              </Route>
            </Switch>  
          </div>       
        </div>
      </Router>
    ); 
  }
}

// ========================================

ReactDOM.render(<App />, document.getElementById("root"));