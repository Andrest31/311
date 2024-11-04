// navigationUtils.ts
import { useNavigate } from 'react-router-dom';
import { ProductI } from 'pages/HomePage/HomePage';

export const handleCardClick = (product: ProductI, products: ProductI[], navigate: (path: string, options?: any) => void) => {
  navigate(`/product/${product.id}`, {
    state: { product, products },
  });
};
