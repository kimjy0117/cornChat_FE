export function convertToShortDate (isoDate) {
    const date = new Date(isoDate);
  
    // 시간과 분 추출
    const hours = date.getHours();
    const minutes = date.getMinutes();
  
    // 오전/오후 설정
    const period = hours < 12 ? "오전" : "오후";
  
    // 12시간제 시간 변환
    const formattedHours = hours % 12 || 12; // 0시는 12로 변환
  
    // 2자리 분 포맷팅
    const formattedMinutes = minutes.toString().padStart(2, "0");
  
    return `${period} ${formattedHours}:${formattedMinutes}`;
};