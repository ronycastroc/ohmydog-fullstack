import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Footer, Header } from "./components";
import { AdoptDog, Home } from "./pages";

export const App = () => {
  return (
    <>
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/adopt-dog" element={<AdoptDog />}/>
        </Routes>
        <Footer />      
      </BrowserRouter>     
    </>
  );
};
