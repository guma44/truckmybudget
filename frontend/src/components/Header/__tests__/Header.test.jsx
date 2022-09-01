import { shallow } from 'enzyme';

import Header from '../index';


it('should render', () => {
  const container = shallow(<Header />);
  expect(container).toBeTruthy();
});
