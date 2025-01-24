export const getEventColor = (type: string): string => {
  switch (type) {
    case 'success':
      return 'bg-green-600';
    case 'warning':
      return 'bg-amber-600';
    case 'danger':
      return 'bg-red-600';
    case 'market':
      return 'bg-blue-600';
    case 'transaction':
      return 'bg-emerald-600';
    case 'reputation':
      return 'bg-purple-600';
    case 'faction':
      return 'bg-cyan-600';
    default:
      return 'bg-gray-600';
  }
};