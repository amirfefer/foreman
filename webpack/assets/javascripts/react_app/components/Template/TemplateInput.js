import React from 'react';
import PropTypes from 'prop-types';
import DateTime from '../common/forms/DateTime/DateTime';
import Autocomplete from './Inputs/AutoComplete';

const TemplateInput = ({
  data: {
    label,
    resourceType,
    id,
    description,
    required,
    initialError,
    type,
    url,
    supportedTypes,
    template,
    value,
  },
}) => {
  const [plain, search, date] = supportedTypes;

  switch (type) {
    case plain:
      return null;
    case search:
      return (
        <Autocomplete
          label={label}
          id={id}
          isRequired={required}
          info={description}
          initialError={initialError}
          resourceType={resourceType}
          url={url}
          template={template}
          initialQuery={value}
        />
      );
    case date:
      return (
        <DateTime
          label={label}
          id={id}
          isRequired={required}
          info={description}
          initialError={initialError}
          url={url}
          template={template}
          value={value}
        />
      );
    default:
      return null;
  }
};

TemplateInput.propTypes = {
  data: PropTypes.shape({
    url: PropTypes.string,
    resourceType: PropTypes.string,
    initialError: PropTypes.string,
    label: PropTypes.string.isRequired,
    description: PropTypes.string,
    required: PropTypes.bool,
    supportedTypes: PropTypes.arrayOf(PropTypes.string).isRequired,
    template: PropTypes.string.isRequired,
    value: PropTypes.string,
  }),
};

TemplateInput.defaultProps = {
  data: PropTypes.shape({
    url: null,
    useKeyShortcuts: false,
    resourceType: null,
    initialError: null,
    description: null,
    required: false,
    value: '',
  }),
};

export default TemplateInput;
