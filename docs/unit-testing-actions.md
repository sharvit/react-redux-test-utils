# Testing actions

## Testing regular actions

Regular actions are simple actions that return a single object.
Assuming we have this `UserProfileActions.js`:

```js
/* UserProfileActions.js */
export const updateShowAvatar = showAvatar => ({
  type: USER_PROFILE_UPDATE_AVATAR,
  payload: showAvatar,
});

export const updateShowPosts = showPosts => ({
  type: USER_PROFILE_UPDATE_POSTS,
  payload: showPosts,
});

export const updateShowPhotos = showPhotos => ({
  type: USER_PROFILE_UPDATE_PHOTOS,
  payload: showPhotos,
});
```

Testing this file should be as easy as running those functions and saving the results as a snapshot.
`testActionSnapshotWithFixtures` will run over the fixtures and will save each results snapshot.

```js
/* UserProfileActions.test.js */
import { testActionSnapshotWithFixtures } from 'react-redux-test-utils';
import {
  updateShowAvatar,
  updateShowPosts,
  updateShowPhotos,
} from '../UserProfileActions';

const fixtures = {
  'should update-show-avatar': () => updateShowAvatar(true),
  'should update-show-posts': () => updateShowPosts(true),
  'should update-show-photos': () => updateShowPhotos(true),
};

describe('UserProfile - Actions', () =>
  testActionSnapshotWithFixtures(fixtures));
```

The end results will be similar to:

```js
import { testActionSnapshotWithFixtures } from 'react-redux-test-utils';
import {
  updateShowAvatar,
  updateShowPosts,
  updateShowPhotos,
} from '../UserProfileActions';

describe('UserProfile - Actions', () => {
  test('should update-show-avatar', () => {
    const results = updateShowAvatar(true);
    expect(results).toMatchSnapshot();
  });
  test('should update-show-posts', () => {
    const results = updateShowPosts(true);
    expect(results).toMatchSnapshot();
  });
  test('should update-show-photos', () => {
    const results = updateShowPhotos(true);
    expect(results).toMatchSnapshot();
  });
});
```

## Testing thunk async actions

Async thunk doesn't return a simple object. Instead, they return an async function that receives a dispatch function as an argument.
Assuming we have the following action:

```js
import api from '../common/api';

export const login = ({ username, password }) => async dispatch => {
  try {
    dispatch({
      type: 'LOGIN_REQUEST',
      payload: { username, password },
    });

    const results = await api.post('/login', { username, password });

    dispatch({
      type: 'LOGIN_SUCCEED',
      payload: { results },
    });
  } catch (error) {
    dispatch({
      type: 'LOGIN_ERROR',
      payload: { error },
    });
  }
};
```

```js
import { testActionSnapshotWithFixtures } from 'react-redux-test-utils';
import api from '../common/api';
import { login } from './loginActions';

jest.mock('../common/api');

describe('Login Actions', () => {
  const correctLogin = { username: 'some-username', password: 'some-password' };
  const wrongLogin = {
    username: 'some-wrong-username',
    password: 'some-wrong-password',
  };

  api.login.mockImplementation(async credentials =>
    credentials === correctLogin
      ? 'succees'
      : throw new Error('wrong email and password')
  );

  testActionSnapshotWithFixtures({
    'should login and succeed': login(correctLogin),
    'should login and fail': login(wrongLogin),
  });
});
```

Next: [Learn how to write unit-testing for your reducers ->](unit-testing-reducers.md)
