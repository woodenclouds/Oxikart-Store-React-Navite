// utils/formSchemas.js
export const deliveryBoySchema = {
  full_name: {
    label: 'Full Name',
    required: true,
    validator: value => value.length >= 3,
  },
  password: {
    label: 'Password',
    required: true,
    validator: value => value.length >= 3,
  },
  phone: {
    label: 'Phone Number',
    required: true,
    validator: value => /^\d{10}$/.test(value),
  },
  gender: {
    label: 'Gender',
    required: true,
  },
  age: {
    label: 'Age',
    required: true,
    validator: value => !isNaN(value) && value > 0,
  },
  dob: {
    label: 'Date of Birth',
    required: true,
  },
  state: {
    label: 'State',
    required: true,
  },
  country: {
    label: 'Country',
    required: true,
  },
  joining: {
    label: 'Joining Date',
    required: true,
  },
  address: {
    label: 'Address',
    required: true,
  },
};

export const loginSchema = {
  username: {
    label: 'Full Name',
    required: true,
    validator: value => value.length >= 3,
  },
  password: {
    label: 'Password',
    required: true,
    validator: value => value.length >= 3,
  },
};
