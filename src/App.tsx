import styled from 'styled-components';
import GlobalStyles from './styles/GlobalStyles';
import Button from './ui/Button';

const H1 = styled.h1`
  font-size: 30px;
  font-weight: 600;
`;

const StyledApp = styled.main`
  background-color: orangered;
  padding: 20px;
`;

function App(): JSX.Element {
  return (
    <>
      <GlobalStyles />
      <StyledApp>
        <H1>Hello, World!</H1>
        <Button>Button</Button>
      </StyledApp>
    </>
  );
}

export default App;
