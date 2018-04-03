import React from 'react';
import PropTypes from 'prop-types';
import Breadcrumb from './components/Breadcrumb';
import BreadcrumbSwitcher from './components/BreadcrumbSwitcher';

class BreadcrumbBar extends React.Component {
  render() {
    const {
      data: { breadcrumbItems, isSwitchable, resource },
      resourceSwitcherItems,
      isLoadingResources,
      isSwitcherOpen,
      toggleSwitcher,
      closeSwitcher,
      loadSwitcherResourcesByResource,
      currentPage,
      totalPages,
    } = this.props;

    const isTitle = breadcrumbItems.length === 1;
    return (
      <div className="breadcrumb-bar">
        <Breadcrumb title items={breadcrumbItems} isTitle={isTitle}>
          {isSwitchable && (
            <BreadcrumbSwitcher
              open={isSwitcherOpen}
              isLoadingResources={isLoadingResources}
              resources={resourceSwitcherItems}
              onTogglerClick={() => toggleSwitcher()}
              onOverlayHide={() => closeSwitcher()}
              onOverlayEnter={() => loadSwitcherResourcesByResource(resource)}
              onNextPageClick={() =>
                 loadSwitcherResourcesByResource(resource, { page: Number(currentPage) + 1 }) }
              onPrevPageClick={() =>
                 loadSwitcherResourcesByResource(resource, { page: Number(currentPage) - 1 }) }
              currentPage={currentPage}
              totalPages={totalPages}
            />
          )}
        </Breadcrumb>
        {!isTitle && <hr className="breadcrumb-line" />}
      </div>
    );
  }
}

BreadcrumbBar.propTypes = {
  data: PropTypes.shape({
    isSwitchable: PropTypes.bool,
    resource: PropTypes.shape({
      url: PropTypes.string,
      controller: PropTypes.string,
      action: PropTypes.string,
      nameField: PropTypes.string,
    }),
    breadcrumbItems: PropTypes.arrayOf(PropTypes.shape({
      caption: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    })),
  }),
  resourceSwitcherItems: BreadcrumbSwitcher.propTypes.resources,
  isLoadingResources: PropTypes.bool,
  isSwitcherOpen: PropTypes.bool,
  toggleSwitcher: PropTypes.func,
  closeSwitcher: PropTypes.func,
  loadSwitcherResourcesByResource: PropTypes.func,
};

BreadcrumbBar.defaultProps = {
  data: {
    breadcrumbItems: [],
    isSwitchable: false,
  },
  resourceSwitcherItems: [],
  isLoadingResources: false,
  isSwitcherOpen: false,
  toggleSwitcher: () => null,
  closeSwitcher: () => null,
  loadSwitcherResourcesByResource: () => null,
};

export default BreadcrumbBar;
