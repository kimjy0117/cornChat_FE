import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../assets/globalImages/logo.png'

const HeaderLayout = styled.div`
    //레이아웃
    width: 90%;
    height: 12vh;
    display: flex;
    justify-content: flex-start;
    margin: 2% 0 3vh 7%;
`;

const LogoImage = styled.img`
    //레이아웃
    width: 270px; /* 원하는 크기로 조정 */
    height: 80px; /* 이미지 비율을 유지 */

    //효과
    cursor: pointer;
`;

export default function Header(){
    const navigate = useNavigate();

    return(
        <HeaderLayout>
            <LogoImage src={logo} alt="로고 이미지" onClick={()=>{navigate('/');}}/>
        </HeaderLayout>
    );
}