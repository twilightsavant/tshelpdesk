import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Spinner from '../../Spinner';
import { ticketSummaryCount } from '../../../../actions/tickets';

const TicketCount = ({
  tickets: { ticketSummary, loading },
  ticketSummaryCount
}) => {
  useEffect(() => {
    ticketSummaryCount();
  }, [ticketSummaryCount]);

  return (
    <div className='outer_box_rad leftBar_YourInfo'>
      <div className='titleDiv'>
        <i className='fas fa-ticket-alt'></i> Ticket Summary
      </div>
      <div className='contDiv'>
        {loading ? (
          <Spinner />
        ) : (
          <ul>
            <li>{ticketSummary.open} Open Tickets</li>
            <li>{ticketSummary.answered} Answered Tickets</li>
            <li>{ticketSummary.notAnswered} Not Answered Tickets</li>
            <li>{ticketSummary.closed} Closed Tickets</li>
          </ul>
        )}
      </div>
    </div>
  );
};

TicketCount.propTypes = {
  tickets: PropTypes.object.isRequired,
  ticketSummaryCount: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  tickets: state.tickets
});

export default connect(mapStateToProps, { ticketSummaryCount })(TicketCount);
