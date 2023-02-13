import { useContext } from "react";
import styled from "styled-components";
import UserContext from "../../contexts/UserContext";

export const Overlay = () => {
  const { showLogout, setShowLogout } = useContext(UserContext);

  return (
    <OverlayLogout showLogout={showLogout} onClick={() => setShowLogout(false)} />
  );
};

const OverlayLogout = styled.div`  
   background-color: rgba(0, 0, 0, 0.5);
   position: fixed;
   top: 0;
   bottom: 0;
   left: 0;
   right: 0;
   z-index: 2;   
   display: ${props => props.showLogout ? "initial" : "none"};
`;