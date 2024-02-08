import { isValidElement } from 'react';
import styled from 'styled-components';

const StyledFormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

type ControlJSX = {
  label?: string;
  children: JSX.Element;
  error?: string;
};

function isControlJSX(value: any): value is ControlJSX {
  return typeof value === 'object' && isValidElement(value.children);
}

type FormRowProps =
  | ControlJSX
  | {
      children: React.ReactNode;
    };
function FormRow(props: FormRowProps): JSX.Element {
  // const { children } = props;

  if (!isControlJSX(props))
    return <StyledFormRow>{props.children}</StyledFormRow>;

  const { children, label, error } = props;

  return (
    <StyledFormRow>
      {label && <Label htmlFor={children.props?.id}>{label}</Label>}
      {children}
      {error && <Error>{error}</Error>}
    </StyledFormRow>
  );
}

export default FormRow;
