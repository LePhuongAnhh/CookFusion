import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import LoginForm from "./components/auth/login/LoginForm"
import RegisterForm from "./components/auth/login/RegisterForm"
import ForgotPassForm from "./components/auth/login/ForgotPassForm"
import ForgotPassForm2 from "./components/auth/login/ForgotPassForm2"
import ForgotPassForm3 from "./components/auth/login/ForgotPassForm3"
import HomepageForm from "./components/user/homepage/HomepageForm"
import AboutUs from "./components/user/aboutUs/AboutUs"
import FooterForm from "./components/user/footer/FooterForm"
import Recipe from "./components/user/recipe/Recipe"
import Article from "./components/user/blog/Article"
import RoleModal from "./components/user/modal/RoleModal"
import DetailRecipe from "./components/user/recipe/DetailRecipe"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={< LoginForm />} />
        <Route path="/register" element={< RegisterForm />} />
        <Route path="/chooserole" element={< RoleModal />} />
        <Route path="/forgotpassword" element={< ForgotPassForm />} />
        <Route path="/forgotpassword2" element={< ForgotPassForm2 />} />
        <Route path="/forgotpassword3" element={< ForgotPassForm3 />} />
        <Route path="/homepage" element={< HomepageForm />} />
        <Route path="/recipe" element={< Recipe />} />
        <Route path="/aboutus" element={< AboutUs />} />
        <Route path="/detail" element={< DetailRecipe />} />
        <Route path="/article" element={< Article />} />
      </Routes>
    </Router>
  );
}

export default App;
