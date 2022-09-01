import reducer, { loadApp, appStatusSet, appUserSet } from '../index';


const mockStore = testUtils.createMockStore();

describe('app: simple action test suite', () => {
  it('should create appStatusSet action', () => {
    expect(appStatusSet(AppStatus.INITIAL)).toMatchSnapshot();
    expect(appStatusSet(AppStatus.APP_WILL_LOAD)).toMatchSnapshot();
  });

  it('should create appUserSet action', () => {
    const user = global.testUtils.getMockedUser();
    expect(appUserSet(null)).toMatchSnapshot();
    expect(appUserSet(user)).toMatchSnapshot();
  })
});

describe('app: complex actions test suite', () => {
  it('should execute loadApp', async () => {

    const user = global.testUtils.getMockedUser();
    const expectedActions = [
      appStatusSet(AppStatus.APP_WILL_LOAD),
      appUserSet(user),
      appStatusSet(AppStatus.APP_DID_LOAD),
    ];

    // get store access
    const store = mockStore();
    const { dispatch } = store;

    await loadApp()(dispatch);
    // test actions
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should execute loadApp with error', async () => {
    const error = new Error('Could not get user information');

    // get store access
    const store = mockStore();
    const { dispatch } = store;

    await loadApp()(dispatch);

    const expectedActions = [
      appStatusSet(AppStatus.APP_WILL_LOAD),
      appUserSet(null),
      appStatusSet(AppStatus.APP_DID_LOAD),
    ];

    expect(store.getActions()).toEqual(expectedActions);
  });
});

describe('app: reducers test suite', () => {
  const initialState = {
    status: AppStatus.INITIAL,
    user: null,
  };

  it('should return the initial state', () => {
    expect(reducer(undefined, { type: 'not an action' })).toEqual(initialState);
  });

  it('should handle appStatusSet', () => {
    // create new action
    const action = appStatusSet(AppStatus.APP_DID_LOAD);

    expect(
      reducer(
        initialState, // use initial state
        action // dispatch action
      )
    ).toEqual({
      ...initialState,
      status: AppStatus.APP_DID_LOAD,
    });
  });

  it('should handle appUserSet', () => {
    // create new action
    const user = global.testUtils.getMockedUser();
    const action = appUserSet(user);

    expect(
      reducer(
        initialState, // use initial state
        action // dispatch action
      )
    ).toEqual({
      ...initialState,
      user,
    });
  });
});
