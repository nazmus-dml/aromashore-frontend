export function calculateCart(cart = []) {
  // let subQty = (items) => {
  //   return items.reduce((prev, item) => {
  //     return prev + item.qty;
  //   }, 0);
  // };

  // const totalQty = cart.reduce((prev, current) => {
  //   return prev + subQty(current.units);
  // }, 0);

  const totalQty = cart.length;

  let subAmount = (units) => {
    return units.reduce((initVal, nextitem) => {
      if (nextitem.sale_price > 0) {
        return initVal + nextitem.sale_price * nextitem.qty;
      }
      return initVal + nextitem.price * nextitem.qty;
    }, 0);
  };

  const totalAmount = cart.reduce((prev, current) => {
    return prev + subAmount(current.units);
  }, 0);

  return { totalQty, totalAmount };
  
}
