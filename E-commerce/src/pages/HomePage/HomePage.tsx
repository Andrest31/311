import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from 'components/Loader';
import Text from 'components/Text/Text';
import Input from 'components/Input';
import Button from 'components/Button';
import MultiDropdown from 'components/MultiDropdown';
import Card from 'components/Card';
import ArrowDownIcon from 'components/icons/ArrowDownIcon';
import './HomePage.css';
import PaginationIcon from 'components/PaginationIcon/PaginationIcon';
import { useNavigate } from 'react-router-dom';

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  images: string[];
  category: { name: string };
}

const HomePage: React.FC = () => {


  
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchValue, setSearchValue] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalPages = 10; // Общее количество страниц (можно заменить на динамическое значение)

   // Навигация
   const navigate = useNavigate();


   
   // Обработка клика по карточке для перехода на страницу с деталями продукта
  const handleCardClick = (productId: number) => {
    navigate(`/product/${productId}`); // Замените путь на нужный URL
  };

  // Получение данных из API
  const fetchProducts = async (page: number) => {
    setLoading(true);
    try {
      const response = await axios.get('https://api.escuelajs.co/api/v1/products', {
        params: {
          offset: (page - 1) * 9,
          limit: 9,
        },
      });
      console.log('Products fetched from server:', response.data); // выводим данные в консоль
      setProducts(response.data);
    } catch (error) {
      setError('Не удалось загрузить данные');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (loading) return <Loader />;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <main id="main" className="page ">
      <div className="page__main-block _container">
        <div className="products-content">
          <div className="products__header">
            <div className="products__title">
              <Text className='text-title'>Products</Text>
            </div>
            <div className="products__description">
              <Text view="p-20" color='secondary'>
                We display products based on the latest products we have. If you want to see our old products, please enter the name of the item.
              </Text>
            </div>
          </div>
  
          <div className="products__controls">
            <div className="products__search">
              <div className="products__search-column--left">
                <Input
                  value={searchValue}
                  onChange={setSearchValue}
                  placeholder="Search product"
                />
              </div>
              <Button className='products__search-column--right'>Find now</Button>
            </div>
  
            <div className="products__filter">
              <MultiDropdown
                options={[{ key: '1', value: 'Furniture' }, { key: '2', value: 'Electronics' }]}
                value={[]}
                onChange={() => {}}
                getTitle={() => 'Filter'}
              />
            </div>
          </div>
  
          <div className='products__body'>
            <div className='products__subtitle'>
              <Text view="p-32" className="page-title" weight="bold">
                Total Products
              </Text>
              <Text view="p-20" color='accent' weight="bold">
                184 
              </Text>
            </div>
    
            <section className="products__cards">
              {products.map(product => (
                <div className="products__column" key={product.id}>
                  <Card
                    image={product.images[0]}
                    title={product.title}
                    subtitle={product.description}
                    captionSlot={product.category.name}
                    contentSlot={`$${product.price}`}
                    actionSlot={<Button className="add-to-cart-button">Add to Cart</Button>}
                    className="products__card"
                    onClick={() => handleCardClick(product.id)} // Передаем функцию навигации
                  />
                </div>
              ))}
            </section>
          </div>
  
          <div className="products__pagination">
          <div onClick={() => handlePageChange(currentPage > 1 ? currentPage - 1 : 1)}>
            <PaginationIcon />
          </div>
          <div className="products__pagination-buttons">
            {[1, 2, 3, "...", totalPages].map((page, index) => (
              <Button
                key={index}
                className={`pagination-button ${page === currentPage ? 'active-page' : ''}`}
                onClick={() => typeof page === 'number' && handlePageChange(page)}
              >
                {page}
              </Button>
            ))}
          </div>
          <div onClick={() => handlePageChange(currentPage < totalPages ? currentPage + 1 : totalPages)}>
            <PaginationIcon direction="right" />
          </div>
        </div>
        </div>
      </div>
    </main>
  );
  
  
};

export default HomePage;
