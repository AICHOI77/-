'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import Image from 'next/image';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { user, userData, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: '홈' },
    { href: '/about', label: '회사소개' },
    { href: '/products', label: '상품' },
    { href: '/success-stories', label: '성공사례' },
  ];

  const userMenuItems = [
    { href: '/mypage/profile', label: '내 정보' },
    { href: '/mypage/orders', label: '주문내역' },
    { href: '/mypage/settings', label: '설정' },
  ];

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/');
    } catch (error) {
      console.error('로그아웃 실패:', error);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'py-3' : 'py-5'
      }`}
    >
      <nav className="container mx-auto px-4">
        <div
          className={`glass glass-hover rounded-2xl px-6 py-4 transition-all duration-300 ${
            scrolled ? 'shadow-lg' : ''
          }`}
        >
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href="/" className="flex items-center space-x-3">
              <Image
                src="/image.png"
                alt="자영업킹 로고"
                width={32}
                height={32}
                className="w-8 h-8 object-contain"
              />
              <span className="text-xl font-bold text-white">
                자영업킹
              </span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    className={`text-sm font-medium transition-colors duration-200 ${
                      isActive
                        ? 'text-red-600 border-b-2 border-red-600 pb-1'
                        : 'text-gray-300 hover:text-white'
                    }`}
                  >
                    {link.label}
                  </a>
                );
              })}
              {user && (
                <a
                  href="/mypage"
                  className={`text-sm font-medium transition-colors duration-200 ${
                    pathname.startsWith('/mypage')
                      ? 'text-red-600 border-b-2 border-red-600 pb-1'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  마이페이지
                </a>
              )}
            </div>

            {/* Auth Buttons / User Dropdown */}
            <div className="hidden md:flex items-center space-x-3">
              {!user ? (
                <>
                  <a
                    href="/login"
                    className="px-5 py-2.5 text-gray-300 hover:text-white transition-colors duration-200 font-medium text-sm"
                  >
                    로그인
                  </a>
                  <a
                    href="/signup"
                    className="px-6 py-2.5 bg-red-600 text-white rounded hover:bg-red-700 transition-all duration-300 font-medium text-sm"
                  >
                    회원가입
                  </a>
                </>
              ) : (
                <div className="relative">
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
                  >
                    <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">
                        {userData?.name?.[0] || user?.email?.[0] || 'U'}
                      </span>
                    </div>
                    <span className="text-sm font-medium">{userData?.name || user?.email}</span>
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {userDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-black border border-gray-800 rounded shadow-lg py-2">
                      {userMenuItems.map((item) => (
                        <a
                          key={item.href}
                          href={item.href}
                          className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-900 transition-colors"
                          onClick={() => setUserDropdownOpen(false)}
                        >
                          {item.label}
                        </a>
                      ))}
                      <hr className="my-2 border-gray-800" />
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-900 transition-colors"
                      >
                        로그아웃
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-gray-300 hover:text-white transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {mobileMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pt-4 border-t border-white/10">
              <div className="flex flex-col space-y-3">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <a
                      key={link.href}
                      href={link.href}
                      className={`text-sm font-medium py-2 transition-colors duration-200 ${
                        isActive
                          ? 'text-red-600'
                          : 'text-gray-300 hover:text-white'
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.label}
                    </a>
                  );
                })}
                {user && (
                  <a
                    href="/mypage"
                    className={`text-sm font-medium py-2 transition-colors duration-200 ${ pathname.startsWith('/mypage')
                        ? 'text-red-600'
                        : 'text-gray-300 hover:text-white'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    마이페이지
                  </a>
                )}
                <div className="flex flex-col space-y-2 mt-4 pt-4 border-t border-white/10">
                  {!user ? (
                    <>
                      <a
                        href="/login"
                        className="text-center px-6 py-2.5 text-gray-300 hover:text-white transition-colors duration-200 font-medium text-sm"
                      >
                        로그인
                      </a>
                      <a
                        href="/signup"
                        className="text-center px-6 py-2.5 bg-red-600 text-white rounded hover:bg-red-700 transition-all duration-300 font-medium text-sm"
                      >
                        회원가입
                      </a>
                    </>
                  ) : (
                    <button
                      onClick={handleLogout}
                      className="text-center px-6 py-2.5 text-gray-300 hover:text-white transition-colors duration-200 font-medium text-sm"
                    >
                      로그아웃
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}