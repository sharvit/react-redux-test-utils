# Unit testing reducers

```js
/* LoginFormReducer.js */
import {
  LOGIN_FORM_UPDATE_USERNAME,
  LOGIN_FORM_UPDATE_PASSWORD,
  LOGIN_FORM_TOGGLE_REMEMBER_ME,
} from '../LoginFormConstants';

const initialState = Immutable({
  username: '',
  password: '',
  rememberMe: false,
});

export default (state = initialState, action) => {
  const { payload } = action;

  switch (action.type) {
    case LOGIN_FORM_UPDATE_USERNAME:
      return state.set('username', payload);
    case LOGIN_FORM_UPDATE_PASSWORD:
      return state.set('password', payload);
    case LOGIN_FORM_TOGGLE_REMEMBER_ME:
      return state.set('rememberMe', !state.rememberMe);
    default:
      return state;
  }
};
```

```js
/* LoginFormReducer.test.js */
import { testReducerSnapshotWithFixtures } from 'react-redux-test-utils';
import {
  LOGIN_FORM_UPDATE_USERNAME,
  LOGIN_FORM_UPDATE_PASSWORD,
  LOGIN_FORM_TOGGLE_REMEMBER_ME,
} from '../LoginFormConstants';

import reducer from '../LoginFormReducer';

const fixtures = {
  'it should update username': {
      action: {
        type: LOGIN_FORM_UPDATE_USERNAME,
        payload: { username: 'some-username' }
      }
  },
  'it should update password': {
    action: {
      type: LOGIN_FORM_UPDATE_PASSWORD,
      payload: { password: 'some-password' }
    }
  },
  'it should toggle remember-me': {
    state: { rememberMe: false },
    action: {
      type: LOGIN_FORM_TOGGLE_REMEMBER_ME,
    }
  },
};

describe('LoginForm - Reducer', () =>
  testReducerSnapshotWithFixtures(reducer, fixtures));
```

Next: [Learn how to write unit-testing for your selectors ->](unit-testing-selectors.md)
