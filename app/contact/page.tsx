'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    business: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: 실제 폼 제출 로직
    alert('문의가 접수되었습니다. 빠른 시일 내에 연락드리겠습니다.');
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const contactInfo = [
    {
      icon: '📧',
      title: '이메일',
      value: 'support@salesboost.kr',
      link: 'mailto:support@salesboost.kr',
    },
    {
      icon: '📞',
      title: '전화',
      value: '02-1234-5678',
      link: 'tel:02-1234-5678',
    },
    {
      icon: '💬',
      title: '카카오톡',
      value: '@salesboost',
      link: 'https://pf.kakao.com',
    },
    {
      icon: '🕐',
      title: '운영시간',
      value: '평일 09:00 - 18:00',
      link: null,
    },
  ];

  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="text-white">
              문의하기
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            궁금한 점이 있으신가요?
            <br />
            언제든지 편하게 문의해주세요
          </p>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className="glass glass-hover rounded-2xl p-6 text-center"
              >
                <div className="text-5xl mb-4">{info.icon}</div>
                <h3 className="text-lg font-bold text-white mb-2">
                  {info.title}
                </h3>
                {info.link ? (
                  <a
                    href={info.link}
                    className="text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    {info.value}
                  </a>
                ) : (
                  <p className="text-gray-400">{info.value}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="glass rounded-3xl p-8 md:p-12">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">
              상담 신청하기
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    이름 *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-xl text-white focus:outline-none focus:border-blue-500 transition-colors"
                    placeholder="홍길동"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    이메일 *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-xl text-white focus:outline-none focus:border-blue-500 transition-colors"
                    placeholder="example@email.com"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    전화번호 *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-xl text-white focus:outline-none focus:border-blue-500 transition-colors"
                    placeholder="010-1234-5678"
                  />
                </div>

                {/* Business Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    업종 *
                  </label>
                  <select
                    name="business"
                    value={formData.business}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-xl text-white focus:outline-none focus:border-blue-500 transition-colors"
                  >
                    <option value="">선택해주세요</option>
                    <option value="restaurant">음식점</option>
                    <option value="cafe">카페</option>
                    <option value="retail">소매점</option>
                    <option value="beauty">뷰티샵</option>
                    <option value="fitness">피트니스</option>
                    <option value="education">교육</option>
                    <option value="other">기타</option>
                  </select>
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  문의 내용 *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-xl text-white focus:outline-none focus:border-blue-500 transition-colors resize-none"
                  placeholder="궁금하신 내용을 자세히 적어주세요"
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full px-8 py-4 bg-red-600 text-white rounded hover:bg-red-700 transition-all duration-300 font-semibold text-lg"
              >
                문의 보내기
              </button>

              <p className="text-sm text-gray-400 text-center">
                영업일 기준 24시간 이내에 답변드립니다
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* Map Section (Optional) */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-12">
            <span className="text-white">
              오시는 길
            </span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Address Info */}
            <div className="glass rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6">본사 위치</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-semibold text-gray-400 mb-1">
                    주소
                  </h4>
                  <p className="text-white">
                    서울특별시 강남구 테헤란로 123
                    <br />
                    SalesBoost 빌딩 5층
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-400 mb-1">
                    교통
                  </h4>
                  <p className="text-white">
                    지하철 2호선 강남역 3번 출구 도보 5분
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-400 mb-1">
                    주차
                  </h4>
                  <p className="text-white">
                    건물 지하 주차장 이용 가능 (2시간 무료)
                  </p>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="glass rounded-2xl p-8 flex items-center justify-center">
              <div className="text-center text-gray-400">
                <div className="text-6xl mb-4">🗺️</div>
                <p>지도 영역</p>
                <p className="text-sm">(실제 서비스에서는 지도 API 연동)</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}