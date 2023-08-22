import { Link } from '~/libs/components/components.js';
import { AppRoute } from '~/libs/enums/app-route.enum';

const NotFound = (): JSX.Element => (
  <div>
    <h2>
      Oops, the dreaded <span>404</span>.
    </h2>

    <p>Let&apos;s get you back on track.</p>

    <Link to={AppRoute.ROOT}>
      <span>Back to Home page</span>
    </Link>
  </div>
);

export { NotFound };
