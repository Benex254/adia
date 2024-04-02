import Logo from "./Logo.tsx"
import NotificationsBell from "./NotificationsBell.tsx"
import SearchBox from "./SearchBox.tsx"
import UserAvatar from "./UserAvatar.tsx"
import styled from "styled-components"

const Container = styled.div`
    background:black;
    position:sticky;
    top:0;
    display:flex;
    color:white;
    padding: 16px;
    justify-content: space-between;
    width: 100%;
    align-items: center;
    box-shadow: 0px 5px 10px 0px black;

`

const RightContainer = styled.div`
    display:flex;
    align-items: center;
    gap:16px;
    width: 100%;
    justify-content: end;
`



const NavBar = () => {
  return (
        <Container>
        <Logo/>
        <RightContainer>
            <SearchBox/>
            <NotificationsBell/>
            <UserAvatar/>
        </RightContainer>
        </Container>
    )
}

export default NavBar