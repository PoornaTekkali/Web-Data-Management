import React from 'react';
import moment from 'moment';
import './Message.css';

export default function Message(props) {
    const {
      text,
      isMine,
      startsSequence,
      endsSequence,
      created_at
    } = props;

    const formattedDate = new Date(created_at).toLocaleString();
    return (
      <div className={[
        'message',
        `${isMine ? 'mine' : ''}`,
      ].join(' ')}>
        <div className="bubble-container">
          <div className="bubble" title={created_at}>
            { text }
            <div className="timestamp">
            {formattedDate}
            </div>
          </div>
        </div>
      </div>
    );
}