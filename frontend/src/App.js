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
import PlanMeal from "./components/user/planmeal/PlanMeal"
import AutoPlan from "./components/user/planmeal/AutoPlan"
import Step2_auto from "./components/user/planmeal/Step2_auto"
import ResultAuto from "./components/user/planmeal/ResultAuto"
import Index from "./components/admin/Index"
import PostManagement from "./components/admin/postManagement/PostManagement"
import AccountManagement from "./components/admin/accountManagement/AccountManagement"
import RecipeManagement from "./components/admin/recipeManagement/RecipeManagement"
import FooterAdmin from "./components/admin/footer/FooterAdmin"

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
        <Route path="/planmeal" element={< PlanMeal />} />
        <Route path="/autoplan" element={< AutoPlan />} />
        <Route path="/step2" element={< Step2_auto />} />
        <Route path="/result_auto" element={<ResultAuto />} />
        <Route path="/admin" element={<Index />} />
        <Route path="/postmanagement" element={<PostManagement />} />
        <Route path="/accountmanagement" element={<AccountManagement />} />
        <Route path="/recipemanagement" element={<RecipeManagement />} />
        <Route path="/footeradmin" element={<FooterAdmin />} />
        {/* </Routes> */}
      </Routes>
    </Router>
  );
}

export default App;
