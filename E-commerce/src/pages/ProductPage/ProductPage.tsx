import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import PaginationIcon from 'components/PaginationIcon/PaginationIcon';
import Text from 'components/Text/Text';
import Card from 'components/Card';
import '../HomePage/HomePage.css';
import './ProductPage.css';
import { ProductI } from 'pages/HomePage/HomePage';
import Button from 'components/Button';
import { handleCardClick } from 'utils/navigationUtils';

const ProductPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { product } = location.state || {};
    const [allProducts, setAllProducts] = useState<ProductI[]>([]);
    const [relatedProducts, setRelatedProducts] = useState<ProductI[]>([]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const isFirstImage = currentImageIndex === 0;
    const isLastImage = currentImageIndex === product.images.length - 1;

    // Загружаем все продукты при монтировании компонента
    useEffect(() => {
        const fetchAllProducts = async () => {
            try {
                const response = await axios.get('https://api.escuelajs.co/api/v1/products');
                setAllProducts(response.data);
            } catch (error) {
                console.error("Ошибка загрузки продуктов:", error);
            }
        };

        fetchAllProducts();
    }, []);

    // Выборка трех случайных продуктов из первых 7 позиций той же категории
    useEffect(() => {
        if (allProducts.length > 0) {
            // Фильтруем продукты по категории
            const sameCategoryProducts = allProducts
                .filter((p) => p.category.name === product.category.name && p.id !== product.id)
                .slice(0, 7); // Берем только первые 7 продуктов

            // Выбираем случайные продукты из первых 7 отфильтрованных
            const selectedProducts = sameCategoryProducts
                .sort(() => 0.5 - Math.random())
                .slice(0, 3);

            // Если выбранных продуктов меньше трех, добавляем из общего списка (первые 7)
            if (selectedProducts.length < 3) {
                const additionalProducts = allProducts
                    .filter((p) => !selectedProducts.some((sp) => sp.id === p.id) && p.id !== product.id)
                    .slice(0, 7) // Берем первые 7
                    .sort(() => 0.5 - Math.random())
                    .slice(0, 3 - selectedProducts.length);

                setRelatedProducts([...selectedProducts, ...additionalProducts]);
            } else {
                setRelatedProducts(selectedProducts);
            }
        }
    }, [allProducts, product]);

    const handleNextImage = () => {
        if (!isLastImage) {
            setCurrentImageIndex(currentImageIndex + 1);
        }
    };

    const handlePrevImage = () => {
        if (!isFirstImage) {
            setCurrentImageIndex(currentImageIndex - 1);
        }
    };

    return (
        <main id="main" className="page">
            <div className="page__product _container">
                <div className="product__button-container">
                    <div className="product__buttton_back" onClick={() => navigate('/')}>
                        <PaginationIcon />
                        <Text view="p-20">Назад</Text>
                    </div>
                </div>

                <div className="product__content">
                    <div className="ProductContentWrapper">
                        <div className="ImageSlider">
                            <button
                                onClick={handlePrevImage}
                                className={`slider-button slider-button-left ${isFirstImage ? 'disabled' : ''}`}
                                disabled={isFirstImage}
                            >
                                <PaginationIcon direction="left" color="secondary" />
                            </button>

                            <img
                                src={product.images[currentImageIndex]}
                                alt={product.title}
                                className="ProductImage"
                                style={{ width: '50%', maxWidth: '400px' }}
                            />

                            <button
                                onClick={handleNextImage}
                                className={`slider-button slider-button-right ${isLastImage ? 'disabled' : ''}`}
                                disabled={isLastImage}
                            >
                                <PaginationIcon direction="right" color="secondary" />
                            </button>
                        </div>

                        <div className="product__text-container">
                            <div className="product__text_title">
                                <Text view="title" weight="bold">
                                    {product.title}
                                </Text>
                                <Text view="p-20" color="secondary">
                                    {product.description}
                                </Text>
                            </div>
                            <div className="product__price">
                                <Text view="title" className="page-title-price" weight="bold">
                                    ${product.price}
                                </Text>
                                <div className="product__buttons">
                                    <Button width="135px" className="buy-now-button">Buy Now</Button>
                                    <Button className="add-to-cart-button">Add to Cart</Button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="product__related-cards">
                        <Text view="p-32" className="product__title" weight="bold">
                            Related Items
                        </Text>
                        <div className="related-products _cards">
                            {relatedProducts.map((relatedProduct: ProductI) => (
                                <Card
                                    key={relatedProduct.id}
                                    image={relatedProduct.images[0]}
                                    title={relatedProduct.title}
                                    subtitle={relatedProduct.description}
                                    captionSlot={relatedProduct.category.name}
                                    contentSlot={`$${relatedProduct.price}`}
                                    actionSlot={<Button>Add to Cart</Button>}
                                    className="related-product-card"
                                    onClick={() => handleCardClick(relatedProduct, allProducts, navigate)}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default ProductPage;
