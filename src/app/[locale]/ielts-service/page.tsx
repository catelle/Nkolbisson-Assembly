"use client"

import { CheckCircle, Star, Mail, Phone, BookOpen, FileText, Users, Award, Globe } from "lucide-react";
import { useState } from "react";

import Link from 'next/link';
import { useTranslations } from "next-intl";

export default function IELTSService() {
  const t = useTranslations();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    alert(t('contact.success'));
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-blue-900 text-white py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">IELTS-FADI</h1>
          <div className="flex items-center gap-6">
            <nav className="hidden md:flex space-x-6">
              <a href="#services" className="hover:text-blue-200">{t('nav.services')}</a>
              <a href="#about" className="hover:text-blue-200">{t('nav.about')}</a>
              <a href="#contact" className="hover:text-blue-200">{t('nav.contact')}</a>
            </nav>
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4" />
              <Link href="/fr/ielts-service" className="hover:text-blue-200">FR</Link>
              <span>|</span>
              <Link href="/en/ielts-service" className="hover:text-blue-200">EN</Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&h=600&fit=crop" alt="Students studying" className="w-full h-full object-cover" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-center md:text-left">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">{t('hero.title')}</h2>
              <p className="text-xl mb-8">
                {t('hero.description')}
              </p>
              <button className="bg-orange-500 hover:bg-orange-600 px-8 py-4 rounded-lg text-lg font-semibold transition-colors">
                {t('hero.cta')}
              </button>
            </div>
            <div className="hidden md:block">
              <img src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=400&fit=crop" alt="Happy family with student" className="rounded-lg shadow-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">{t('services.title')}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=200&fit=crop" alt="IELTS preparation" className="w-full h-48 object-cover" />
              <div className="p-8">
                <BookOpen className="w-12 h-12 text-blue-600 mb-4" />
                <h3 className="text-2xl font-bold mb-4">{t('services.ielts.title')}</h3>
                <p className="text-gray-600 mb-4">{t('services.ielts.description')}</p>
                <ul className="space-y-2">
                  <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-500 mr-2" />{t('services.ielts.feature1')}</li>
                  <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-500 mr-2" />{t('services.ielts.feature2')}</li>
                  <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-500 mr-2" />{t('services.ielts.feature3')}</li>
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=200&fit=crop" alt="University campus" className="w-full h-48 object-cover" />
              <div className="p-8">
                <FileText className="w-12 h-12 text-blue-600 mb-4" />
                <h3 className="text-2xl font-bold mb-4">{t('services.university.title')}</h3>
                <p className="text-gray-600 mb-4">{t('services.university.description')}</p>
                <ul className="space-y-2">
                  <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-500 mr-2" />{t('services.university.feature1')}</li>
                  <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-500 mr-2" />{t('services.university.feature2')}</li>
                  <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-500 mr-2" />{t('services.university.feature3')}</li>
                </ul>
              </div>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg">
              <Users className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-2xl font-bold mb-4">{t('services.dossier.title')}</h3>
              <p className="text-gray-600 mb-4">{t('services.dossier.description')}</p>
              <ul className="space-y-2">
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-500 mr-2" />{t('services.dossier.feature1')}</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-500 mr-2" />{t('services.dossier.feature2')}</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-500 mr-2" />{t('services.dossier.feature3')}</li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg">
              <Award className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-2xl font-bold mb-4">{t('services.scholarship.title')}</h3>
              <p className="text-gray-600 mb-4">{t('services.scholarship.description')}</p>
              <ul className="space-y-2">
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-500 mr-2" />{t('services.scholarship.feature1')}</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-500 mr-2" />{t('services.scholarship.feature2')}</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-500 mr-2" />{t('services.scholarship.feature3')}</li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg">
              <Mail className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-2xl font-bold mb-4">{t('services.visa.title')}</h3>
              <p className="text-gray-600 mb-4">{t('services.visa.description')}</p>
              <ul className="space-y-2">
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-500 mr-2" />{t('services.visa.feature1')}</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-500 mr-2" />{t('services.visa.feature2')}</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-500 mr-2" />{t('services.visa.feature3')}</li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg">
              <Phone className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-2xl font-bold mb-4">{t('services.mentoring.title')}</h3>
              <p className="text-gray-600 mb-4">{t('services.mentoring.description')}</p>
              <ul className="space-y-2">
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-500 mr-2" />{t('services.mentoring.feature1')}</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-500 mr-2" />{t('services.mentoring.feature2')}</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-500 mr-2" />{t('services.mentoring.feature3')}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <img src="https://images.unsplash.com/photo-1609220136736-443140cffec6?w=600&h=400&fit=crop" alt="Happy family celebrating success" className="rounded-lg shadow-lg" />
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-4xl font-bold mb-6">{t('about.title')}</h2>
              <p className="text-lg text-gray-600 mb-6">
                {t('about.description')}
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Star className="w-6 h-6 text-yellow-500 mr-3" />
                  <span className="text-lg">{t('about.stat1')}</span>
                </div>
                <div className="flex items-center">
                  <Star className="w-6 h-6 text-yellow-500 mr-3" />
                  <span className="text-lg">{t('about.stat2')}</span>
                </div>
                <div className="flex items-center">
                  <Star className="w-6 h-6 text-yellow-500 mr-3" />
                  <span className="text-lg">{t('about.stat3')}</span>
                </div>
              </div>
            </div>
            <div className="bg-blue-50 p-8 rounded-lg">
              <h3 className="text-2xl font-bold mb-4">{t('process.title')}</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1">1</div>
                  <div>
                    <h4 className="font-semibold">{t('process.step1.title')}</h4>
                    <p className="text-gray-600">{t('process.step1.description')}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1">2</div>
                  <div>
                    <h4 className="font-semibold">{t('process.step2.title')}</h4>
                    <p className="text-gray-600">{t('process.step2.description')}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1">3</div>
                  <div>
                    <h4 className="font-semibold">{t('process.step3.title')}</h4>
                    <p className="text-gray-600">{t('process.step3.description')}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1">4</div>
                  <div>
                    <h4 className="font-semibold">{t('process.step4.title')}</h4>
                    <p className="text-gray-600">{t('process.step4.description')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">{t('contact.title')}</h2>
          <div className="max-w-2xl mx-auto">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg">
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">{t('contact.name')}</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">{t('contact.email')}</label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">{t('contact.phone')}</label>
                  <input
                    type="tel"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">{t('contact.service')}</label>
                  <select
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    value={formData.service}
                    onChange={(e) => setFormData({...formData, service: e.target.value})}
                  >
                    <option value="">{t('contact.selectService')}</option>
                    <option value="ielts">{t('services.ielts.title')}</option>
                    <option value="university">{t('services.university.title')}</option>
                    <option value="dossier">{t('services.dossier.title')}</option>
                    <option value="scholarship">{t('services.scholarship.title')}</option>
                    <option value="visa">{t('services.visa.title')}</option>
                    <option value="mentoring">{t('services.mentoring.title')}</option>
                  </select>
                </div>
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">{t('contact.message')}</label>
                <textarea
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  placeholder={t('contact.messagePlaceholder')}
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-lg transition duration-300"
              >
                {t('contact.submit')}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">IELTS-FADI</h3>
              <p className="text-gray-400">{t('footer.description')}</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">{t('footer.services')}</h4>
              <ul className="space-y-2 text-gray-400">
                <li>{t('services.ielts.title')}</li>
                <li>{t('services.university.title')}</li>
                <li>{t('services.dossier.title')}</li>
                <li>{t('services.scholarship.title')}</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">{t('footer.contact')}</h4>
              <p className="text-gray-400 mb-2">Email: brendaningha71@gmail.com</p>
              <p className="text-gray-400">{t('footer.availability')}</p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 IELTS-FADI. {t('footer.rights')}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}