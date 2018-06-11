import React from 'react';
import { mount } from 'enzyme';

import { testComponentSnapshotsWithFixtures } from '../../../common/testHelpers';

import BreadcrumbBar from '../BreadcrumbBar';
import {
  breadcrumbBar,
  breadcrumbBarSwithcable,
} from '../BreadcrumbBar.fixtures';

const createStubs = () => ({
  toggleSwitcher: jest.fn(),
  closeSwitcher: jest.fn(),
  loadSwitcherResourcesByResource: jest.fn(),
});

const fixtures = {
  'renders breadcrumb-bar': breadcrumbBar,
  'renders switchable breadcrumb-bar': breadcrumbBarSwithcable,
};

describe('BreadcrumbBar', () => {
  describe('rendering', () =>
    testComponentSnapshotsWithFixtures(BreadcrumbBar, fixtures));

  describe('triggering', () => {
    it('should trigger callbacks', () => {
      const props = { ...breadcrumbBarSwithcable, ...createStubs() };
      const component = mount(<BreadcrumbBar {...props} />);

      expect(props.toggleSwitcher.mock.calls).toHaveLength(0);
      expect(props.closeSwitcher.mock.calls).toHaveLength(0);
      expect(props.loadSwitcherResourcesByResource.mock.calls).toHaveLength(0);

      const toggleSwitcherClick = () =>
        component.find('.breadcrumb-switcher .btn').simulate('click');
      const openSwitcher = () => component.setProps({ isSwitcherOpen: true });

      toggleSwitcherClick();
      expect(props.toggleSwitcher.mock.calls).toHaveLength(1);

      openSwitcher();
      expect(props.loadSwitcherResourcesByResource.mock.calls).toHaveLength(1);

      component.setProps({ currentPage: 2, totalPages: 3 });

      component.find('.breadcrumb-switcher .next a').simulate('click');
      expect(props.loadSwitcherResourcesByResource.mock.calls).toHaveLength(2);

      component.find('.breadcrumb-switcher .previous a').simulate('click');
      expect(props.loadSwitcherResourcesByResource.mock.calls).toHaveLength(3);

      expect(props.loadSwitcherResourcesByResource.mock.calls).toMatchSnapshot(
        'loadSwitcherResourcesByResource calls'
      );
    });
  });
});
