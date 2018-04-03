import React from 'react';
import PropTypes from 'prop-types';
import { Popover, ListGroup, ListGroupItem, Pager } from 'patternfly-react';
import EllipsisWithTooltip from 'react-ellipsis-with-tooltip';
import './BreadcrumbSwitcherPopover.scss';

const BreadcrumbSwitcherPopover = ({
  resources,
  onNextPageClick,
  onPrevPageClick,
  loading,
  currentPage,
  totalPages,
  ...props
}) => (
  <Popover className="breadcrumb-switcher-popover" {...props}>
    {loading ? (
      <div>Loading...</div>
    ) : (
      <ListGroup className="scrollable-list">
        {resources.map((item) => {
          const { onClick, url, name } = item;
          return (
            <ListGroupItem
              className="no-border"
              key={`id-${name}`}
              href={url}
              onClick={onClick}
            >
              <EllipsisWithTooltip>{name}</EllipsisWithTooltip>
            </ListGroupItem>
          );
        })}
      </ListGroup>
    )}
    <Pager
      className="pager-sm"
      messages={{ nextPage: __('Next'), previousPage: __('Previous') }}
      onNextPage={onNextPageClick}
      onPreviousPage={onPrevPageClick}
      disablePrevious={currentPage === 1}
      disableNext={currentPage === Math.ceil(totalPages)}
    />
  </Popover>
);

BreadcrumbSwitcherPopover.propTypes = {
  ...Popover.propTypes,
  loading: PropTypes.bool,
  resources: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    href: PropTypes.string,
    onClick: PropTypes.func,
  })),
};

BreadcrumbSwitcherPopover.defaultProps = {
  loading: false,
  resources: [],
};

export default BreadcrumbSwitcherPopover;
