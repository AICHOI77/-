export default function Footer() {
  return (
    <footer className="bg-gray-50">
      <div className="container mx-auto py-12 px-6">
        {/* 회사정보 영역 */}
        <div className="text-left">
          <h3 className="font-bold text-gray-900 text-lg mb-4">자영업킹</h3>
          <div className="space-y-2 text-gray-600">
            <p>주소: 서울 강남구</p>
            <p>전화번호: 010-4444-2222</p>
            <p>이메일: king@gmail.com</p>
            <p>사업자등록번호: 123-45-67890</p>
          </div>
        </div>

        {/* 저작권 영역 */}
        <div className="border-t border-gray-200 pt-8 mt-8">
          <p className="text-sm text-gray-600 text-center">
            Copyright © {new Date().getFullYear()} 자영업킹. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}