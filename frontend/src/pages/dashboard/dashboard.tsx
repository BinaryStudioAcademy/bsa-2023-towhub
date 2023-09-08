import { type TabName } from '~/libs/types/types.js';

type Properties = {
  selectedTab: TabName;
};

const Dashboard: React.FC<Properties> = ({ selectedTab }: Properties) => {
  const renderTabContent = (selectedTab: TabName): React.ReactNode => {
    switch (selectedTab) {
      case 'drivers': {
        return <div>Drivers</div>;
      }
      case 'trucks': {
        return <div>Trucks</div>;
      }
      case 'orders': {
        return <div>Orders</div>;
      }
    }
  };

  return <div> {renderTabContent(selectedTab)}</div>;
};

export { Dashboard };
