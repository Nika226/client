import { useNavigate, useParams } from "react-router-dom";
import styles from "./index.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { addToCart, fetchProducts } from "../../storage/slices/productSlice";
import MainPage from "../../components/MainButton/index.jsx";
import minus from "../../assets/images/minus.svg";
import plus from "../../assets/images/plus.svg";
import { fetchCategories } from "../../storage/slices/categoriesSlice";
import { calculateDiscountPercent } from "../../utils/utils";
import { setDocumentTitle } from "../../utils/setDocumentTitle";

function ProductCard() {
  const { id: stringId } = useParams();
  const id = parseInt(stringId, 10);
  const dispatch = useDispatch();
  const products = useSelector((state) =>
    state.products.products.find((p) => p.id === id)
  );

  const status = useSelector((state) => state.products.status);
  const cartItems = useSelector((state) => state.products.cartItems);
  const [quantity, setQuantity] = useState(1);

  const isProductInCart = (productId) => {
    return cartItems.some((item) => item.id === productId);
  };

  useEffect(() => {
    setDocumentTitle("productCart");
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const navigate = useNavigate();

  const navigateToCategoryProducts = () => {
    if (product?.categoryId) {
      navigate(`/category/${product.categoryId}`);
    }
  };

  const handleAddToCart = () => {
    dispatch(addToCart({ product: products, quantity }));
  };

  const increaseQuantity = () => {
    if (!isProductInCart(product.id)) {
      setQuantity((prevQuantity) => prevQuantity + 1);
    }
  };

  const decreaseQuantity = () => {
    if (!isProductInCart(product.id)) {
      setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
    }
  };

  const fullText = products?.description;
  const [isReadMore, setIsReadMore] = useState(true);

  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };

  const divStyle = {
    height: isReadMore ? "150px" : "none",
    overflowY: isReadMore ? "hidden" : "auto",
    marginBottom: "16px",
    border: "none",
    padding: "10px 0",
  };

  const categories = useSelector((state) => state.categories.categories);
  const product = useSelector((state) =>
    state.products.products.find((p) => p.id === id)
  );

  const categoryTitle =
    categories.find((cat) => cat.id === product?.categoryId)?.title ||
    "No Category";
  return (
    <div className={styles.productCardDiv}>
      {status === "loading" && <p className={styles.loading}>Loading...</p>}
      {status === "succeeded" && (
        <div key={products.id}>
          <div className={styles.allBtn}>
            <MainPage />
            <button
              className={styles.categoriesBtn}
              onClick={() => {
                navigate("/categories");
              }}
            >
              Categories
            </button>
            <button
              className={styles.toolsBtn}
              onClick={navigateToCategoryProducts}
            >
              {categoryTitle}
            </button>
            <button className={styles.btnTitle}>{products.title}</button>
          </div>
          <div className={styles.productsInfo}>
            <img
              className={styles.productCardImg}
              src={`http://localhost:3333${products.image}`}
              alt={products.title}
            />
            <div className={styles.productCartInfoText}>
              <h3 className={styles.productTitle}>{products.title}</h3>
              <div className={styles.priceInfo}>
                {products.discont_price ? (
                  <p className={styles.priceText}>${products.discont_price}</p>
                ) : (
                  <p className={styles.productPrice}>${products.price}</p>
                )}
                {products.discont_price && (
                  <p className={styles.discountText}>${products.price}</p>
                )}
                <div className={styles.positionDiv}>
                  {products.discont_price && (
                    <div className={styles.percentDiv}>
                      <p className={styles.percentText}>
                        {calculateDiscountPercent(
                          products.price,
                          products.discont_price
                        )}
                        %
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <div className={styles.quantityBtn}>
                <div className={styles.plusMinusBtns}>
                  <button
                    className={styles.minusBtn}
                    onClick={() => decreaseQuantity(product.id)}
                    disabled={isProductInCart(product.id)}
                  >
                    <img src={minus} alt="minus" />
                  </button>
                  <div className={styles.span}>{quantity}</div>
                  <button
                    className={styles.plusBtn}
                    onClick={() => increaseQuantity(product.id)}
                    disabled={isProductInCart(product.id)}
                  >
                    <img src={plus} alt="plus" />
                  </button>
                </div>

                <button
                  className={`${styles.addToCartBtn} ${
                    isProductInCart(product.id) ? styles.addedToCart : ""
                  }`}
                  onClick={() => handleAddToCart(product)}
                >
                  {isProductInCart(product.id) ? "Added" : "Add to Cart"}
                </button>
              </div>
              <div className={styles.descriptionDiv}>
                <p className={styles.description}>Description</p>
                <div style={divStyle}>
                  <p className={styles.cartText}>{fullText}</p>
                </div>

                <button className={styles.readBtn} onClick={toggleReadMore}>
                  {isReadMore ? "Read more" : "Hide"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductCard;
