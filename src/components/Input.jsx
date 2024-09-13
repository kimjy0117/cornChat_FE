import styled from "styled-components";

const InputLayout = styled.div`
    width: 100%;
    height: 46px;
    margin-bottom: 13px;

    & .label-box{
        margin-bottom: 13px;
    }

    & .label-box{
        font-size: 20px;
        font-weight: 300;
    }

    & .error-box{
        margin-top: 2px;
        margin-left: 12px;
    }

    & .error-message{
        margin: 0;
        font-size: 15px;
        font-weight: 300;
        color: "#DE1515";
        box-shadow: 2px 0px grey;
    }
`;

const StyledInput = styled.div`
    height: 46px;
    border: 0.5px;
    border-color: "#595959";
    border-radius: 15px;

    font-size: 20px;
    font-weight: 300;
    color: black;
    
    ::placeholder{
        color: "#D3D3D3";
    }
`;

export default function Input({ text, id, error, ...props }){
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
            <StyledInput id={id} {...props} />

            {/* error메시지 */}
            <div className="error-box">
                <p className="error-message">{error&&error}</p>
            </div>
        </InputLayout>
    );
}