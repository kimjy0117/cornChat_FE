import styled from "styled-components";

export const ContextMenu = styled.div`
  position: absolute;
  background-color: white;
  border: 1px solid #ccc;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  z-index: 1000;
  ul {
    list-style: none;
    margin: 0;
    padding: 5px 0;
  }
  li {
    padding: 8px 12px;
    cursor: pointer;
    
    &:hover {
      background-color: #f0f0f0;
    }
  }
`;