import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ShoppingCart } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useProducts } from '../context/ProductContext';
import { Button } from '../components/ui/button';
import { getImageUrl } from '../config';

const ProductDetail = () => {
  const { id } = useParams();
  const { language, t } = useLanguage();
  const { products } = useProducts();
  const product = products.find(p => p.id === Number(id));

  if (!product) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <p className="text-[#736c64] text-lg mb-4">
            {language === 'id' ? 'Produk tidak ditemukan' : 'Product not found'}
          </p>
          <Link to="/products">
            <Button className="bg-[#1e1919]">
              <ArrowLeft className="w-4 h-4 mr-2" />
              {language === 'id' ? 'Kembali' : 'Back'}
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20">
      <section className="py-12 bg-[#f7f5f2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/products" className="inline-flex items-center text-[#61525a] hover:text-[#1e1919] transition-colors mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" />
            {language === 'id' ? 'Kembali ke Produk' : 'Back to Products'}
          </Link>
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="aspect-square rounded-3xl overflow-hidden bg-white">
              <img
                src={getImageUrl(product.image)}
                alt={product[`name_${language}`]}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <span className="text-[#61525a] text-sm font-medium tracking-widest uppercase">
                {product.category_name_id || product.category || '-'}
              </span>
              <h1 className="text-3xl md:text-4xl font-bold text-[#1e1919] mt-2 mb-6">
                {product[`name_${language}`]}
              </h1>
              <p className="text-[#736c64] leading-relaxed text-lg mb-8">
                {product[`description_${language}`]}
              </p>
              <Link to="/contact">
                <Button className="w-full sm:w-auto bg-[#1e1919] text-white hover:bg-[#61525a] px-8 py-6 text-base">
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  {t('products.orderNow')}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetail;