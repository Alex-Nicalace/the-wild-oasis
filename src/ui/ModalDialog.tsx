import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { HiXMark } from 'react-icons/hi2';
import styled from 'styled-components';

const StyledModal = styled.dialog`
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  border: none;
  padding: 3.2rem 4rem;
  transition: all 0.5s;
  &::backdrop {
    background-color: var(--backdrop-color);
    backdrop-filter: blur(4px);
    transition: all 0.5s;
  }
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* Sometimes we need both */
    /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
    color: var(--color-grey-500);
  }
`;
// контекст для модального окна
const ModalContext = createContext<{
  openName: string;
  open: (name: string) => void;
  close: () => void;
}>({
  openName: '',
  open: () => {},
  close: () => {},
});

// родительский компонент модального окна с контекстом
function ModalDialog({ children }: { children: React.ReactNode }): JSX.Element {
  const [openName, setOpenName] = useState('');

  const close = () => setOpenName('');
  const open = (name: string) => setOpenName(name);

  return (
    <ModalContext.Provider value={{ openName, open, close }}>
      {children}
    </ModalContext.Provider>
  );
}

// компонент для открытия модального окна
function Open({
  render,
  windowName,
}: {
  render: (open: () => void) => JSX.Element;
  windowName: string;
}): JSX.Element {
  const { open } = useContext(ModalContext);
  const openWindow = () => open(windowName);
  return <>{render(openWindow)}</>;
}

// компонент для модального окна
function Window({
  render,
  windowName,
}: {
  render: (close: () => void) => JSX.Element;
  windowName: string;
}): JSX.Element {
  const { close, openName } = useContext(ModalContext);
  const dialogEl = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    dialogEl.current?.showModal();
  });

  if (openName !== windowName) return <></>;

  return createPortal(
    <StyledModal
      ref={dialogEl}
      className="modal"
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <Button onClick={close}>
        <HiXMark />
      </Button>
      {render(close)}
    </StyledModal>,
    document.body
  );
}

ModalDialog.Window = Window;
ModalDialog.Open = Open;

export default ModalDialog;
