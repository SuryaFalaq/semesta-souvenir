import React, { useState } from 'react';
import { MapPin, Phone, Mail, Instagram, Send, CheckCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { products, contactInfo } from '../data/mock';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { getApiUrl } from '../config';

const Contact = () => {
  const { language, t } = useLanguage();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    product: '',
    quantity: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProductChange = (value) => {
    setFormData((prev) => ({ ...prev, product: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(getApiUrl('/api/contact'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setIsSubmitted(true);
        setTimeout(() => {
          setIsSubmitted(false);
          setFormData({
            name: '',
            email: '',
            phone: '',
            product: '',
            quantity: '',
            message: '',
          });
        }, 3000);
      }
    } catch (err) {
      console.error('Error submitting form:', err);
    }
  };

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
              {t('contact.subtitle')}
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1e1919] mb-6">
              {t('contact.title')}
            </h1>
            <p className="text-lg text-[#736c64]">
              {t('contact.description')}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-[#1e1919] mb-6">
                  {t('contact.info.address')}
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-[#f7f5f2] rounded-xl flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-[#61525a]" />
                    </div>
                    <div>
                      <p className="font-medium text-[#1e1919] mb-1">{t('contact.info.address')}</p>
                      <p className="text-[#736c64]">{contactInfo.address}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-[#f7f5f2] rounded-xl flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-[#61525a]" />
                    </div>
                    <div>
                      <p className="font-medium text-[#1e1919] mb-1">{t('contact.info.phone')}</p>
                      <p className="text-[#736c64]">{contactInfo.phone}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-[#f7f5f2] rounded-xl flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-[#61525a]" />
                    </div>
                    <div>
                      <p className="font-medium text-[#1e1919] mb-1">{t('contact.info.email')}</p>
                      <p className="text-[#736c64]">{contactInfo.email}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-[#f7f5f2] rounded-xl flex items-center justify-center flex-shrink-0">
                      <Instagram className="w-5 h-5 text-[#61525a]" />
                    </div>
                    <div>
                      <p className="font-medium text-[#1e1919] mb-1">{t('contact.info.social')}</p>
                      <a
                        href={`https://instagram.com/${contactInfo.instagram}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#61525a] hover:text-[#1e1919] transition-colors"
                      >
                        @{contactInfo.instagram}
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* WhatsApp Button */}
              <a
                href={`https://wa.me/${contactInfo.whatsapp.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-3 bg-[#25D366] text-white px-6 py-4 rounded-xl hover:bg-[#128C7E] transition-colors duration-300"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                <span className="font-medium">
                  {language === 'id' ? 'Chat via WhatsApp' : 'Chat via WhatsApp'}
                </span>
              </a>
            </div>

            {/* Order Form */}
            <div className="lg:col-span-3">
              <div className="bg-[#f7f5f2] rounded-3xl p-8 md:p-10">
                <h2 className="text-2xl font-bold text-[#1e1919] mb-6">
                  {language === 'id' ? 'Form Pemesanan' : 'Order Form'}
                </h2>

                {isSubmitted ? (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <div className="w-20 h-20 bg-[#25D366]/20 rounded-full flex items-center justify-center mb-6">
                      <CheckCircle className="w-10 h-10 text-[#25D366]" />
                    </div>
                    <h3 className="text-xl font-semibold text-[#1e1919] mb-2">
                      {language === 'id' ? 'Pesanan Terkirim!' : 'Order Submitted!'}
                    </h3>
                    <p className="text-[#736c64]">
                      {t('contact.form.success')}
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-[#1e1919] font-medium">
                          {t('contact.form.name')}
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="bg-white border-0 h-12 focus:ring-2 focus:ring-[#61525a]"
                          placeholder={language === 'id' ? 'Masukkan nama Anda' : 'Enter your name'}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-[#1e1919] font-medium">
                          {t('contact.form.email')}
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="bg-white border-0 h-12 focus:ring-2 focus:ring-[#61525a]"
                          placeholder={language === 'id' ? 'Masukkan email Anda' : 'Enter your email'}
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-[#1e1919] font-medium">
                          {t('contact.form.phone')}
                        </Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          className="bg-white border-0 h-12 focus:ring-2 focus:ring-[#61525a]"
                          placeholder={language === 'id' ? 'Masukkan nomor telepon' : 'Enter phone number'}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="quantity" className="text-[#1e1919] font-medium">
                          {t('contact.form.quantity')}
                        </Label>
                        <Input
                          id="quantity"
                          name="quantity"
                          type="number"
                          min="1"
                          value={formData.quantity}
                          onChange={handleChange}
                          required
                          className="bg-white border-0 h-12 focus:ring-2 focus:ring-[#61525a]"
                          placeholder={language === 'id' ? 'Jumlah pesanan' : 'Order quantity'}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="product" className="text-[#1e1919] font-medium">
                        {t('contact.form.product')}
                      </Label>
                      <Select onValueChange={handleProductChange} value={formData.product}>
                        <SelectTrigger className="bg-white border-0 h-12 focus:ring-2 focus:ring-[#61525a]">
                          <SelectValue placeholder={language === 'id' ? 'Pilih produk...' : 'Select product...'} />
                        </SelectTrigger>
                        <SelectContent>
                          {products.map((product) => (
                            <SelectItem key={product.id} value={product.name[language]}>
                              {product.name[language]}
                            </SelectItem>
                          ))}
                          <SelectItem value={language === 'id' ? 'Lainnya' : 'Other'}>
                            {language === 'id' ? 'Lainnya' : 'Other'}
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-[#1e1919] font-medium">
                        {t('contact.form.message')}
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={5}
                        className="bg-white border-0 focus:ring-2 focus:ring-[#61525a] resize-none"
                        placeholder={language === 'id' ? 'Deskripsikan detail pesanan Anda...' : 'Describe your order details...'}
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-[#1e1919] text-white hover:bg-[#61525a] h-14 text-base font-medium transition-all duration-300"
                    >
                      <Send className="w-4 h-4 mr-2" />
                      {t('contact.form.submit')}
                    </Button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
