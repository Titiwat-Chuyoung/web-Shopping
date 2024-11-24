
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';  // ใช้ useNavigate สำหรับการเปลี่ยนเส้นทาง
import axios from 'axios';

const ShopPage = () => {
  const [showMoreCategories, setShowMoreCategories] = useState(false);
  const [showMoreBrands, setShowMoreBrands] = useState(false);
  const [showMoreSizes, setShowMoreSizes] = useState(false);
  const [products, setProducts] = useState([]);  // State สำหรับเก็บข้อมูลสินค้า
  const [loading, setLoading] = useState(true);  // State สำหรับการโหลดข้อมูล

  const navigate = useNavigate();  // สร้างฟังก์ชัน navigate เพื่อเปลี่ยนเส้นทาง

  useEffect(() => {
    // ดึงข้อมูลสินค้าเมื่อ component โหลด
    axios.get('http://localhost:5000/api/products')
      .then(response => {
        setProducts(response.data);  // เก็บข้อมูลใน state
        setLoading(false);  // เปลี่ยนสถานะการโหลดเป็น false
      })
      .catch(error => {
        console.error('Error fetching products:', error);
        setLoading(false);  // เปลี่ยนสถานะการโหลดเป็น false ถ้าเกิดข้อผิดพลาด
      });
  }, []);

  // ฟังก์ชันสำหรับการไปหน้า Admin
  const goToAdmin = () => {
    navigate('/admin');  // เปลี่ยนเส้นทางไปหน้า Admin
  };

  return (
    <div className="bg-white min-h-screen font-sans">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-2 border bg-white">
        <div className="flex items-center">
          <img
            src="/images/Brown Simple Interior Furniture Initial Logo 3.png"
            alt="Mixmax Logo"
            className="w-30 h-40 mr-2"
          />
        </div>
        <div className="flex items-center space-x-4">
          <button className="text-gray-600 hover:text-gray-800">
            <img src="/images/Vector.png" alt="Profile" className="w-6 h-6 mr-2" />
          </button>
          <button className="text-gray-600 hover:text-gray-800">
            <img src="/images/Shopping Cart.png" alt="Cart" className="w-10 h-10 mr-2" />
          </button>
          <button className="text-gray-600 hover:text-gray-800">
            <img src="/images/Globe.png" alt="Profile" className="w-6 h-17 mr-2" />
          </button>
        </div>
      </nav>

      {/* Header */}
      <header
        className="bg-gradient-to-r from-[#B993D6] to-[#8DD5FA] p-12 mx-12 mt-2 rounded-3xl border border-transparent text-center relative"
        style={{
          boxShadow: 'inset 0px 5px 5px rgba(0, 0, 0, 0.3)',
        }}
      >
        <h1 className="text-5xl text-white font-normal">MIXMAX SHOP</h1>
        <p className="text-gray-500 text-lg mt-2">Order & order shop</p>
        <div className="mt-6 flex justify-center">
          <input
            className="p-3 rounded-2xl shadow-md focus:shadow-lg transition-shadow duration-300 w-[500px] focus:outline-none border border-gray-300"
            type="text"
            placeholder=" Search items..."
          />
        </div>
      </header>

      <div className="p-14 flex">
        {/* Sidebar */}
        <aside className="w-1/5 pr-8">
          {/* หมวดหมู่ */}
          <div className="mb-8">
            <h2 className="font-bold text-lg mb-4">หมวดหมู่</h2>
            <ul className="space-y-1 text-gray-700">
              <li className="hover:text-blue-600 cursor-pointer">เสื้อนักศึกษาหญิงแขนยาว</li>
              <li className="hover:text-blue-600 cursor-pointer">กางเกงขายาว</li>
              <li className="hover:text-blue-600 cursor-pointer">เสื้อนักศึกษาชายแขนสั้น</li>
              <li className="hover:text-blue-600 cursor-pointer">กระโปรงทรงเอ</li>
              <li className="hover:text-blue-600 cursor-pointer">เข็มขัด</li>
              <li className="hover:text-blue-600 cursor-pointer">รองเท้า</li>
              {showMoreCategories && (
                <>
                  <li className="hover:text-blue-600 cursor-pointer">เสื้อเชิ้ตสีขาวแขนสั้น</li>
                  <li className="hover:text-blue-600 cursor-pointer">เทคโท</li>
                  <li className="hover:text-blue-600 cursor-pointer">กระโปรงทรงสอบ</li>
                </>
              )}
            </ul>
            <button
              onClick={() => setShowMoreCategories(!showMoreCategories)}
              className="text-black mt-2 focus:outline-none text-nomal"
            >
              {showMoreCategories ? 'แสดงน้อยลง ▲' : 'ดูเพิ่มเติม ▼'}
            </button>
          </div>

          {/* แบรนด์ */}
          <div className="mb-8">
            <h2 className="font-bold text-lg mb-4">แบรนด์</h2>
            <ul className="space-y-1 text-gray-700">
              <li><input type="checkbox" className="mr-2" /> Bigone</li>
              <li><input type="checkbox" className="mr-2" /> Student Uniform</li>
              <li><input type="checkbox" className="mr-2" /> Uniform Studio</li>
              <li><input type="checkbox" className="mr-2" /> Yuedpao</li>
              {showMoreBrands && (
                <>
                  <li><input type="checkbox" className="mr-2" /> Woma</li>
                  <li><input type="checkbox" className="mr-2" /> Branche</li>
                  <li><input type="checkbox" className="mr-2" /> Nobranb</li>
                </>
              )}
            </ul>
            <button
              onClick={() => setShowMoreBrands(!showMoreBrands)}
              className="text-black mt-2 focus:outline-none text-sm"
            >
              {showMoreBrands ? 'แสดงน้อยลง ▲' : 'ดูเพิ่มเติม ▼'}
            </button>
          </div>

          {/* ไซส์ */}
          <div className="mb-8">
            <h2 className="font-bold text-lg mb-4">ไซส์</h2>
            <ul className="space-y-1 text-gray-700">
              <li><input type="checkbox" className="mr-2" /> 36</li>
              <li><input type="checkbox" className="mr-2" /> 38</li>
              <li><input type="checkbox" className="mr-2" /> 40</li>
              <li><input type="checkbox" className="mr-2" /> 42</li>
              {showMoreSizes && (
                <>
                  <li><input type="checkbox" className="mr-2" /> 44</li>
                  <li><input type="checkbox" className="mr-2" /> 46</li>
                </>
              )}
            </ul>
            <button
              onClick={() => setShowMoreSizes(!showMoreSizes)}
              className="text-black mt-2 focus:outline-none text-sm"
            >
              {showMoreSizes ? 'แสดงน้อยลง ▲' : 'ดูเพิ่มเติม ▼'}
            </button>
          </div>
        </aside>

        {/* Main content */}
        <main className="w-3/4">
          {/* ปุ่มสินค้าแนะนำ */}
          <div className="flex justify-start mb-8">
            <button className="bg-gradient-to-r from-[#B993D6] to-[#8DD5FA] text-white px-8 py-3 rounded-lg shadow-md text-lg font-semibold hover:shadow-lg transition duration-300">
              สินค้าแนะนำ
            </button>
          </div>

          {/* เพิ่มปุ่มสำหรับไปยังหน้า Admin */}
          <div className="flex justify-start mb-8">
            <button
              onClick={goToAdmin}
              className="bg-gradient-to-r from-[#B993D6] to-[#8DD5FA] text-white px-8 py-3 rounded-lg shadow-md text-lg font-semibold hover:shadow-lg transition duration-300"
            >
              ไปยังหน้า Admin
            </button>
          </div>

          <div className="grid grid-cols-3 gap-8">
            {/* แสดงสินค้าที่ดึงมาจาก MySQL */}
            {loading ? (
              <p>Loading...</p>
            ) : (
              products.map((product) => (
                <div key={product.id} className="bg-white rounded-lg shadow-lg p-4">
                  <img src={product.image_url} alt={product.name} className="w-full h-48 object-cover rounded-lg" />
                  <h3 className="mt-2 text-lg font-semibold">{product.name}</h3>
                  <p className="mt-1 text-gray-600">{product.description}</p>
                  <p className="mt-2 text-xl font-bold">{product.price} บาท</p>
                </div>
              ))
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ShopPage;
