import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from '../pages/login/Login';
import FindPw from '../pages/findPw/FindPw';

export const Router = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Login />} />
                <Route path='/findPw' element={<FindPw />} />
            </Routes>
        </BrowserRouter>
    );
}