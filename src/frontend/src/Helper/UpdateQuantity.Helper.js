export const UpdateQuantity = (cartItems, setCartItems, itemDetails, num) => {
  const newOrderItems = [...cartItems];
  const itemIndex = newOrderItems.findIndex(
    (item) => item.id === itemDetails.id
  );
  if (itemIndex !== -1) { 
    if (num === 1) {
        // Add quantity
        newOrderItems[itemIndex].quantity += 1;
      } else if (num === -1 && newOrderItems[itemIndex].quantity === 1) {
         const temp = newOrderItems.filter((item)=>item.id !== itemDetails.id)
         setCartItems(temp);
         return;
        
      }else{
        newOrderItems[itemIndex].quantity -= 1;
      }
    
      setCartItems(newOrderItems);
  }
  
};
