import { render, unmountComponentAtNode } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from '../App';


const mockStore = testUtils.createMockStore();

const getMockedStore = (initialState = {}) =>
  mockStore({
    appTime: Date.now(),
    application: {
      status: AppStatus.INITIAL,
      user: null,
    },
    ...initialState,
  });

const getApp = () => {
  const store = getMockedStore();
  return (
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
};

describe('App component render test suite', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    render(getApp(), div);
    unmountComponentAtNode(div);
  });
});
