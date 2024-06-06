import React from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import BrowseBooksPage from "../pages/BrowseBooksPage";
import BookPage from "../pages/BookPage";
import LoadingSpinner from "../components/LoadingSpinner";
import UploadBookPage from "../pages/UploadBookPage/UploadBookPage";
import ProfilePage from "../pages/ProfilePage";
import PrivacyPage from "../pages/PrivacyPage";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path='/books' element={<BrowseBooksPage/>}/>
            <Route path='/books/:id' element={<BookPage/>}/>
            <Route path='/upload' element={<UploadBookPage/>}/>
            <Route path='/account' element={<ProfilePage/>}/>
            <Route path='/callback' element={<LoadingSpinner/>}/>
            <Route path='/privacy' element={<PrivacyPage/>}/>
            <Route path='*' element={ <Navigate to={'/books'} replace/> }/> {/* This is the default route */}
        </Routes>
    );
};

export default AppRoutes;