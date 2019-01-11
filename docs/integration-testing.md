# Integration testing

Integration testing should test the connected-component while activating full redux lifecycle.

## Integration file

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

## Integration test file

```js
/* __tests__/integration.test.js */
import React from 'react';
import { IntegrationTestHelper } from 'react-redux-test-utils';

import UserProfile, { reducers } from '../index';

describe('UserProfile - Integration Test', () => {
  it('should flow', () => {
    const integrationTestHelper = new IntegrationTestHelper(reducers);

    const component = integrationTestHelper.mount(
      <UserProfile user="some-user" />
    );

    // The user-avatar should not be shown
    expect(component.exists('UserAvatar')).toEqual(false);
    integrationTestHelper.takeStoreSnapshot('initial state');

    // trigger checkbox change
    component
      .find('input#show-avatar-toggler')
      .simulate('change', { target: { checked: true } });

    // The user-avatar should be shown now
    expect(component.exists('UserAvatar')).toEqual(true);
    integrationTestHelper.takeStoreAndLastActionSnapshot(
      'Update to show the user-avatar'
    );
  });
});
```
