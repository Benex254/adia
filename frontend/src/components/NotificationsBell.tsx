import styled from "styled-components";
import { Notifications } from "@mui/icons-material";

const NotificationBell = styled.button`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: transparent;
  color: white;
  padding: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NotificationsBell = () => {
  return (
    <NotificationBell>
      <Notifications style={{ color: "white" ,fontSize:24}} />
    </NotificationBell>
  );
};

export default NotificationsBell;
