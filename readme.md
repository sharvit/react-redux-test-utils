# react-redux-test-utils

> Utils for testing react-redux applications using enzyme and jest snapshots

[![Package Version](https://img.shields.io/npm/v/react-redux-test-utils.svg?style=flat-square)](https://www.npmjs.com/package/react-redux-test-utils)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Downloads Status](https://img.shields.io/npm/dm/react-redux-test-utils.svg?style=flat-square)](https://npm-stat.com/charts.html?package=react-redux-test-utils&from=2016-04-01)
[![Build Status: Linux](https://img.shields.io/travis/sharvit/react-redux-test-utils/master.svg?style=flat-square)](https://travis-ci.org/sharvit/react-redux-test-utils)
[![Coverage Status](https://coveralls.io/repos/github/sharvit/react-redux-test-utils/badge.svg?branch=master)](https://coveralls.io/github/sharvit/react-redux-test-utils?branch=master)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
[![dependencies Status](https://david-dm.org/sharvit/react-redux-test-utils/status.svg)](https://david-dm.org/sharvit/react-redux-test-utils)
[![devDependencies Status](https://david-dm.org/sharvit/react-redux-test-utils/dev-status.svg)](https://david-dm.org/sharvit/react-redux-test-utils?type=dev)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![MIT License](https://img.shields.io/npm/l/stack-overflow-copy-paste.svg?style=flat-square)](http://opensource.org/licenses/MIT)

## Why

1. It separates between unit-testing and integration-testing and gives you tools to write both.
2. It reduces the boilerplate.
3. It uses a data-driven approach for unit-testing so instead of writing test logic, you define objects that describe your tests.
4. It is very fast and easy to write tests.
5. It comes with enzyme and uses snapshots testing.

## Installation

```sh
# with npm
npm install --save-dev react-redux-test-utils

# with yarn
yarn add -D react-redux-test-utils
```

## Usage

`react-redux-test-utils` allow you to write unit-testing that look like this:

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

It also provide the `IntegrationTestHelper` that helps with writing integration-testing:

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

## Documentations

1. [Manage your folder structure.](./docs/manage-your-code-folder-structure.md)
2. [Unit-testing components.](./docs/unit-testing-components.md)
3. [Unit-testing redux actions.](./docs/unit-testing-actions.md)
4. [Unit-testing redux reducers.](./docs/unit-testing-reducers.md)
5. [Unit-testing redux selectors.](./docs/unit-testing-selectors.md)
6. [Integration-testing.](./docs/integration-testing.md)

## Related

1. [generator-react-domain](https://github.com/glekner/generator-react-domain) will help you to generate react components with domain-driven file structuring and with tests file that uses the `react-redux-test-utils`.

## License

MIT &copy; [Avi Sharvit](https://sharvit.github.io)
