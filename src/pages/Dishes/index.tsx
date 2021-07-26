import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";

import styles from "./styles.module.scss";

type DishType = {
  title: string;
  price: string;
  thumbnail: string;
  description: string;
};

function Dish() {
  const { slug } = useParams<{ slug: string }>();
  const [dish, setDish] = useState<DishType>();

  useEffect(() => {
    async function getDish() {
      const res = await api.get(`dishes/${slug}`);
      setDish(res.data);
    }
    getDish();
  }, [slug]);

  return (
    <div className={styles.container}>
      {dish ? (
        <>
          <img src={dish.thumbnail} alt="" />
          <h2>{dish.title}</h2>
          <p>{dish.description}</p>
        </>
      ) : (
        <h2>Carregando...</h2>
      )}
    </div>
  );
}

export default Dish;
