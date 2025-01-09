import axiosInstance from '../component/api';

const fetchDeliveryBoys = async () => {
  try {
    const res = await axiosInstance.get(
      'accounts/store-admin-list-delivery-boys/',
    );
    return res;
  } catch (error) {
    console.error('Error fetching delivery boys:', error);
  }
};

const assignOrder = async (purchase_id, delivery_boy, purchase_item_id) => {
  try {
    const res = await axiosInstance.post('accounts/assign-orders/', {
      purchase_id,
      delivery_boy,
      purchase_item_id,
    });
    return res;
  } catch (error) {
    console.error('Error assigning order:', error);
  }
};

export {fetchDeliveryBoys, assignOrder};
