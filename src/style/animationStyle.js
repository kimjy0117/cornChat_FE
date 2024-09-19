import { keyframes } from "styled-components";

// 좌우로 흔들리는 애니메이션 정의
export const horizontalShaking = keyframes`
  0% { transform: translateX(0); }
  25% { transform: translateX(5px); }
  50% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
  100% { transform: translateX(0); }
`;