import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { FieldLevelHelp } from 'patternfly-react';

import Form from '../../common/forms/CommonForm';
import AutoComplete from '../../AutoComplete';

const TemplateAutoComplete = ({
  label,
  resourceType,
  id,
  initialQuery,
  initialError,
  info,
  isRequired,
  url,
  template,
}) => (
  <Form
    touched
    label={label}
    error={initialError}
    required={isRequired}
    tooltipHelp={
      info && (
        <FieldLevelHelp
          buttonClass="field-help"
          content={<Fragment>{info}</Fragment>}
        />
      )
    }
  >
    <AutoComplete
      id={`template-autocomplete-input-${id}`}
      inputProps={{
        name: `${template}[input_values][${id}][value]`,
      }}
      controller={resourceType}
      url={url}
      initialQuery={initialQuery}
      error={initialError}
    />
  </Form>
);
TemplateAutoComplete.propTypes = {
  resourceType: PropTypes.string,
  initialQuery: PropTypes.string,
  initialError: PropTypes.string,
  label: PropTypes.string.isRequired,
  info: PropTypes.string,
  isRequired: PropTypes.bool,
  id: PropTypes.number.isRequired,
  url: PropTypes.string.isRequired,
  template: PropTypes.string.isRequired,
};

TemplateAutoComplete.defaultProps = {
  resourceType: null,
  initialQuery: '',
  initialError: null,
  info: null,
  isRequired: false,
};

export default TemplateAutoComplete;
