import React from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import BrowseBooksPage from "../pages/BrowseBooksPage";
import BookPage from "../pages/BookPage";
import LoadingSpinner from "../components/LoadingSpinner";
import UploadBookPage from "../pages/UploadBookPage/UploadBookPage";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path='/books' element={<BrowseBooksPage/>}/>
            <Route path='/books/:id' element={<BookPage/>}/>
            <Route path='/upload' element={<UploadBookPage/>}/>
            <Route path='/callback' element={<LoadingSpinner/>}/>
            <Route path='*' element={ <Navigate to={'/books'} replace/> }/> {/* This is the default route */}
        </Routes>
    );
};

export default AppRoutes;