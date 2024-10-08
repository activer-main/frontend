export const activityTypeToColor = (type: string | undefined) :
'primary' | 'secondary' | 'success' | 'warning' => {
  switch (type) {
    case 'area': return 'primary';
    case 'location': return 'secondary';
    case 'other': return 'success';
    default: return 'warning';
  }
};
