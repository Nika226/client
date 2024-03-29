import { useDispatch, useSelector } from "react-redux";
import MainPageBtn from "../../components/MainButton/index.jsx";
import { useEffect, useState } from "react";
import { fetchProducts } from "../../storage/slices/productSlice";
import styles from "./index.module.css";
import downIcon from "../../assets/images/downIcon.svg";
import upIcon from "../../assets/images/upIcon.png";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../../storage/slices/productSlice";
import { calculateDiscountPercent } from "../../utils/utils";
import { sortProducts } from "../../utils/sortProducts";
import { setDocumentTitle } from "../../utils/setDocumentTitle";

function AllProducts() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const status = useSelector((state) => state.products.status);

  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [priceFrom, setPriceFrom] = useState("");
  const [priceTo, setPriceTo] = useState("");
  const [showDiscounted, setShowDiscounted] = useState(false);
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [sortValue, setSortValue] = useState("");
  const cartItems = useSelector((state) => state.products.cartItems);

  const handleAddToCart = (productId) => {
    const product = products.find((p) => p.id === productId);
    if (product) {
      dispatch(addToCart({ product, quantity: 1 }));
    }
  };

  const isProductInCart = (productId) => {
    return cartItems.some((item) => item.id === productId);
  };

  useEffect(() => {
    setDocumentTitle("product");
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    setDisplayedProducts(products);
  }, [products]);

  useEffect(() => {
    let updatedProducts = sortProducts(products, sortValue);

    const fromPrice = priceFrom !== "" ? priceFrom : null;
    const toPrice = priceTo !== "" ? priceTo : null;

    updatedProducts = updatedProducts.filter((product) => {
      const effectivePrice =
        product.discont_price !== null ? product.discont_price : product.price;
      return (
        (fromPrice === null || effectivePrice >= fromPrice) &&
        (toPrice === null || effectivePrice <= toPrice)
      );
    });

    if (showDiscounted) {
      updatedProducts = updatedProducts.filter(
        (product) => product.discont_price !== null
      );
    }

    setDisplayedProducts(updatedProducts);
  }, [priceFrom, priceTo, showDiscounted, products, sortValue]);

  function handleSortChange(event) {
    setSortValue(event.target.value);
  }

  function handleDiscountCheckboxChange() {
    setShowDiscounted(!showDiscounted);
  }

  const toggleSelect = () => {
    setIsSelectOpen(!isSelectOpen);
  };

  const navigateProduct = useNavigate();

  const handleProductClick = (id) => {
    navigateProduct(`/products/${id}`);
  };

  return (
    <div className={styles.allProductsDiv}>
      <MainPageBtn />
      <button className={styles.allProductsBtn}>All products</button>
      <p className={styles.allProductsTitle}>All products</p>
      <div className={styles.allInputs}>
        <div className={styles.priceInputText}>
          <p className={styles.priceText}>Price</p>
          <input
            type="text"
            placeholder="from"
            value={priceFrom}
            onChange={(e) => setPriceFrom(e.target.value)}
          />
          <input
            type="text"
            placeholder="to"
            value={priceTo}
            onChange={(e) => setPriceTo(e.target.value)}
          />
        </div>
        <div className={styles.discountedInput}>
          <p className={styles.discountPar}>Discounted items</p>
          <input
            className={styles.checkbox}
            type="checkbox"
            checked={showDiscounted}
            onChange={handleDiscountCheckboxChange}
          />
        </div>
        <div className={styles.span}>
          <label>Sorted </label>
          <select
            className={styles.priceSort}
            onChange={handleSortChange}
            onClick={toggleSelect}
            style={{
              backgroundImage: `url(${isSelectOpen ? upIcon : downIcon})`,
            }}
          >
            <option value="byDefault">by default</option>
            <option value="newest">newest</option>
            <option value="highToLow">price: high-low</option>
            <option value="lowToHigh">price: low-high</option>
          </select>
        </div>
      </div>
      <div className={styles.productsDiv}>
        {status === "loading" && <p className={styles.loading}>Loading...</p>}
        {status === "succeeded" &&
          displayedProducts.map((product) => (
            <div className={styles.productCard} key={product.id}>
              <img
                className={styles.productImg}
                src={`http://localhost:3333${product.image}`}
                alt={product.title}
                onClick={() => handleProductClick(product.id)}
              />
              {product.discont_price && (
                <div className={styles.discountText}>
                  <p>
                    -
                    {calculateDiscountPercent(
                      product.discont_price,
                      product.price
                    )}
                    %
                  </p>
                </div>
              )}
              <button
                className={`${styles.addToCartBtn} ${
                  isProductInCart(product.id) ? styles.addedToCart : ""
                }`}
                onClick={() => handleAddToCart(product.id)}
              >
                {isProductInCart(product.id) ? "Added" : "Add to Cart"}
              </button>
              <div className={styles.productTitlePrice}>
                <h3 className={styles.productName}>{product.title}</h3>
                <div className={styles.priceDscPriceDiv}>
                  <p className={styles.price}>
                    {product.discont_price
                      ? "$" + product.discont_price
                      : "$" + product.price}
                  </p>
                  {product.discont_price && (
                    <p className={styles.discountPrice}>${product.price}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default AllProducts;
