export function checkInCart(cart, product) {
  return cart.find((c) => c._id === product._id);
}
