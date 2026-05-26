import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Mail, Phone, MapPin } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { contactInfo } from '../data/mock';

const Footer = () => {
  const { t } = useLanguage();

  const quickLinks = [
    { path: '/', label: t('nav.home') },
    { path: '/about', label: t('nav.about') },
    { path: '/products', label: t('nav.products') },
    { path: '/contact', label: t('nav.contact') },
  ];

  return (
    <footer className="bg-[#1e1919] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-bold tracking-tight">Semesta Souvenir</h3>
              <p className="text-xs text-[#bbb5ae] tracking-widest uppercase mt-1">
              </p>
            </div>
            <p className="text-[#bbb5ae] text-sm leading-relaxed">
              {t('footer.description')}
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-[#bbb5ae]">
              {t('footer.quickLinks')}
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-white/80 hover:text-white text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-[#bbb5ae]">
              {t('footer.contactInfo')}
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-[#61525a] mt-0.5 flex-shrink-0" />
                <span className="text-white/80 text-sm">{contactInfo.address}</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-[#61525a] flex-shrink-0" />
                <span className="text-white/80 text-sm">{contactInfo.phone}</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-[#61525a] flex-shrink-0" />
                <span className="text-white/80 text-sm">{contactInfo.email}</span>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-[#bbb5ae]">
              {t('footer.followUs')}
            </h4>
            <a
              href={`https://instagram.com/${contactInfo.instagram}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-3 text-white/80 hover:text-white transition-colors duration-200 group"
            >
              <span className="p-2 rounded-full bg-white/10 group-hover:bg-[#61525a] transition-colors duration-200">
                <Instagram className="w-5 h-5" />
              </span>
              <span className="text-sm">@{contactInfo.instagram}</span>
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <p className="text-center text-[#bbb5ae] text-sm">
            {t('footer.copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
