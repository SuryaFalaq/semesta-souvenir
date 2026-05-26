import React from 'react';
import { Target, Eye, Award, Heart, Users, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const About = () => {
  const { t } = useLanguage();

  const valueIcons = [Award, Sparkles, Heart, Users];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-24 bg-[#f7f5f2] relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#61525a]/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#61525a]/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-[#61525a] text-sm font-medium tracking-widest uppercase mb-4">
              {t('about.subtitle')}
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1e1919] mb-6">
              {t('about.title')}
            </h1>
            <p className="text-lg text-[#736c64] leading-relaxed">
              {t('about.description')}
            </p>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Vision */}
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-[#f7f5f2] rounded-2xl -z-10" />
              <div className="bg-white border border-[#f7f5f2] rounded-2xl p-8 shadow-sm">
                <div className="w-16 h-16 bg-[#1e1919] rounded-xl flex items-center justify-center mb-6">
                  <Eye className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-[#1e1919] mb-4">
                  {t('about.vision.title')}
                </h2>
                <p className="text-[#736c64] leading-relaxed">
                  {t('about.vision.content')}
                </p>
              </div>
            </div>

            {/* Mission */}
            <div className="relative md:mt-12">
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-[#f7f5f2] rounded-2xl -z-10" />
              <div className="bg-white border border-[#f7f5f2] rounded-2xl p-8 shadow-sm">
                <div className="w-16 h-16 bg-[#61525a] rounded-xl flex items-center justify-center mb-6">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-[#1e1919] mb-4">
                  {t('about.mission.title')}
                </h2>
                <p className="text-[#736c64] leading-relaxed">
                  {t('about.mission.content')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Image */}
      <section className="py-24 bg-[#f7f5f2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl">
            <img
              src="/img/smsta.jpg"
              alt="Semesta Souvenir Office"
              className="w-full h-[400px] md:h-[500px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#1e1919]/80 to-transparent" />
            <div className="absolute bottom-0 left-0 p-8 md:p-12">
              <p className="text-white/80 text-sm tracking-widest uppercase mb-2">Kudus, Jawa Tengah</p>
              <h3 className="text-3xl md:text-4xl font-bold text-white">Semesta Souvenir</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1e1919] mb-4">
              {t('about.subtitle')}
            </h2>
            <div className="w-16 h-1 bg-[#61525a] mx-auto rounded-full" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {t('about.values').map((value, index) => {
              const Icon = valueIcons[index];
              return (
                <div
                  key={index}
                  className="text-center p-8 rounded-2xl bg-[#f7f5f2] hover:bg-[#1e1919] group transition-all duration-300"
                >
                  <div className="w-16 h-16 mx-auto bg-white rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#61525a] transition-colors duration-300">
                    <Icon className="w-8 h-8 text-[#61525a] group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="text-xl font-semibold text-[#1e1919] group-hover:text-white mb-2 transition-colors duration-300">
                    {value.title}
                  </h3>
                  <p className="text-[#736c64] group-hover:text-white/70 text-sm transition-colors duration-300">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
