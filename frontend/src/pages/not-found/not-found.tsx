import { NavLink } from 'react-router-dom';

import { AppRoute } from '~/libs/enums/app-route.enum';

const NotFound = (): JSX.Element => (
  <div>
    <h2>
      Oops, the dreaded <span>404</span>.
    </h2>

    <p>Let&apos;s get you back on track.</p>

    <p>
      <NavLink to={AppRoute.ROOT}>Back to Home page</NavLink>
    </p>
  </div>
);

export { NotFound };
