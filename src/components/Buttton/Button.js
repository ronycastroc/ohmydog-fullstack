import styled from "styled-components";

export const Button = ({ children }) => {
  return (
    <Wrapper >
      <p>{children}</p>
    </Wrapper>           
  );
};

const Wrapper = styled.button`
  background-color: var(--button-color);
  width: auto;
  height: 35px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  margin-bottom: 10px;
  cursor: pointer;
  display: table;
  border: 1px solid var(--black-color);
  transition: 0.4s;

  p {
    padding-left: 10px;
    padding-right: 10px;
    font-weight: 700;
    text-align:center; 
    vertical-align: middle;
    display: table-cell;
    font-family: 'Roboto Slab', serif;
    font-size: 0.95rem;
  }

  &:hover {
      transform: translateY(-3px);
      box-shadow: 0 4px 4px rgba(0, 0, 0, 0.4);
   }  
`;