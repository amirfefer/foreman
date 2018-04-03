import {
  BREADCRUMB_BAR_TOGGLE_SWITCHER,
  BREADCRUMB_BAR_CLOSE_SWITCHER,
  BREADCRUMB_BAR_RESOURCES_REQUEST,
  BREADCRUMB_BAR_RESOURCES_SUCCESS,
  BREADCRUMB_BAR_RESOURCES_FAILURE,
} from '../BreadcrumbBarConstants';
import reducer from '../BreadcrumbBarReducer';

import { resource, resourceList } from '../BreadcrumbBar.fixtures';

const fixtures = {
  'should return the initial state': {},
  'should handle BREADCRUMB_BAR_TOGGLE_SWITCHER': {
    action: {
      type: BREADCRUMB_BAR_TOGGLE_SWITCHER,
    },
  },
  'should handle BREADCRUMB_BAR_CLOSE_SWITCHER': {
    action: {
      type: BREADCRUMB_BAR_CLOSE_SWITCHER,
    },
  },
  'should handle BREADCRUMB_BAR_RESOURCES_REQUEST': {
    action: {
      type: BREADCRUMB_BAR_RESOURCES_REQUEST,
      payload: {
        resource: { ...resource },
        options: {},
      },
    },
  },
  'should handle BREADCRUMB_BAR_RESOURCES_SUCCESS': {
    action: {
      type: BREADCRUMB_BAR_RESOURCES_SUCCESS,
      payload: [...resourceList],
    },
  },
  'should handle BREADCRUMB_BAR_RESOURCES_FAILURE': {
    action: {
      type: BREADCRUMB_BAR_RESOURCES_FAILURE,
      payload: new Error('some error'),
    },
  },
};

describe('BreadcrumbBar reducer', () => {
  const reduce = ({ state, action = {} } = {}) => reducer(state, action);

  Object.entries(fixtures).forEach(([description, action]) =>
    it(description, () => expect(reduce(action)).toMatchSnapshot()));
});
