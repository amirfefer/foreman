import React from 'react';
import { MenuItem } from 'patternfly-react';
import PropTypes from 'prop-types';
import Icon from '../Icon';

const DocumentationLink = ({ href, id }) => {
  const handleClick = e => {
    e.preventDefault();
    window.open(href, '_blank');
  };

  return (
    <MenuItem key="documentationUrl" id={id} href={href} onClick={handleClick}>
      <Icon type="question-sign" className="icon-black" />
      {` ${__('Documentation')}`}
    </MenuItem>
  );
};

export default DocumentationLink;

DocumentationLink.propTypes = {
  href: PropTypes.string.isRequired,
  id: PropTypes.string,
};

DocumentationLink.defaultProps = {
  id: 'documentationLink',
};
