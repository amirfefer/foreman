import React from 'react';
import { addGlobalFill } from '../../common/Fill/GlobalFill';
import DetailsTab from './Details';

export const registerCoreTabs = () => {
  addGlobalFill(
    'host-details-page-tabs',
    'Overview',
    <DetailsTab key="details-tab" />,
    1000
  );
};
