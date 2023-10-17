
// layout
import { AdminLayout } from "~/components/Layout";

import LoginForm from "~/components/auth/login/LoginForm";
import RegisterForm from "~/components/auth/login/RegisterForm";
import ForgotPassForm from "~/components/auth/login/ForgotPassForm";
import ForgotPassForm2 from "~/components/auth/login/ForgotPassForm2";
import ForgotPassForm3 from "~/components/auth/login/ForgotPassForm3";
import HomepageForm from "~/pages/user/homepage/HomepageForm";
import AboutUs from "~/pages/user/aboutUs/AboutUs";
import Recipe from "~/pages/user/recipe/Recipe";
import Article from "~/pages/user/blog/Article";
import RoleModal from "~/components/Modal/RoleModal";
import DetailRecipe from "~/pages/user/recipe/DetailRecipe";
import PlanMeal from "~/pages/user/planmeal/PlanMeal";
import AutoPlan from "~/pages/user/planmeal/AutoPlan";
import Step2_auto from "~/pages/user/planmeal/Step2_auto";
import ResultAuto from "~/pages/user/planmeal/ResultAuto";
import ProfileAdmin from "~/pages/admin/ProfileAdmin/ProfileAdmin";
import PostManagement from "~/pages/admin/PostManagement/PostManagement";
import RecipeManagement from "~/pages/admin/PostManagement/RecipeManagement";
import ArticleManagement from "~/pages/admin/PostManagement/ArticleManagement";
import AccountManagement from "~/pages/admin/AccountManagement/AccountManagement";
import User from "~/pages/admin/AccountManagement/User";
import Sponsor from "~/pages/admin/AccountManagement/Sponsor";
import Dashboard from "~/pages/admin/Dashboard/Dashboard";
import PlanMealManagement from "~/pages/admin/PlanMealManagement/PlanMealManagement";
import Category from "~/pages/admin/Category/Category";



import Search from "~/pages/user/Search"

const publicRoutes = [
    { path: '/', component: LoginForm, layout: null },
    { path: "/register", component: RegisterForm, layout: null },
    { path: "/chooserole", component: RoleModal, layout: null },
    { path: "/forgotpassword", component: ForgotPassForm, layout: null },
    { path: "/forgotpassword2", component: ForgotPassForm2, layout: null },
    { path: "/forgotpassword3", component: ForgotPassForm3, layout: null },
    { path: "/homepage", component: HomepageForm },
    { path: "/recipe", component: Recipe },
    { path: "/aboutus", component: AboutUs },
    { path: "/detail", component: DetailRecipe },
    { path: "/article", component: Article },
    { path: "/planmeal", component: PlanMeal },
    { path: "/autoplan", component: AutoPlan },
    { path: "/step2", component: Step2_auto },
    { path: "/result_auto", component: ResultAuto },
    { path: "/search", component: Search, layout: null },
    { path: "/profileAdmin", component: ProfileAdmin, layout: AdminLayout },
    { path: "/postmanagement", component: PostManagement, layout: AdminLayout },
    { path: "/recipemanagement", component: RecipeManagement, layout: AdminLayout },
    { path: "/articlemanagement", component: ArticleManagement, layout: AdminLayout },
    { path: "/accountmanagement", component: AccountManagement, layout: AdminLayout },
    { path: "/dashboard", component: Dashboard, layout: AdminLayout },
    { path: "/planmealmanagement", component: PlanMealManagement, layout: AdminLayout },
    { path: "/userManagement", component: User, layout: AdminLayout },
    { path: "/sponsormanagement", component: Sponsor, layout: AdminLayout },
    { path: "/category", component: Category, layout: AdminLayout },
];
const privateRoutes = [];

export { privateRoutes, publicRoutes }