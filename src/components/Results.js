import React from 'react';
import QuestionsResults from './QuestionsResults';

export default class Results extends React.Component {
  render() {
    if (!this.props.questions.length) return <div>No questions yet</div>;

    const questions = this.props.questions.map(question => {
      return (
        <QuestionsResults
          key={question.id}
          name={question.name}
          answers={this.props.answers.filter(answer => answer.question_id === question.id)}
          stompClient={this.props.stompClient}
        />
      );
    });

    return (
      <div className="questions">{questions}</div>
    ); 
  }
}