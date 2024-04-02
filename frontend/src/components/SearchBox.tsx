import styled from "styled-components"
import { Search } from "@mui/icons-material"

const Container = styled.div`
  display: flex;
  align-items: center;
  width: 150px;
  border-radius: 8px;
  padding: 4px 8px;
  background-color: white;
  cursor: text;
`;

const SearchInput= styled.input`
  border-radius: 8px;
  width: 100%;
  background-color: transparent;
`
const SearchBox = () => {
  return (
    <Container>
      <SearchInput aria-label="search blog or blogger"  placeholder="search"/>
      <Search style={{color:"black"}}/>
    </Container>
  )
}

export default SearchBox