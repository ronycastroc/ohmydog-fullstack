import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Footer, Header } from "./components";
import { AdoptDog, DogPage, Home, Posts, SignIn } from "./pages";
import { Flip, ToastContainer } from "react-toastify";

export const App = () => {
  return (
    <>
      <ToastContainer 
        position="top-center" transition={Flip}/>
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/auth/sign-in" element={<SignIn />}/>
          <Route path="/adopt-dog" element={<AdoptDog />}/>
          <Route path="/adopt-dog/:dogId" element={<DogPage />}/>
          <Route path="/posts-mydog" element={<Posts />}/>          
        </Routes>
        <Footer />      
      </BrowserRouter>     
    </>
  );
};
