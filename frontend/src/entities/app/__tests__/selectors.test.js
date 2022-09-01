import * as selectors from '../selectors';


const state = {
  date: new Date(),
  application: {
    user: global.testUtils.getMockedUser(),
    status: AppStatus.INITIAL,
  },
};

it('application/selectors: applicationUserSelector should return user from state', () => {
  expect(selectors.applicationUserSelector(state)).toEqual(
    state.application.user
  );
});

it('application/selectors: applicationStatusSelector should return user from state', () => {
  expect(selectors.applicationStatusSelector(state)).toEqual(
    state.application.status
  );
});
