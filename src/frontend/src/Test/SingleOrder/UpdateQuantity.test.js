import { UpdateQuantity } from "../../Helper/UpdateQuantity.Helper";

describe('UpdateQuantity', () => {
  let setCartItems;

  beforeEach(() => {
    setCartItems = jest.fn();
  });

  it('should increase the quantity of an existing item by 1', () => {
    const cartItems = [{ id: 1, name: 'item1', quantity: 1 }];
    const itemDetails = { id: 1, name: 'item1' };

    UpdateQuantity(cartItems, setCartItems, itemDetails, 1);

    expect(setCartItems).toHaveBeenCalledWith([{ id: 1, name: 'item1', quantity: 2 }]);
  });

  it('should decrease the quantity of an existing item by 1 but not below 1', () => {
    const cartItems = [{ id: 1, name: 'item1', quantity: 2 }];
    const itemDetails = { id: 1, name: 'item1' };

    UpdateQuantity(cartItems, setCartItems, itemDetails, -1);

    expect(setCartItems).toHaveBeenCalledWith([{ id: 1, name: 'item1', quantity: 1 }]);
  });

  it('should delete the item when quantity of an existing item below 1', () => {
    const cartItems = [{ id: 1, name: 'item1', quantity: 1 }];
    const itemDetails = { id: 1, name: 'item1' };

    UpdateQuantity(cartItems, setCartItems, itemDetails, -1);

    expect(setCartItems).toHaveBeenCalledWith([]);
  });

  it('should not modify the cart if the item is not found', () => {
    const cartItems = [{ id: 1, name: 'item1', quantity: 1 }];
    const itemDetails = { id: 2, name: 'item2' };

    UpdateQuantity(cartItems, setCartItems, itemDetails, 1);

    expect(setCartItems).not.toHaveBeenCalled();
  });

  it('should correctly handle a cart with multiple items when increasing quantity', () => {
    const cartItems = [
      { id: 1, name: 'item1', quantity: 1 },
      { id: 2, name: 'item2', quantity: 3 }
    ];
    const itemDetails = { id: 2, name: 'item2' };

    UpdateQuantity(cartItems, setCartItems, itemDetails, 1);

    expect(setCartItems).toHaveBeenCalledWith([
      { id: 1, name: 'item1', quantity: 1 },
      { id: 2, name: 'item2', quantity: 4 }
    ]);
  });

  it('should correctly handle a cart with multiple items when decreasing quantity', () => {
    const cartItems = [
      { id: 1, name: 'item1', quantity: 1 },
      { id: 2, name: 'item2', quantity: 3 }
    ];
    const itemDetails = { id: 2, name: 'item2' };

    UpdateQuantity(cartItems, setCartItems, itemDetails, -1);

    expect(setCartItems).toHaveBeenCalledWith([
      { id: 1, name: 'item1', quantity: 1 },
      { id: 2, name: 'item2', quantity: 2 }
    ]);
  });
});
