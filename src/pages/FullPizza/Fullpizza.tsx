import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PizzaType } from '../../common/types';
import axios from 'axios';

export const FullPizza = () => {
  const [pizza, setPizza] = useState<null | PizzaType>(null);
  const { id } = useParams();

  useEffect(() => {
    async function fetchPizza() {
      try {
        const {data} = await axios.get('https://63447feb242c1f347f8782db.mockapi.io/Items/' + id)
        setPizza(data)
      } catch (error) {
        alert('Ошибка при получении пиццы!')
      }
    }

    fetchPizza()
  }, []);

  if (!pizza) {
    return (
      <div>Загрузка</div>
    )
  }

  return (
    <div>
      <img src={pizza.imageUrl} alt='imgaPizza' />
      <h2>{pizza.title}</h2>
      <h4>{pizza.price}</h4>
    </div>
  );
};
