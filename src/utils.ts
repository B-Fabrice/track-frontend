export function formatDate(date: string): string {
  const newDate: Date = new Date(date);
    return `${newDate.toLocaleDateString()}  ${newDate.toLocaleTimeString()}`;
}