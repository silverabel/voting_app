import React from 'react';

export default class QuestionVoting extends React.Component {
  vote(answerId) {
    try {
      fetch('http://localhost:8081/votes', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          answer_id: answerId,
        }),
      });
    }
    catch (error) {
      console.log(error);
    }
  }

  render() {
    const answers = this.props.answers.map(answer => {
      return (
        <li key={answer.id}>
          <span>{answer.name}</span>
          <button className="vote" onClick={() => this.vote(answer.id)}>Vote</button>
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
