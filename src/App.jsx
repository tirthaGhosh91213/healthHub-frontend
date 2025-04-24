import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GenerateMeal from "./components/GenerateMeal";
import Navbar from "./components/NavBar";
import ToDayMeal from "./components/ToDayMeal";
import Footer from "./components/Footer";
import AuthPage from "./components/AuthPage";
import ShowAllMeals from "./components/ShowAllMeals";
import UserProfile from "./components/profile";
import Articles from "./components/Articles";
import PostDetail from "./components/PostDetail";
import DoctorApply from "./components/DoctorApply";
import ContactUs from "./components/ContactUs";
// import ChatApp from "./components/HealthGuru";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbar />}>
        <Route path="/generateMeal" element={<GenerateMeal />} />
        <Route path="/signup" element={<AuthPage/>}/>
        <Route path="/" element={<ToDayMeal/>}/>
        <Route path="/allMeal" element={<ShowAllMeals />}/>
        <Route path="/profile" element={<UserProfile />}/>
        <Route path="/doctorApply" element={<DoctorApply />}/>
        <Route path="/ourContact" element={<ContactUs />}/>

        <Route path="/articles" element={<Articles />}/>
        <Route path="/articles/posts/:id" element={<PostDetail />} />
        {/* <Route path="/healthGuru" element={<ChatApp />}/> */}
        </Route>
        
      </Routes>
      
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
