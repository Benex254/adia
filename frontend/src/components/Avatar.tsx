import styled from "styled-components";
import { Person } from "@mui/icons-material";

const AvatarWrapper = styled.div`
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

const Avatar = () => {
  return (
    <AvatarWrapper>
      <Person style={{ fontSize: 20 }} />
    </AvatarWrapper>
  );
};

export default Avatar;
