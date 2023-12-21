import styled from 'styled-components';
import LOGO from '/src/data/img/logo-light.png';

const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  height: 9.6rem;
  width: auto;
`;

function Logo() {
  return (
    <StyledLogo>
      <Img src={LOGO} alt="Logo" />
    </StyledLogo>
  );
}

export default Logo;
