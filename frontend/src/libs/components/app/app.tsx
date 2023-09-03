import 'react-toastify/dist/ReactToastify.css';
import 'src/assets/css/styles.scss';
// import { AppRoute } from '~/libs/enums/enums.js';
import // useAppDispatch,
// useAppSelector,
// useEffect,
// useLocation,
'~/libs/hooks/hooks.js';
import // Checkbox,
// Header,
// Link,
// RouterOutlet,
'~/libs/components/components.js';

import { useState } from 'react';

import { FileInput } from '~/libs/components/file-input/file-input.js';
// import { actions as userActions } from '~/slices/users/users.js';

const App: React.FC = () => {
  // const { pathname } = useLocation();
  // const dispatch = useAppDispatch();
  // const { users, dataStatus } = useAppSelector(({ users }) => ({
  //   users: users.users,
  //   dataStatus: users.dataStatus,
  // }));
  //
  // const isRoot = pathname === AppRoute.ROOT;
  //
  // useEffect(() => {
  //   if (isRoot) {
  //     void dispatch(userActions.loadAll());
  //   }
  // }, [isRoot, dispatch]);
  //
  const [disabled] = useState(false);

  return (
    <>
      {/*<Header />*/}

      {/*<ul className="App-navigation-list">*/}
      {/*  <li>*/}
      {/*    <Link to={AppRoute.ROOT}>Root</Link>*/}
      {/*  </li>*/}
      {/*  <li>*/}
      {/*    <Link to={AppRoute.SIGN_IN}>Sign in</Link>*/}
      {/*  </li>*/}
      {/*  <li>*/}
      {/*    <Link to={AppRoute.SIGN_UP}>Sign up</Link>*/}
      {/*  </li>*/}
      {/*</ul>*/}
      {/*<p>Current path: {pathname}</p>*/}

      {/*<div>*/}
      {/*  <RouterOutlet />*/}
      {/*</div>*/}
      {/*{isRoot && (*/}
      {/*  <>*/}
      {/*    <h2>Users:</h2>*/}
      {/*    <h3>Status: {dataStatus}</h3>*/}
      {/*    <ul>*/}
      {/*      {users.map((it) => (*/}
      {/*        <li key={it.id}>{it.phone}</li>*/}
      {/*      ))}*/}
      {/*    </ul>*/}
      {/*  </>*/}
      {/*)}*/}

      <FileInput
        label={'Drop file'}
        isDisabled={disabled}
        // fileInputCustomConfig={{ maxFiles: 2, multiple: true }}
      />
    </>
  );
};

export { App };
