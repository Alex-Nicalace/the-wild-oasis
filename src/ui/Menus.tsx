import { createContext, useContext, useState } from 'react';
import { createPortal } from 'react-dom';
import { HiEllipsisVertical } from 'react-icons/hi2';
import styled from 'styled-components';
import { useOutsideClick } from '../hooks/useOutsideClick';
import useLockElementScroll from '../hooks/useLockElementScroll';

const StyledMenu = styled.div<{ $isRelative?: boolean }>`
  ${({ $isRelative }) => ($isRelative ? 'position: relative;' : '')}
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul<{ $position: { x: number; y: number } }>`
  position: absolute;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: ${(props) => props.$position.x}px;
  top: ${(props) => props.$position.y}px;
  z-index: 100;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

interface IMenusContext {
  openId: string;
  open: (name: string) => void;
  close: () => void;
  position: { x: number; y: number };
  setPosition: React.Dispatch<React.SetStateAction<IPosition>>;
  isLockScroll: boolean;
}

interface IPosition {
  x: number;
  y: number;
}

const MenusContext = createContext<IMenusContext>({
  openId: '',
  open: () => {},
  close: () => {},
  position: { x: 0, y: 0 },
  setPosition: () => {},
  isLockScroll: true,
});

function Menus({
  children,
  isLockScroll = true,
}: {
  children: JSX.Element;
  isLockScroll?: boolean;
}) {
  const [openId, setOpenId] = useState('');
  const [position, setPosition] = useState<IPosition>({
    x: 0,
    y: 0,
  });

  const open = setOpenId;
  const close = () => setOpenId('');

  return (
    <MenusContext.Provider
      value={{ openId, open, close, position, setPosition, isLockScroll }}
    >
      {children}
    </MenusContext.Provider>
  );
}

function Menu({ children }: { children: React.ReactNode }) {
  const { isLockScroll } = useContext(MenusContext);
  return <StyledMenu $isRelative={!isLockScroll}>{children}</StyledMenu>;
}

function Toggle({ id }: { id: string }) {
  const { open, close, openId, setPosition, isLockScroll } =
    useContext(MenusContext);

  function handleClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    if (openId === id) {
      close();
      return;
    }

    open(id);
    if (!(e.target instanceof Element)) return;

    const buttonEl = e.target.closest('button');
    if (!buttonEl) return;

    const rect = buttonEl.getBoundingClientRect();
    if (isLockScroll) {
      setPosition({ x: window.innerWidth - rect.right, y: rect.bottom + 8 });
    } else {
      setPosition({ x: 0, y: rect.height + 8 });
    }
  }
  return (
    <StyledToggle onClick={handleClick} data-istoggle>
      <HiEllipsisVertical />
    </StyledToggle>
  );
}

function List({
  children,
  id,
}: {
  children: React.ReactNode;
  id: string;
}): React.ReactNode {
  const { openId, position, close, isLockScroll } = useContext(MenusContext);
  const elenemtRef = useOutsideClick<HTMLUListElement>((e) => {
    if (e.target instanceof Element && e.target.closest('[data-istoggle]'))
      return;
    close();
  }, openId !== id);
  useLockElementScroll(openId !== id || !isLockScroll, 'main');

  if (openId !== id) return null;

  if (isLockScroll)
    return createPortal(
      <StyledList ref={elenemtRef} $position={position}>
        {children}
      </StyledList>,
      document.body
    );

  return (
    <StyledList ref={elenemtRef} $position={position}>
      {children}
    </StyledList>
  );
}

interface IButtonProps {
  children: React.ReactNode;
  icon?: JSX.Element;
  onClick?: () => void;
  disabled?: boolean;
}
function Button({
  children,
  icon,
  onClick,
  disabled,
}: IButtonProps): JSX.Element {
  const { close } = useContext(MenusContext);

  function handleClick() {
    onClick?.();
    close();
  }
  return (
    <li>
      <StyledButton onClick={handleClick} disabled={disabled}>
        {icon}
        <span>{children}</span>
      </StyledButton>
    </li>
  );
}

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;
