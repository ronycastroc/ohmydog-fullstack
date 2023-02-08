import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Footer, Header, Overlay } from "./components";
import { AddDog, AdoptDog, DogPage, Home, Posts, SignIn, SignUp, UpdateDog } from "./pages";
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
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth/sign-in" element={<SignIn />} />
            <Route path="/auth/sign-up" element={<SignUp />} />
            <Route path="/adopt-dog" element={<AdoptDog />} />
            <Route path="/adopt-dog/:dogId" element={<DogPage />} />
            <Route path="/add-dog-adoption" element={<AddDog />} />
            <Route path="/update-dog-adoption/:dogId" element={<UpdateDog />} />
            <Route path="/posts-mydog" element={<Posts />} />
          </Routes>
          <Footer />
        </UserProvider>
      </BrowserRouter>
    </>
  );
};
