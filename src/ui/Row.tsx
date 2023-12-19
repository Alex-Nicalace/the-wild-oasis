import styled, { css } from 'styled-components';

interface IRowProps {
  type?: 'horizontal' | 'vertical';
}
const Row = styled.div<IRowProps>`
  display: flex;
  ${({ type }) =>
    type === 'horizontal' &&
    css`
      justify-content: space-between;
      align-items: center;
    `}
  ${({ type = 'vertical' }) =>
    type === 'vertical' &&
    css`
      flex-direction: column;
      gap: 1.6rem;
    `}
`;
// пропсы по умолчанию
// Row.defaultProps = {
//   type: 'vertical' as const,
// };

export default Row;
