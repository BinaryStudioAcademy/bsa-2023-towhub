import { RouterOutlet } from '~/libs/components/components.js';

const Dashboard: React.FC = () => {
  return (
    <div>
      Dashboard Page
      <RouterOutlet />
    </div>
  );
};

export { Dashboard };
