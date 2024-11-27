import styled from "styled-components";

export const ScrollStyle = styled.div`
    overflow-y: auto;  // 내용이 넘칠 때 세로 스크롤 추가
    overflow-x: hidden;
    flex: 1; /* 남은 공간을 스크롤 영역으로 확장 */


    /* 스크롤바 스타일링 */
    &::-webkit-scrollbar {
        width: 3px;  /* 스크롤바의 너비 */
    }

    &::-webkit-scrollbar-thumb {
        background-color: #d1d1d1;  /* 스크롤바의 색상 */
        border-radius: 4px;
    }

    &::-webkit-scrollbar-thumb:hover {
        background-color: #b8b8b8;  /* 마우스를 올렸을 때 색상 */
    }
`;