import styled from "styled-components";
import { horizontalShaking } from "../../style/animationStyle";

const InputLayout = styled.div`
    width: 100%;
    height: 100%;
    margin-bottom: 10px;

    & .label-box{
        margin-bottom: 10px;
    }

    & .label-text{
        font-size: 20px;
        font-weight: 300;
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
    margin: 2px 0 0 0;
    font-size: 13px;
    font-weight: 700;
    color: #f31d1d;
    /* 에러 발생 시 애니메이션 적용 */
    animation: ${(props) => (props.shake ? horizontalShaking : 'none')} 0.2s ease;
`;

const StyledInput = styled.input`
    //레이아웃
    width: 95%;
    height: 46px;
    margin: ${(props) => props.margin};

    //스타일
    background-color: rgba(0, 0, 0, 0.3);
    border-width: 2px;
    border-color: ${(props) => props.borderColor || '#FCDF47'};
    border-radius: 7px;

    //폰트
    font-size: 20px;
    font-weight: 300;
    color: #D3D3D3;
    
    &::placeholder{
        font-size: 15px;
        color: #D3D3D3;
    }
`;

export default function LoginInput({ text, id, error, shake, ...props }){
    return(
        <InputLayout>
            {/* label영역 */}
            <div className="label-box">
                <label htmlFor={id} className="label-text">
                    {/* text가 존재할 경우에 text를 출력 */}
                    {text&&text} 
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