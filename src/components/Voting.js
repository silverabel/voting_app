import React from 'react';
import QuestionsVoting from './QuestionsVoting';

export default class Voting extends React.Component {
  render() {
    if (!this.props.questions.length) return <div>No questions yet</div>;

    const questions = this.props.questions.map(question => {
      return (
        <QuestionsVoting
          key={question.id}
          name={question.name}
          answers={this.props.answers.filter(answer => answer.question_id === question.id)}
        />
      );
    });

    return (
      <div className="questions">{questions}</div>
    ); 
  }
}