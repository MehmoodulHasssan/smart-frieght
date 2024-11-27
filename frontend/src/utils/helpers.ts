const attributeToLabel = (attribute: string) => {
  let label: string = '';
  if (attribute.includes('_')) {
    attribute.split('_').map((item, index) => {
      if (index === 0) {
        label = item.charAt(0).toUpperCase() + item.slice(1);
        return;
      }
      label += ' ' + item.charAt(0).toUpperCase() + item.slice(1);
    });
  } else {
    label = attribute;
  }

  return label;
};

const limitString = (string: string, limit: number) => {
  if (string.length > limit) {
    return string.slice(0, limit) + '...';
  }
  return string;
};

export { attributeToLabel, limitString };
