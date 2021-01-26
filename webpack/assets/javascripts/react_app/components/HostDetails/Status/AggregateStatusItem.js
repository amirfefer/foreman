import PropTypes from 'prop-types';
import React from 'react';
import { Tooltip } from '@patternfly/react-core';
import StatusIcon from './StatusIcon';
import { noop } from '../../../common/helpers';
import SkeletonLoader from '../../common/SkeletonLoader';
import { STATUS } from '../../../constants';

const StatusItem = ({ status, amount, resonseStatus, label, onClick }) => (
  <span className="card-pf-aggregate-status-notification">
    <Tooltip content={`${amount}-${label}`} entryDelay={0} exitDelay={0}>
      <a
        style={{ fontSize: 'x-large' }}
        className="aggregate-text"
        onClick={onClick}
      >
        <SkeletonLoader skeletonProps={{ width: 30 }} status={resonseStatus}>
          <span>
            <StatusIcon statusNumber={status} /> {amount}
          </span>
        </SkeletonLoader>
      </a>
    </Tooltip>
  </span>
);

StatusItem.propTypes = {
  amount: PropTypes.number,
  resonseStatus: PropTypes.bool,
  label: PropTypes.string,
  status: PropTypes.number,
  onClick: PropTypes.func,
};

StatusItem.defaultProps = {
  amount: 0,
  label: '',
  status: Infinity,
  onClick: noop,
  resonseStatus: STATUS.PENDING,
};

export default StatusItem;
