import styled from 'styled-components';
import GlobalStyles from './styles/GlobalStyles';
import Button from './ui/Button';
import Heading from './ui/Heading';
import Row from './ui/Row';
import Input from './ui/Input';

const StyledApp = styled.main`
  padding: 20px;
`;

function App(): JSX.Element {
  return (
    <>
      <GlobalStyles />
      <StyledApp>
        <Row type="horizontal">
          <Heading as="h1">Hello, World!</Heading>
          <div>
            <Heading as="h2">Hello, World!</Heading>
            <Button>Button</Button>
            <Button>Button</Button>
          </div>
        </Row>
        <Row>
          <Heading as="h3">Form</Heading>
          <form action="#">
            <Input placeholder="Email" />
            <Input placeholder="Email" />
          </form>
        </Row>
      </StyledApp>
    </>
  );
}

export default App;
