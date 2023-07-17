import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home";

import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import Register from "./component/Register.jsx";
import UserPage from "./component/UserPage.jsx";
import ExplorePage from "./pages/ExplorePage.jsx";
import UploadImage from "./component/UploadImage.jsx";
import Imageview from "./component/ImageView.jsx"
import UserProfile from "./component/UserProfile.jsx";
import { NotFound } from "./component/NotFound.jsx";
import EditPage from "./pages/EditPage.jsx";

//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL />;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<Register />} path="/register" />
                        <Route element={<UploadImage />} path="/upload" />
                        <Route element={<UserPage />} path="/myprofile/:alias" />
                        <Route element={<UserProfile />} path="/profile/:alias" />
                        <Route element={<ExplorePage />} path="/explorepage" />
                        <Route element={<Imageview />} path="/imageview/:id" />
                        <Route element={<EditPage />} path="/edit" />
                        <Route element={<NotFound />} path="*" />

                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
