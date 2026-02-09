export const getCart = () => {
  try {
    const data = localStorage.getItem("cartItems");
    return data ? JSON.parse(data) : [];
  } catch (err) {
    return [];
  }
};

export const saveCart = (cart) => {
  localStorage.setItem("cartItems", JSON.stringify(cart));
};

// ✅ Add medicine by medicineName (medicineId optional)
export const addToCart = ({ medicineId = null, medicineName, quantity = 1 }) => {
  const cart = getCart();

  const existing = cart.find(
    (item) => item.medicineName.toLowerCase() === medicineName.toLowerCase()
  );

  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({
      medicineId,
      medicineName,
      quantity,
    });
  }

  saveCart(cart);
  return cart;
};

// ✅ Remove by medicineName
export const removeFromCart = (medicineName) => {
  const cart = getCart().filter(
    (item) => item.medicineName.toLowerCase() !== medicineName.toLowerCase()
  );

  saveCart(cart);
  return cart;
};

// ✅ Update qty by medicineName
export const updateCartQty = (medicineName, qty) => {
  const cart = getCart();

  const item = cart.find(
    (c) => c.medicineName.toLowerCase() === medicineName.toLowerCase()
  );

  if (!item) return cart;

  item.quantity = qty;

  const updated = cart.filter((c) => c.quantity > 0);

  saveCart(updated);
  return updated;
};

export const clearCart = () => {
  localStorage.removeItem("cartItems");
};
