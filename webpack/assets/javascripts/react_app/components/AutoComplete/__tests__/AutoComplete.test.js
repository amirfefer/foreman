import React from 'react';
import { mount } from 'enzyme';
import AutoComplete from '../index';
import { AutoCompleteProps } from '../AutoComplete.fixtures.js';
import { testComponentSnapshotsWithFixtures } from '../../../common/testHelpers';

jest.mock('lodash/debounce', () => jest.fn(fn => fn));
jest.mock('uuid/v1', () => jest.fn(fn => '1234'));

const getProps = () => ({
  ...AutoCompleteProps,
  getResults: jest.fn(),
  resetData: jest.fn(),
  initialUpdate: jest.fn(),
});

const fixtures = {
  'renders AutoComplete': AutoCompleteProps,
};
describe('AutoComplete', () => {
  describe('rendering', () => {
    testComponentSnapshotsWithFixtures(AutoComplete, fixtures);
  });

  describe('triggering', () => {
    it('initial query should update query on componentDidMount', () => {
      const initialQuery = 'test';
      const props = getProps();
      mount(<AutoComplete {...props} initialQuery={initialQuery}/>);
      expect(props.initialUpdate.mock.calls.length).toBe(1);
    });

    it('input focus should call getResult only once', () => {
      const props = getProps();
      const component = mount(<AutoComplete {...props} results={[]}/>);
      const instance = component.instance();
      const emptyEvent = { target: { value: '' } };
      expect(props.getResults.mock.calls.length).toBe(0);
      instance.handleInputFocus(emptyEvent);
      expect(props.getResults.mock.calls.length).toBe(1);
      component.setProps({ results: props.results });
      instance.handleInputFocus(emptyEvent);
      expect(props.getResults.mock.calls.length).toBe(1);
    });

    it('input change should call getResult', () => {
      const props = getProps();
      const component = mount(<AutoComplete {...props}/>);
      const instance = component.instance();
      expect(props.getResults.mock.calls.length).toBe(0);
      instance.handleInputChange();
      expect(props.getResults.mock.calls.length).toBe(1);
    });

    it('resetData should be called once', () => {
      const props = getProps();
      const component = mount(<AutoComplete {...props}/>);
      expect(props.resetData.mock.calls.length).toBe(0);
      component.instance().componentWillUnmount();
      expect(props.resetData.mock.calls.length).toBe(1);
    });

    it('clear button click should call getResult', () => {
      const props = getProps();
      const component = mount(<AutoComplete {...props}/>);
      expect(props.getResults.mock.calls.length).toBe(0);
      component.find('.autocomplete-clear-button').first().simulate('click');
      expect(props.getResults.mock.calls.length).toBe(1);
    });

    it('handleResultsChange should call getResult', () => {
      const props = getProps();
      const component = mount(<AutoComplete {...props}/>);
      const instance = component.instance();
      expect(props.getResults.mock.calls.length).toBe(0);
      instance.handleResultsChange(props.results);
      expect(props.getResults.mock.calls.length).toBe(1);
      // shouldn't call if there is no result
      instance.handleResultsChange([]);
      expect(props.getResults.mock.calls.length).toBe(1);
    });

    it('menu should be hidden if no results', () => {
      const props = { ...getProps() };
      const component = mount(<AutoComplete {...props} results={[]}/>);
      const mainInput = component.find('.rbt-input-main').first();
      mainInput.simulate('focus', { target: { value: '' } });
      expect(component.find('.rbt-menu').exists()).toBeFalsy();
      component.setProps({ results: props.results });
      mainInput.simulate('focus', { target: { value: '' } });
      expect(component.find('.rbt-menu').exists()).toBeTruthy();
    });
  });
});