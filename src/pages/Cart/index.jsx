import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, addToBasket } from "../../storage/slices/productSlices";

const Cart = () => {
  const dispatch = useDispatch();
  const { productsList, basket } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  return (
    <>
      <div>
        {productsList.map((product) => (
          <div
            onClick={() => dispatch(addToBasket(product.id))}
            key={product.id}
          >
            <img src={"http://localhost:3333" + product.image}></img>
            <span>{product.price}$</span>
            <h3>{product.title}</h3>
          </div>
        ))}
      </div>
    </>
  );
};

export default Cart;
