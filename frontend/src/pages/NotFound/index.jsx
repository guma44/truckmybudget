import styled from 'styled-components';

const StyledNotFound = styled.div`
  margin-top: 2rem;
`;

const StyledHeader = styled.h1`
  width: 80%;
  margin: 0 auto;
  font-size: 2.5rem;
`;

const StyledCode = styled.code`
  color: "blue";
  padding: 0 0.25rem;
`;

const NotFound = ({ location }) => (
  <StyledNotFound>
    <StyledHeader>
      <strong>Whhooppss</strong>
      it seems there is no page for route:
      <StyledCode>{location.pathname}</StyledCode>
    </StyledHeader>
  </StyledNotFound>
);

export default NotFound;
