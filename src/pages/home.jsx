import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Award, Palette, Clock, BadgeCheck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useProducts } from '../context/ProductContext';
import { Button } from '../components/ui/button';
import { getImageUrl } from '../config';

const Home = () => {
  const { language, t } = useLanguage();
  const { products } = useProducts();

  const featureIcons = [Award, Palette, BadgeCheck, Clock];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center bg-[#f7f5f2] overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-20 w-96 h-96 bg-[#61525a]/5 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-20 w-72 h-72 bg-[#61525a]/5 rounded-full blur-3xl" />
          {/* Grid Lines */}
          <div className="absolute inset-0 opacity-[0.03]">
            <div className="absolute top-0 left-1/4 w-px h-full bg-[#1e1919]" />
            <div className="absolute top-0 left-2/4 w-px h-full bg-[#1e1919]" />
            <div className="absolute top-0 left-3/4 w-px h-full bg-[#1e1919]" />
            <div className="absolute top-1/3 left-0 w-full h-px bg-[#1e1919]" />
            <div className="absolute top-2/3 left-0 w-full h-px bg-[#1e1919]" />
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <p className="text-[#61525a] text-sm font-medium tracking-widest uppercase animate-fade-in">
                  {t('hero.subtitle')}
                </p>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#1e1919] leading-tight">
                  {t('hero.title')}
                </h1>
                <p className="text-lg text-[#736c64] max-w-xl leading-relaxed">
                  {t('hero.description')}
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                <Link to="/products">
                  <Button className="bg-[#1e1919] text-white hover:bg-[#61525a] px-8 py-6 text-base font-medium transition-all duration-300">
                    {t('hero.cta')}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button variant="outline" className="border-[#1e1919] text-[#1e1919] hover:bg-[#1e1919] hover:text-white px-8 py-6 text-base font-medium transition-all duration-300">
                    {t('hero.ctaSecondary')}
                  </Button>
                </Link>
              </div>
            </div>

            {/* Hero Visual */}
            <div className="relative">
              <div className="relative z-10">
                <div className="aspect-square max-w-lg mx-auto relative">
                  <div className="absolute inset-0 bg-[#61525a]/10 rounded-3xl rotate-6" />
                  <div className="absolute inset-0 bg-[#1e1919] rounded-3xl overflow-hidden shadow-2xl">
                    <img
                      src="/img/tas imlek.jpg"
                      alt="Premium Souvenirs"
                      className="w-full h-full object-cover opacity-80"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1e1919]/60 to-transparent" />
                    <div className="absolute bottom-8 left-8 right-8">
                      <p className="text-white/80 text-sm tracking-widest uppercase mb-2">Premium Quality</p>
                      <p className="text-white text-2xl font-bold">Souvenir Berkualitas</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1e1919] mb-4">
              {t('features.title')}
            </h2>
            <div className="w-16 h-1 bg-[#61525a] mx-auto rounded-full" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {t('features.items').map((feature, index) => {
              const Icon = featureIcons[index];
              return (
                <div
                  key={index}
                  className="group p-8 bg-[#f7f5f2] rounded-2xl hover:bg-[#1e1919] transition-all duration-300"
                >
                  <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#61525a] transition-colors duration-300">
                    <Icon className="w-7 h-7 text-[#61525a] group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="text-xl font-semibold text-[#1e1919] group-hover:text-white mb-3 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-[#736c64] group-hover:text-white/70 text-sm leading-relaxed transition-colors duration-300">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Products Preview */}
      <section className="py-24 bg-[#f7f5f2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16">
            <div>
              <p className="text-[#61525a] text-sm font-medium tracking-widest uppercase mb-2">
                {t('products.subtitle')}
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-[#1e1919]">
                {t('products.title')}
              </h2>
            </div>
            <Link to="/products" className="mt-4 md:mt-0">
              <Button variant="ghost" className="text-[#61525a] hover:text-[#1e1919] font-medium">
                {t('products.viewAll')}
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.length === 0 ? (
              <div className="col-span-full text-center py-8">
                <p className="text-[#736c64]">Belum ada produk</p>
              </div>
            ) : (
              products.map((product) => (
                <div
                  key={product.id}
                  className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={getImageUrl(product.image)}
                      alt={product[`name_${language}`]}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-[#1e1919] mb-2">
                      {product[`name_${language}`]}
                    </h3>
                    <p className="text-[#736c64] text-sm line-clamp-2">
                      {product[`description_${language}`]}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-[#1e1919]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            {language === 'id' ? 'Siap Membuat Souvenir Impian Anda?' : 'Ready to Create Your Dream Souvenirs?'}
          </h2>
          <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
            {language === 'id'
              ? 'Hubungi kami sekarang dan wujudkan souvenir berkualitas untuk acara Anda.'
              : 'Contact us now and create quality souvenirs for your event.'}
          </p>
          <Link to="/contact">
            <Button className="bg-white text-[#1e1919] hover:bg-[#f7f5f2] px-10 py-6 text-base font-medium transition-all duration-300">
              {t('hero.ctaSecondary')}
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
