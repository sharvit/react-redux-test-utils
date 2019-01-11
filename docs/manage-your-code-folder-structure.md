# Manage you code folder structure

Before we can start unit testing our components,
we need to adopt an aproach when we exports 2 versions of the same component,
one connected to redux and one unconnected.

With this approach, we will manage our code folder structure by domain level and we will create small independent and connected mini-packages.
We will write integration-testing with full redux-flow for our connected component/min-package, and unit-testing for unconnected components, actions, reducers, selectors, helpers and co...

## Folder tree

```
src
├── components
│   └── UserProfile
│       ├── index.js // integration-file/connected-component
│       ├── UserProfile.js // main component
│       ├── UserProfileActions.js
│       ├── UserProfileConstants.js
│       ├── UserProfileReducer.js
│       ├── UserProfileSelectors.js
│       ├── __tests__ // test files
│       │   ├── integration.test.js // integration-test
│       │   ├── UserProfile.test.js
│       │   ├── UserProfileActions.test.js
│       │   ├── UserProfileReducer.test.js
│       │   └── UserProfileSelectors.test.js
│       └── components // inner components
│           ├── UserAvatar.js
│           ├── UserAvatar.test.js
│           ├── UserPosts.js
│           └── UserPosts.test.js
└── store
    └── index.js
```

## The main unconnected component

[Learn how to write unit-testing for your unconnected components.](unit-testing-components.md)

```js
/* UserProfile.js */
import React from 'react';

import UserAvatar from './components/UserAvatar';
import UserDetailsBox from './components/UserDetailsBox';
import UserPhotos from './components/UserPhotos';
import UserPosts from './components/UserPosts';

const UserProfile = ({
  user,
  showAvatar,
  showPosts,
  showPhotos,
  updateShowAvatar,
  updateShowPhotos,
  updateShowPosts,
}) => (
  <div className="user-profile">
    <UserDetailsBox user={user} />
    {showAvatar && <UserAvatar user={user} size="sm" />}
    {showPosts && <UserPhotos user={user} count={5} sort="DESC" />}
    {showPhotos && <UserPosts user={user} count={5} sort="DESC" />}
    <input
      id="show-avatar-toggler"
      type="checkbox"
      checked={showAvatar}
      onChange={e => updateShowAvatar(e.target.checked)}
    />
    <input
      id="show-photos-toggler"
      type="checkbox"
      checked={showPhotos}
      onChange={e => updateShowPhotos(e.target.checked)}
    />
    <input
      id="show-posts-toggler"
      type="checkbox"
      checked={showPosts}
      onChange={e => updateShowPosts(e.target.checked)}
    />
  </div>
);

export default UserProfile;
```

## The integration file

[Learn how to write integration-testing for your connected components.](integration-testing.md)

```js
/* index.js */
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actions from './UserProfileActions';
import reducer from './UserProfileReducer';
import {
  selectShowAvatar,
  selectShowPosts,
  selectShowPhotos,
} from './UserProfileSelectors';

import UserProfile from './UserProfile';

// map state to props
const mapStateToProps = state => ({
  showAvatar: selectShowAvatar(state),
  showPosts: selectShowPosts(state),
  showPhotos: selectShowPhotos(state),
});

// map action dispatchers to props
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

// export reducers
export const reducers = { userProfile: reducer };

// export connected component
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserProfile);
```

Next: [Learn how to write unit-testing for your unconnected components ->](unit-testing-components.md)
