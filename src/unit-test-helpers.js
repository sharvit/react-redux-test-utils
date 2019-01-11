import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

/**
 * Fixtures for a component
 * where the key is the description
 * and the value is the component props.
 *
 * @typedef  {Object} ComponentFixtures
 * @property {Object} * props object.
 */

/**
 * Fixtures for a reducer
 * where the key is the description
 * and the value is a ReducerFixture
 *
 * @typedef  {Object} ReducerFixtures
 * @property {ReducerFixture} * props object.
 */

/**
 * Fixture for a reducer.
 *
 * @typedef  {Object} ReducerFixture
 * @property {Object} state  Current state.
 * @property {Object} action Action object with type and payload.
 */

/**
 * Fixtures for a component
 * where the key is the description
 * and the value is the component props.
 *
 * @typedef  {Object} ComponentFixturesResults
 * @property {string} description Fixture description.
 * @property {EnzymeComponent} component enzyme shallow rendered component.
 */

/**
 * Fixtures for actions
 * where the key is the description
 * and the value is the action.
 *
 * @typedef  {Object} ActionsFixtures
 * @property {Object} * Action to run.
 */

/**
 * Shallow render a component multipile times with fixtures
 * @since 0.1.0
 * @param  {ReactComponent}    Component Component to shallow-render
 * @param  {ComponentFixtures} fixtures  Fixtures to render
 * @return {ComponentFixturesResults[]}  Shallow rendering results.
 *
 * @example
 * const components = shallowRenderComponentWithFixtures(Button, {
 *   'should render a button': { href: 'https://google.com' },
 *   'should render a button with icon': { href: 'https://github.com', icon: 'github' },
 * });
 *
 * // results
 * [{
 *   'should render a button': ShllowRendered(Button),
 *   'should render a button': ShllowRendered(ButtonWithIcon),
 * }]
 */
export const shallowRenderComponentWithFixtures = (Component, fixtures) =>
  Object.entries(fixtures).map(([description, props]) => ({
    description,
    component: shallow(<Component {...props} />),
  }));

/**
 * Test a component with fixtures and snapshots
 * @since 0.1.0
 * @param  {ReactComponent}    Component Component to test
 * @param  {ComponentFixtures} fixtures  Fixtures to test
 *
 * @example
 * describe('Button', () => testComponentSnapshotsWithFixtures(Button, {
 *   'should render a button': { href: 'https://google.com' },
 *   'should render a button with icon': { href: 'https://github.com', icon: 'github' },
 * });
 *
 * // results
 * describe('Button', () => {
 *   test('should render a button', () => {
 *     // renders button and test against snapshot
 *   });
 *   test('should render a button with icon', () => {
 *     // renders button with icon and test against snapshot
 *   });
 * });
 */
export const testComponentSnapshotsWithFixtures = (Component, fixtures) =>
  shallowRenderComponentWithFixtures(Component, fixtures).forEach(
    ({ description, component }) =>
      it(description, () => expect(toJson(component)).toMatchSnapshot())
  );

/**
 * Run an action (sync or async) and except the results to much snapshot
 * @since 0.1.0
 * @param  {Function} action Action to run
 * @return {Promise}
 * @example
 * test('should show modal', () => testActionSnapshot(showModal));
 * @example
 * test('load user', () => testActionSnapshot(loadUser));
 */
export const testActionSnapshot = async action => {
  const actionResults = action();

  // if it's an async action
  if (typeof actionResults === 'function') {
    const dispatch = jest.fn();
    await actionResults(dispatch);

    expect(dispatch.mock.calls).toMatchSnapshot();
  } else {
    expect(actionResults).toMatchSnapshot();
  }
};

/**
 * Test actions with fixtures and snapshots
 * @since 0.1.0
 * @param {ActionsFixtures} fixtures Fixtures to test
 *
 * @example
 * describe('PageActions', () => testActionSnapshotWithFixtures({
 *   'should show notifications box': () = showNotificationsBox(),
 * });
 *
 * // results
 * describe('PageActions', () => {
 *   test('should show notifications box', () => {
 *     // run showNotificationsBox() and test results against snapshot
 *   });
 * });
 *
 * @example
 * describe('UserActions', () => testActionSnapshotWithFixtures({
 *   'should login user': () = login({
 *     username: 'some-username',
 *     password: 'some-password',
 *   }),
 *   'should load update user email': () = updateEmail({
 *     username: 'some-username',
 *     oldEmail: 'some@email.com',
 *     newEmail: 'some-other@email.com',
 *   }),
 * });
 *
 * // results
 * describe('UserActions', () => {
 *   test('should login user', () => {
 *     // run login() and test results against snapshot
 *   });
 *   test('should load update user email', () => {
 *     // run updateEmail() and test results against snapshot
 *   });
 * });
 */
export const testActionSnapshotWithFixtures = fixtures =>
  Object.entries(fixtures).forEach(([description, runAction]) =>
    it(description, () => testActionSnapshot(runAction))
  );

/**
 * Test a reducer with fixtures and snapshots
 * @since 0.1.0
 * @param  {Function} reducer Reducer to test
 * @param  {ReducerFixtures} fixtures Reducer fixtures
 *
 * @example
 * describe('LoginForm reducer', () => testReducerSnapshotWithFixtures(loginReducer, {
 *   'it should update username': {
 *     action: {
 *       type: LOGIN_FORM_UPDATE_USERNAME,
 *       payload: { username: 'some-username' }
 *     }
 *   },
 *   'it should update password': {
 *     action: {
 *       type: LOGIN_FORM_UPDATE_PASSWORD,
 *       payload: { password: 'some-password' }
 *     }
 *   },
 *   'it should toggle remember-me': {
 *     state: { rememberMe: false },
 *     action: {
 *       type: LOGIN_FORM_TOGGLE_REMEMBER_ME,
 *     }
 *   },
 * }));
 *
 */
export const testReducerSnapshotWithFixtures = (reducer, fixtures) => {
  const reduce = ({ state, action = {} } = {}) => reducer(state, action);
  Object.entries(fixtures).forEach(([description, action]) =>
    it(description, () => expect(reduce(action)).toMatchSnapshot())
  );
};

/**
 * Test selectors with fixtures and snapshots
 * @since 0.1.0
 * @param  {Object} fixtures  key=fixture description value=selector runner function
 *
 * @example
 * cost state = { user: { loggedIn: true, firstName: 'Eli', lastName: 'Ohana' } };
 *
 * describe('UserSelectors', () => testSelectorsSnapshotWithFixtures({
 *   'should select is-user-logged-in': selectIsUserLoggedIn(state),
 *   'should select user-full-name': selectUserFullName(state),
 * }));
 */
export const testSelectorsSnapshotWithFixtures = fixtures =>
  Object.entries(fixtures).forEach(([description, selectorRunner]) =>
    it(description, () => expect(selectorRunner()).toMatchSnapshot())
  );
