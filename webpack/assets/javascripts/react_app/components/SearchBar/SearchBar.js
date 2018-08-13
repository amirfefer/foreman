import React from 'react';
import URI from 'urijs';
import PropTypes from 'prop-types';
import AutoComplete from '../AutoComplete';
import Bookmarks from '../bookmarks';
import { noop } from '../../common/helpers';

const handleSearch = (searchQuery) => {
  const uri = new URI(window.location.href);
  uri.setSearch('search', searchQuery.trim());
  window.Turbolinks.visit(uri.toString());
};

const SearchBar = ({
  searchQuery,
  results,
  status,
  queryCache,
  resetData,
  getResults,
  initialUpdate,
  data: {
    autocomplete,
    controller,
    bookmarks,
  },
}) => (
  <div className="input-group">
      <AutoComplete
        controller={controller}
        searchQuery={searchQuery}
        initialQuery={autocomplete.searchQuery || ''}
        status={status}
        results={results}
        url={autocomplete.url}
        queryCache={queryCache}
        resetData={resetData}
        getResults={getResults}
        initialUpdate={initialUpdate}
      />
      <div className="input-group-btn">
        <AutoComplete.SearchButton onClick={() => handleSearch(searchQuery)}/>
        <Bookmarks data={ { ...bookmarks, controller, searchQuery } } />
      </div>
  </div>
);

SearchBar.propTypes = {
  searchQuery: PropTypes.string,
  results: PropTypes.array,
  status: PropTypes.string,
  queryCache: PropTypes.object,
  resetData: PropTypes.func,
  getResults: PropTypes.func,
  initialUpdate: PropTypes.func,
  data: PropTypes.shape({
    autocomplete: {
      searchQuery: PropTypes.string,
      url: PropTypes.string,
    },
    controller: PropTypes.string,
    bookmarks: Bookmarks.propTypes,
  }),
};

SearchBar.defaultProps = {
  searchQuery: null,
  results: [],
  status: null,
  queryCache: {},
  resetData: noop,
  getResults: noop,
  initialUpdate: noop,
  data: {
    autocomplete: {
      searchQuery: null,
      url: null,
    },
    controller: null,
    bookmarks: {},
  },
};

export default SearchBar;