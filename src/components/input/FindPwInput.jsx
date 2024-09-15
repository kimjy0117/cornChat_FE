import styled from "styled-components";

const InputLayout = styled.div`
    width: 100%;
    height: 40px;
    margin-bottom: 23px;

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

    & .error-message{
        margin: 0;
        font-size: 12px;
        font-weight: 700;
        color: #f31d1d;
    }
`;

const StyledInput = styled.input`
    //레이아웃
    width: 95%;
    height: 40px;
    margin: ${(props) => props.margin};

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
        color: #D3D3D3;
    }
`;

export default function FindPwInput({ text, id, error, ...props }){
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
                {/* <p className="error-message">{error&&error}</p> */}
            </div>
        </InputLayout>
    );
}