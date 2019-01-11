# Testing components

Before we can start unit testing our components,
we need to adopt an approach when we export 2 versions of the same component,
one connected to redux and one unconnected.

[Learn how to manage your code folder structure](manage-your-code-folder-structure.md)

## Component example

```js
/* UserProfile.js */
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
```

## Unit testing

```js
/* UserProfile.test.js */
import { testComponentSnapshotsWithFixtures } from 'react-redux-test-utils';
import UserProfile from '../UserProfile';

const fixtures = {
  'should render UserProfile': {
    user: 'some-user',
  },
  'should render UserProfile with avatar': {
    user: 'some-user',
    showAvatar: true,
  },
  'should render UserProfile with posts and photos': {
    user: 'some-user',
    showPosts: true,
    showPhotos: true,
  },
};

describe('UserProfile - component', () =>
  testComponentSnapshotsWithFixtures(UserProfile, fixtures));
```

Next: [Learn how to write unit-testing for your actions ->](unit-testing-actions.md)
