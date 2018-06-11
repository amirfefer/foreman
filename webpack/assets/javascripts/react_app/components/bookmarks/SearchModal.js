import React from 'react';
import { Modal } from 'patternfly-react';
import PropTypes from 'prop-types';
import BookmarkForm from './form';

const SearchModal = ({
  show,
  onHide,
  onEnter,
  title = __('Create Bookmark'),
  controller,
  url,
}) => (
  <Modal show={show} enforceFocus onHide={onHide} onEnter={onEnter}>
    <Modal.Header closeButton>
      <Modal.Title>{title}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <BookmarkForm controller={controller} url={url} onCancel={onHide} />
    </Modal.Body>
  </Modal>
);

export default SearchModal;

SearchModal.propTypes = {
  show: PropTypes.bool,
  onHide: PropTypes.func.isRequired,
  onEnter: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  controller: PropTypes.string.isRequired,
};

SearchModal.defaultProps = {
  show: true,
};
