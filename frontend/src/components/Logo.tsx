import styled from "styled-components";
import { Book } from "@mui/icons-material";

const Link = styled.a`
  text-decoration: none;
  color: white;
  font-size: 32px;
  cursor:pointer;
`;
const Container = styled.div`
  display: flex;
  align-items: center;
  gap:8px;
`;

const Logo = () => {
  return (
    <Container>
      <Book />
      <Link href="/">Adia</Link>
    </Container>
  );
};

export default Logo;
