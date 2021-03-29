import React from 'react';

export default class QuestionResults extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      votes: [],
    };
  }

  componentDidMount() {
    this.stompSubscription = this.props.stompClient.subscribe('/response/votes', (response) => {
      this.setState({
        votes: JSON.parse(response.body),
        loading: false,
      });
    });
    this.props.stompClient.send('/app/votes', {}, '');
  }

  componentWillUnmount() {
    this.stompSubscription.unsubscribe();
  }

  findVoteCount(answer_id) {
    if (this.state.loading) return '...';
    
    const voteCount = this.state.votes.find(voteCount => voteCount.answer_id === answer_id);
    return voteCount ? voteCount.count : 0;
  }

  render() {
    const answers = this.props.answers.map(answer => {
      return (
        <li key={answer.id}>
          <span>{answer.name}</span>
          <span className="vote">Votes: {this.findVoteCount(answer.id)}</span>
        </li>
      );
    });

    return (
      <div>
        <h2>{this.props.name}</h2>
        <ol>{answers}</ol>  
      </div>
    ); 
  }  
}
