const totalPrice = (cart) =>
  cart
    .reduce((sum, item) => sum + parseFloat(item.price) * item.quantity, 0)
    .toFixed(2);

export default totalPrice;
