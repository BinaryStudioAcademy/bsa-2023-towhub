import { NavLink } from 'react-router-dom';

type Properties = {
  to: string;
  children: React.ReactNode;
  className?: string;
};

const Link: React.FC<Properties> = ({
  children,
  to,
  className,
}: Properties) => (
  <NavLink to={to} className={className ?? 'link'}>
    {children}
  </NavLink>
);

export { Link };
