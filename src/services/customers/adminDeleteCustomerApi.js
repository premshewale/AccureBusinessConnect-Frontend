import adminApi from "../../store/adminApi";

/**
 * DELETE CUSTOMER
 * DELETE /api/customers/{id}
 */
export const adminDeleteCustomer = async (id) => {
  try {
    const response = await adminApi.delete(`/customers/${id}`);
    return response.data; // expected success message or deleted customer info
  } catch (error) {
    throw error.response?.data?.message || error.message || "Failed to delete customer";
  }
};
