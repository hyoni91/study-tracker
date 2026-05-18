

// 사용자가 볼 수 있는 형태로 포맷팅하는 함수들

export function formatDurationShort(duration: number): string {
  const hours = Math.floor(duration / (1000 * 60 * 60));
  const minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));

  if (hours === 0) return `${minutes}Min`;
  if (minutes === 0) return `${hours}Hrs`;

  return `${hours}Hrs ${minutes}Min`;
}