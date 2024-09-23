import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from '../pages/login/Login';
import SignUp from '../pages/signUp/SignUp';
import SignUpComplete from '../pages/signUp/SignUpComplete';
import FindPw from '../pages/findPw/FindPw';
import FindPwComplete from '../pages/findPw/FindPwComplete';

export const Router = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Login />} />
                <Route path='/signUp' element={<SignUp />} />
                <Route path='/signUpComplete' element={<SignUpComplete/>} />
                <Route path='/findPw' element={<FindPw />} />
                <Route path='/findPwComplete' element={<FindPwComplete/>} />
            </Routes>
        </BrowserRouter>
    );
}