import { useEffect } from "react";
import { getAllCategories } from "../../storage/slices/categoriesSlices";
import { useDispatch, useSelector } from "react-redux";
import styles from "./index.module.css";
import { getProducts } from "../../storage/slices/productSlices";

function CategoriesList() {
  const dispatch = useDispatch();
  const categoriesList = useSelector(
    (state) => state.categories.categoriesList
  );

  const productList = useSelector((state) => state.products.productList);

  useEffect(() => {
    dispatch(getAllCategories());
  }, []);

  function getCategoryProducts(id) {
    dispatch(getProducts(id));
  }

  return (
    <div className={styles.box}>
      {categoriesList.map((category) => {
        return (
          <div
            onClick={() => getCategoryProducts(category.id)}
            key={category.id}
            className={styles.category}
          >
            <img
              className={styles.img_size}
              src={"http://localhost:3333/" + category.image}
              alt="category image"
            />
            <p>{category.title}</p>
          </div>
        );
      })}

      <hr></hr>

      {productList &&
        productList.map((product) => (
          <div>
            <img src={"http://localhost:3333/" + product.image} alt="" />
            <p>{product.title}</p>
            <p>{product.price}</p>
          </div>
        ))}
    </div>
  );
}

export default CategoriesList;
