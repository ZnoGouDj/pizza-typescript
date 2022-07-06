import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const FullPizza = () => {
  const [pizza, setPizza] = React.useState();
  const { id } = useParams();

  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get('https://62a0f78a7b9345bcbe4358a7.mockapi.io/items/' + id);
        setPizza(data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchPizza();
  }, []);

  if (!pizza) {
    return 'Loading...';
  }

  return (
    <div className="container">
      <img src={pizza.image} />
      <h2>{pizza.title}</h2>
      <h4>{pizza.price} ₽</h4>
    </div>
  );
};

export default FullPizza;