import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Card from 'components/Card';
import Button from 'components/Button';
import './ProductPage.css';
import Text from 'components/Text';

// Интерфейс для продукта
interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
  category: { name: string };
}

// Компонент ProductPage
const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedItems, setRelatedItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Функция для получения данных продукта по ID
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://api.escuelajs.co/api/v1/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        setError('Не удалось загрузить данные о продукте');
      } finally {
        setLoading(false);
      }
    };

    // Функция для получения и выбора случайных товаров из первых шести
    const fetchRelatedItems = async () => {
      try {
        const response = await axios.get('https://api.escuelajs.co/api/v1/products');
        const products: Product[] = response.data.slice(0, 6); // Берём только первые 6 товаров

        // Перемешиваем и выбираем три случайных товара
        const shuffled = products.sort(() => 0.5 - Math.random());
        setRelatedItems(shuffled.slice(0, 3)); // Выбираем первые три случайных элемента из перемешанных
      } catch (error) {
        setError('Не удалось загрузить похожие товары');
      }
    };

    fetchProduct();
    fetchRelatedItems();
  }, [id]);

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="ProductPage">
      {product ? (
        <>
          <div className="ProductInfo">
            <h1>{product.title}</h1>
            <img
              src={product.images[0]}
              alt={product.title}
              style={{ width: '80%', maxWidth: '600px' }}
            />
            <p className="ProductPrice">Цена: ${product.price}</p>
            <p className="ProductDescription">{product.description}</p>
            <div className="ProductButtons">
              <Button className="add-to-cart-button">Buy Now</Button>
              {<Button className="add-to-cart-button-2">Add to cart</Button>}
            </div>
          </div>

          <div className="RelatedItems">
            <Text view="p-32" className="page-title-text" weight="bold">
              Related Items
            </Text>
            <div className="RelatedItemsGrid">
              {relatedItems.map((item) => (
                <div key={item.id} className="RelatedItemCard">
                  <Link to={`/product/${item.id}`} className="product-link">
                    <Card
                      image={item.images[0]}
                      title={<span style={{ color:'black', textDecoration: 'none' }}>{item.title}</span>}
                      subtitle={item.description}
                      captionSlot={item.category.name}
                      contentSlot={<span style={{ color: 'black', textDecoration: 'none' }}>${item.price}</span>}
                      actionSlot={<Button className="add-to-cart-button">Add to cart</Button>}
                      className="products__card"
                    />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <p>Продукт не найден</p>
      )}
    </div>
  );
};

export default ProductPage;
