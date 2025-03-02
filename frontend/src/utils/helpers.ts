import { LatLngExpression } from 'leaflet';
import { decode } from 'polyline';

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

const safeDecode = (encodedString: string) => {
  try {
    // Attempt to decode the polyline
    const decoded = decode(encodedString);
    return decoded as LatLngExpression[];
  } catch (error: any) {
    console.error('Failed to decode polyline:', error.message);
    // Return a fallback value (e.g., null or empty array)
    return [];
  }
};

//format timestamp
const formatDate = (date: Date) => {
  const newDate = new Date(date);
  const formatted = newDate.toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
  return formatted;
};

const formatToTimeAndDate = (date: string | undefined) => {
  if (!date) return '';
  const newDate = new Date(date);
  const formatted = newDate.toLocaleDateString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
  return formatted;
};

const getAvatarFallBack = (full_name: string) => {
  const nameArray = full_name.split(' ');
  if (nameArray.length > 1) {
    return nameArray[0][0]?.toUpperCase() + nameArray[1][0]?.toUpperCase();
  } else {
    return nameArray[0][0]?.toUpperCase();
  }
};

const renderRegisterInitValues = (role: 'driver' | 'consignor') => {
  const initialValues = {
    full_name: '',
    phone_number: '',
    email: '',
    password: '',
    confirm_password: '',
    role,
  };
  if (role === 'driver') {
    return { ...initialValues, licence_no: '' };
  }
  return initialValues;
};

export {
  attributeToLabel,
  getAvatarFallBack,
  limitString,
  safeDecode,
  formatDate,
  formatToTimeAndDate,
  renderRegisterInitValues,
};
