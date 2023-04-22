/* eslint-disable react-hooks/exhaustive-deps */
import { FC, ReactNode } from 'react';

import Filters from './Filters';

type DashboardProps = {
  children?: ReactNode;
};

const Dashboard: FC<DashboardProps> = ({ children }) => (
  <>
    <Filters />
    {children}
  </>
);

export default Dashboard;
