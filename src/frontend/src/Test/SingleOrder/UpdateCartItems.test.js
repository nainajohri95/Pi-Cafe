import { UpdateCartItems } from "../../Helper/UpdateCartItems.Helper";

describe('UpdateCartItems', () => {
  let setCartItems;

  beforeEach(() => {
    setCartItems = jest.fn();
  });

  it('should add a new item to the cart with quantity 1 if the item is not already in the cart', () => {
    const itemDetails = { id: 1, name: 'item1' };
    const cartItems = [];

    UpdateCartItems({ itemDetails, cartItems, setCartItems });

    expect(setCartItems).toHaveBeenCalledWith([{ ...itemDetails, quantity: 1 }]);
  });

  it('should remove the item from the cart if it is already in the cart', () => {
    const itemDetails = { id: 1, name: 'item1' };
    const cartItems = [{ id: 1, name: 'item1', quantity: 1 }];

    UpdateCartItems({ itemDetails, cartItems, setCartItems });

    expect(setCartItems).toHaveBeenCalledWith([]);
  });

  it('should not modify the cart if the item to be removed does not exist', () => {
    const itemDetails = { id: 2, name: 'item2' };
    const cartItems = [{ id: 1, name: 'item1', quantity: 1 }];

    UpdateCartItems({ itemDetails, cartItems, setCartItems });

    expect(setCartItems).toHaveBeenCalledWith([
      { id: 1, name: 'item1', quantity: 1 },
      { id: 2, name: 'item2', quantity: 1 }
    ]);
  });

  it('should handle cases with multiple items in the cart correctly', () => {
    const itemDetails = { id: 2, name: 'item2' };
    const cartItems = [
      { id: 1, name: 'item1', quantity: 1 },
      { id: 2, name: 'item2', quantity: 1 }
    ];

    UpdateCartItems({ itemDetails, cartItems, setCartItems });

    expect(setCartItems).toHaveBeenCalledWith([{ id: 1, name: 'item1', quantity: 1 }]);
  });
});
