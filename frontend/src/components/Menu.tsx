import { useState, useRef } from "react";
import styled from "styled-components";

const MenuContainer = styled.div<{
  top?: number;
  left?: number;
  styles?: React.CSSProperties;
}>`
  position: absolute;
  top: ${(props) => (props.top ? props.top : 120)}%;
  left: ${(props) => (props.left ? props.left : 50)}%;
  padding: 8px 4px;
  box-shadow: 0px 0px 10px 1px black;
  display: flex;
  flex-direction: column;
  background-color: orange;
  width: 100px;
  text-overflow: ellipsis;
  transform: translateX(-50%);
  ${(props) => {
    return props.styles && { ...props.styles };
  }}
`;

const MenuWrapper = styled.div`
  position: relative;
`;

const MenuButton = styled.div`
  color: yellow;
`;

const MenuName = styled.div`
  font-weight: bolder;
`;

const MenuItemWrapper = styled.div`
  display: flex;
  gap: 4px;
  color: black;
`;

interface MenuProps {
  children: React.ReactNode;
  icon?: JSX.Element;
  name?: string;
  top?: number;
  left?: number;
  styles?: React.CSSProperties;
}

interface MenuItemProps {
  children: React.ReactNode;
}

const MenuItem: React.FC<MenuItemProps> = ({ children }) => {
  return <MenuItemWrapper>{children}</MenuItemWrapper>;
};

const Menu: React.FC<MenuProps> = ({
  children,
  icon,
  name,
  top,
  left,
  styles,
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const menuWrapper = useRef<HTMLDivElement>(null);
  // let position = menuWrapper.current?.getBoundingClientRect()
  //   ? menuWrapper.current?.getBoundingClientRect()
  //   : { top: 0, left: 0 };

  /* toggles between open and closed menu */
  const handleToggleMenu = () => {
    // position = menuWrapper.current?.getBoundingClientRect()
    //   ? menuWrapper.current?.getBoundingClientRect()
    //   : { top: 0, left: 0 };
    showMenu ? setShowMenu(false) : setShowMenu(true);
  };

  return (
    <MenuWrapper ref={menuWrapper}>
      <MenuButton onClick={() => handleToggleMenu()}>
        {icon && icon} {name && <MenuName>{name}</MenuName>}
      </MenuButton>
      {showMenu && (
        <MenuContainer top={top} left={left} styles={styles}>
          {children}
        </MenuContainer>
      )}
    </MenuWrapper>
  );
};

export { Menu, MenuItem };
