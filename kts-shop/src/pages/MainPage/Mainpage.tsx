import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '../../components/Card';
import Input from '../../components/Input';
import MultiDropdown from '../../components/MultiDropdown';
import Loader from '../../components/Loader';
import '../../App.css';

interface Product {
  id: number;
  title: string;
  price: number;
  images: string[];
  category: { name: string };
}

const MainPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchValue, setSearchValue] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  // Получение данных из API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://api.escuelajs.co/api/v1/products');
        setProducts(response.data.slice(0, 9)); // Загружаем только первые 9 продуктов
      } catch (error) {
        setError('Не удалось загрузить данные');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Рендеринг состояния загрузки
  if (loading) return <Loader />;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="main-page">
      <header className="main-page__header">
        <h1>Products</h1>
        <p>We display products based on the latest products we have. If you want to see our old products please enter the name of the item</p>
      </header>

      <div className="main-page__controls">
        {/* Компонент поиска */}
        <Input
          value={searchValue}
          onChange={setSearchValue}
          placeholder="Search product"
        />
        {/* Компонент фильтра */}
        <MultiDropdown
          options={[{ key: '1', value: 'Furniture' }, { key: '2', value: 'Electronics' }]}
          value={[]}
          onChange={() => {}}
          getTitle={() => 'Filter'}
        />
      </div>

      <section className="product-grid">
        {products.map(product => (
          <Card
            key={product.id}
            image={product.images[0]}
            title={product.title}
            subtitle={`$${product.price}`}
            captionSlot={product.category.name}
            actionSlot={<button className="add-to-cart-button">Add to Cart</button>}
          />
        ))}
      </section>
      {/* Пагинация будет добавлена позже */}
    </div>
  );
};

export default MainPage;
