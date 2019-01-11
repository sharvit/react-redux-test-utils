# Unit testing reducers

```js
/* UserProfileReducer.js */
const initialState = Immutable({
  showAvatar: false,
  showPosts: false,
  showPhotos: false,
});

export default (state = initialState, action) => {
  const { payload } = action;

  switch (action.type) {
    case USER_PROFILE_UPDATE_AVATAR:
      return state.set('showAvatar', payload);
    case USER_PROFILE_UPDATE_POSTS:
      return state.set('showPosts', payload);
    case USER_PROFILE_UPDATE_PHOTOS:
      return state.set('showPhotos', payload);
    default:
      return state;
  }
};
```

```js
/* UserProfileReducer.test.js */
import { testSelectorsSnapshotWithFixtures } from 'react-redux-test-utils';
import {
  selectShowAvatar,
  selectShowPosts,
  selectShowPhotos,
} from '../UserProfileSelectors';

const state = {
  userProfile: {
    showAvatar: 'showAvatar',
    showPosts: 'showPosts',
    showPhotos: 'showPhotos',
  },
};

const fixtures = {
  'should select show-avatar': () => selectShowAvatar(state),
  'should select show-posts': () => selectShowPosts(state),
  'should select show-photos': () => selectShowPhotos(state),
};

describe('UserProfile - Selectors', () =>
  testSelectorsSnapshotWithFixtures(fixtures));
```

Next: [Learn how to write unit-testing for your selectors ->](unit-testing-selectors.md)
