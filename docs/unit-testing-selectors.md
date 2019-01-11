# Unit testing selectors

## Selectors file
```js
/* UserProfileSelectors.js */
const selectState = state => state.userProfile;

export const selectShowAvatar = state => selectState(state).showAvatar;
export const selectShowPosts = state => selectState(state).showPosts;
export const selectShowPhotos = state => selectState(state).showPhotos;
```

## Unit testing file

```js
/* UserProfileSelectors.test.js */
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

Next: [Learn how to write integration-testing ->](integration-testing.md)
