import { Menu, MenuItem } from "./Menu";
import Avatar from "./Avatar";
import { House } from "@mui/icons-material";

const UserAvatar = () => {
  return (
    <Menu icon={<Avatar />} styles={{ backgroundColor: "violet" }}>
      <MenuItem>
        <House />
        house
      </MenuItem>
      <MenuItem>
        <House />
        house
      </MenuItem>
      <MenuItem>
        <House />
        house
      </MenuItem>
    </Menu>
  );
};

export default UserAvatar;
