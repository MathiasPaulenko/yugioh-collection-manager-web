import React from 'react';

import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { MainRoutes } from './MainRoutes';



export const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/*" element={<MainRoutes />} />
            </Routes>
        </BrowserRouter>
    )
}
