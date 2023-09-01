import 'react-toastify/dist/ReactToastify.css';
import 'src/assets/css/styles.scss';
// import { AppRoute } from '~/libs/enums/enums.js';
import // useAppDispatch,
// useAppSelector,
// useEffect,
// useLocation,
'~/libs/hooks/hooks.js';

import { useState } from 'react';

import {
  // Checkbox,
  Header,
  // Link,
  // RouterOutlet,
} from '~/libs/components/components.js';
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
      <Header />

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
        name={'pic'}
        label={'Drop here'}
        isDisabled={disabled}
        // fileInputCustomConfig={{ maxSize: 1 }}
      />
      {/*<button onClick={() => setDisabled((state) => !state)}>*/}
      {/*  TOGGLE DISABLE*/}
      {/*</button>*/}
    </>
  );
};

export { App };
