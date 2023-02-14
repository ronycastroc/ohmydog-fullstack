import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Footer, Header, MenuMobile, Overlay } from "./components";
import { 
  AddDog, 
  AdoptDog, 
  BeASupporter, 
  DogPage, 
  Home, 
  Posts, 
  SignIn, 
  SignUp, 
  StoriesPage, 
  UpdateDog } from "./pages";
import { Flip, ToastContainer } from "react-toastify";
import { UserProvider } from "./contexts/UserContext";

export const App = () => {
  return (
    <>
      <ToastContainer
        position="top-center" transition={Flip} />
      <BrowserRouter>
        <UserProvider>
          <Overlay />
          <Header />
          <MenuMobile />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth/sign-in" element={<SignIn />} />
            <Route path="/auth/sign-up" element={<SignUp />} />
            <Route path="/adopt-dog" element={<AdoptDog />} />
            <Route path="/adopt-dog/:dogId" element={<PrivatePage><DogPage /></PrivatePage>} />
            <Route path="/add-dog-adoption" element={<PrivatePage><AddDog /></PrivatePage>} />
            <Route path="/update-dog-adoption/:dogId" element={<PrivatePage><UpdateDog /></PrivatePage>} />
            <Route path="/posts-mydog" element={<Posts />} />
            <Route path="/be-a-supporter" element={<BeASupporter />} />
            <Route path="/stories" element={<StoriesPage />} />
          </Routes>
          <Footer />
        </UserProvider>
      </BrowserRouter>
    </>
  );
};

const PrivatePage = ({ children }) => {
  const auth = JSON.parse(localStorage.getItem("token"));
  if (!auth) {
    return <Navigate to="/" />;
  }

  return (
    <>
      {children}      
    </>
  );
};
