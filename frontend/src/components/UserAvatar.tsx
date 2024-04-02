import styled from "styled-components";
import { Person } from "@mui/icons-material";

const Avatar = styled.button`
  width: 30px;
  height: 30px;
  border: 1px solid white;
  border-radius: 50%;
  background: transparent;
  color: white;
  padding: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

// const User = styled(Person)`
// `
const UserAvatar = () => {
  return (
    <Avatar onClick={() => console.log("hello")}>
      <Person style={{ fontSize: 20 }} />
    </Avatar>
  );
};

export default UserAvatar;
