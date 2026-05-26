import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useProducts } from '../context/ProductContext';
import { Button } from '../components/ui/button';
import { getImageUrl } from '../config';

const Products = () => {
  const { language, t } = useLanguage();
  const { products } = useProducts();

  if (products.length === 0) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <p className="text-[#736c64]">Belum ada produk tersedia</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-24 bg-[#f7f5f2] relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-20 w-96 h-96 bg-[#61525a]/5 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-20 w-72 h-72 bg-[#61525a]/5 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <p className="text-[#61525a] text-sm font-medium tracking-widest uppercase mb-4">
              {t('products.subtitle')}
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1e1919] mb-6">
              {t('products.title')}
            </h1>
            <p className="text-lg text-[#736c64]">
              {language === 'id'
                ? 'Temukan berbagai produk souvenir berkualitas untuk setiap momen spesial Anda.'
                : 'Discover various quality souvenir products for every special moment.'}
            </p>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {products.map((product, index) => (
              <div
                key={product.id}
                className={`group relative overflow-hidden rounded-3xl bg-[#f7f5f2] ${
                  index === 0 ? 'md:col-span-2' : ''
                }`}
              >
                <div className={`grid ${index === 0 ? 'md:grid-cols-2' : ''} gap-0`}>
                  <div className={`aspect-[4/3] ${index === 0 ? 'md:aspect-square' : ''} overflow-hidden`}>
                    <img
                      src={getImageUrl(product.image)}
                      alt={product[`name_${language}`]}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="p-8 md:p-10 flex flex-col justify-center">
                    <div className="mb-4">
                      <span className="text-[#61525a] text-xs font-medium tracking-widest uppercase">
                        {product.category_id || product.category || '-'}
                      </span>
                    </div>
                    <h2 className={`font-bold text-[#1e1919] mb-4 ${index === 0 ? 'text-3xl md:text-4xl' : 'text-2xl'}`}>
                      {product[`name_${language}`]}
                    </h2>
                    <p className="text-[#736c64] leading-relaxed mb-6">
                      {product[`description_${language}`]}
                    </p>
                    <Link to="/contact">
                      <Button className="w-full sm:w-auto bg-[#1e1919] text-white hover:bg-[#61525a] transition-all duration-300">
                        {t('products.orderNow')}
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Custom Order CTA */}
      <section className="py-24 bg-[#1e1919]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            {language === 'id' ? 'Butuh Desain Custom?' : 'Need Custom Design?'}
          </h2>
          <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
            {language === 'id'
              ? 'Kami siap membantu mewujudkan souvenir dengan desain khusus sesuai kebutuhan Anda.'
              : 'We are ready to help create souvenirs with custom designs according to your needs.'}
          </p>
          <Link to="/contact">
            <Button className="bg-white text-[#1e1919] hover:bg-[#f7f5f2] px-10 py-6 text-base font-medium transition-all duration-300">
              {language === 'id' ? 'Hubungi Kami' : 'Contact Us'}
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Products;