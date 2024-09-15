import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Logo from '../assets/globalImages/logo.png'

const HeaderLayout = styled.div`
    //레이아웃
    width: 90%;
    height: 10vh;
    display: flex;
    justify-content: flex-start;
    margin: 0 0 2% 7%;
`;

const LogoImage = styled.img`
    //레이아웃
    width: 250px; /* 원하는 크기로 조정 */
    height: 80px; /* 이미지 비율을 유지 */

    //효과
    cursor: pointer;
`;

export default function Header(){
    const navigate = useNavigate();

    return(
        <HeaderLayout>
            <LogoImage src={Logo} alt="로고 이미지" onClick={()=>{navigate('/');}}/>
        </HeaderLayout>
    );
}