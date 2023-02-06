import styled from "styled-components";

export const Button = ({ children }) => {
  return (
    <Wrapper >
      <p>{children}</p>
    </Wrapper>           
  );
};

const Wrapper = styled.div`
  background-color: var(--buttom-color);
  width: auto;
  height: 40px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 40px;
  margin-bottom: 10px;
  cursor: pointer;
  display: table;
  border: 1px solid var(--black-color);

  p {
    padding-left: 10px;
    padding-right: 10px;
    font-weight: 500;
    text-align:center; 
    vertical-align: middle;
    display: table-cell;   
  }
`;