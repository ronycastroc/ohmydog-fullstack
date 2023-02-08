import styled from "styled-components";

export const Wrapper = styled.div`
  background-color: var(--white-color);
  max-width: 30vw;
  min-height: 70vh;
  margin: 0 auto;
  margin-top: 100px;
  border-radius: 10px;
  position: relative;
  padding-bottom: 100px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;

  input {
    width: 80%;
    height: 40px;
    border-radius: 10px;
    font-size: 0.9rem;
    padding-left: 5px;
    margin-bottom: 20px;
    font-weight: 500;
  }

  span {
    color: var(--button-color);
    cursor: pointer;
  }

  .div-link {
    margin-top: -10px;
  }
  
  button {
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translate(-50%, 0);
  }
  
  .type {
    display: flex;
    margin-bottom: 20px;

    h3 {
      margin-right: 10px;
    }
  }
`;