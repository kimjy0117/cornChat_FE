import styled from "styled-components";
import { horizontalShaking } from "../../style/animationStyle";

const InputLayout = styled.div`
    width: 100%;
    height: 100%;
    margin: ${(props) => props.margin};

    & .label-box{
        margin-bottom: 3px;
    }

    & .label-text{
        font-size: 20px;
        font-weight: 800;
    }

    & .error-box{
        display: flex;
        justify-content: flex-start;
        margin-top: 0px;
        margin-left: 12px;
    }
`;

// 에러 메시지 스타일
const ErrorMessage = styled.p`
    margin: 0;
    font-size: 12px;
    font-weight: 700;
    color: #f31d1d;
    /* 에러 발생 시 애니메이션 적용 */
    animation: ${(props) => (props.shake ? horizontalShaking : 'none')} 0.2s ease;
`;

const StyledInput = styled.input`
    //레이아웃
    width: 95%;
    height: 40px;

    //스타일
    background-color: white;
    border-width: 2px;
    border-color: #D3D3D3;
    border-radius: 15px;

    //폰트
    font-size: 20px;
    font-weight: 300;
    color: black;
    
    &::placeholder{
        font-size: 15px;
        color: #828282;
    }

    //숫자 증감 버튼 제거
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    &::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
`;

export default function Input({ text, id, error, shake, margin, ...props }){
    return(
        <InputLayout margin={margin}>
            {/* label영역 */}
            <div className="label-box">
                <label htmlFor={id} className="label-text">
                    {/* text가 존재할 경우에 text를 출력 */}
                    {text && text} 
                </label>
            </div>

            {/* input영역 */}
            <StyledInput 
                id={id}
                {...props} />

            {/* error메시지 */}
            <div className="error-box">
                <ErrorMessage shake={shake}>
                    {error && error}
                </ErrorMessage>
            </div>
        </InputLayout>
    );
}