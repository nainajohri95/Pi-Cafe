export const UpdateCartItems = ({itemDetails, cartItems, setCartItems})=>{
    const updatedCartItems = [...cartItems];
    const itemIndex = updatedCartItems.findIndex(
      (item) => item.id === itemDetails.id
    );
  if(itemIndex !== -1){
     const tempItems = updatedCartItems?.filter((items)=> items?.id !== itemDetails?.id);
     setCartItems(tempItems);
  }else{
    itemDetails = {...itemDetails, quantity: 1};
    setCartItems([...cartItems, itemDetails])
  }
}