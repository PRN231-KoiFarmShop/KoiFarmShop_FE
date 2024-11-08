import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FishService from "../Services/FishService";
import { FaMoneyBill, FaShoppingCart } from "react-icons/fa";
import Cookies from "js-cookie";
import AlertPopup from "../Popup/AlertPopup";
import Popup from "../Popup/Popup";
import { KoiDetailFeedback } from "../Feedback/KoiDetailFeedback";

const KoiDetail = () => {
  const { fishId } = useParams();
  const [koiData, setKoiData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [loginPopup, setLoginPopup] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginPopup = () => {
    setLoginPopup(!loginPopup);
  };

  useEffect(() => {
    const fetchKoiData = async () => {
      try {
        const response = await FishService.getFishById(fishId);
        setKoiData(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchKoiData();
  }, [fishId]);

  const handleAddToCart = () => {
    const token = Cookies.get("token");
    if (!token) {
      setIsLoggedIn(false);
      setShowAlert(true);
    } else {
      // Người dùng đã đăng nhập, tiếp tục thêm sản phẩm vào giỏ hàng
      setIsLoggedIn(true);
      
      // Lấy giỏ hàng hiện tại từ localStorage
      const cart = JSON.parse(localStorage.getItem('cart')) || {};
      
      // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
      if (cart[koiData.id]) {
        cart[koiData.id].quantity += 1; // Tăng số lượng nếu sản phẩm đã có
      } else {
        cart[koiData.id] = {
          id: koiData.id,
          name: koiData.name,
          price: koiData.price,
          quantity: 1,
          image: koiData.imageUrls[0],
        }; // Thêm sản phẩm mới vào giỏ hàng
      }

      // Cập nhật giỏ hàng vào localStorage
      localStorage.setItem('cart', JSON.stringify(cart));
      
      alert("Cá Koi đã được thêm vào giỏ hàng!");
    }
  };

  const handleAlertCancel = () => {
    setShowAlert(false);
  };

  const handleAlertContinue = () => {
    setShowAlert(false);
    setLoginPopup(true);
  };

  if (loading) return <div className="text-center">Loading...</div>;
  if (error)
    return (
      <div className="text-red-500">
        Error loading Koi details: {error.message}
      </div>
    );
  if (!koiData) return <div>No Koi data found.</div>;
  
  return (
    <>
      <div className="flex p-4">
        <div className="flex-1 mr-4">
          <img
            src={koiData.imageUrls[0]}
            alt={koiData.name}
            className="w-full h-[400px] rounded-lg"
          />
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-bold">{koiData.name}</h2>
          <p className="mt-2">
            <strong>Type:</strong> {koiData.type}
          </p>
          <p>
            <strong>Weight:</strong> {koiData.weight} kg
          </p>
          <p>
            <strong>Size:</strong> {koiData.size} cm
          </p>
          <p>
            <strong>Source:</strong> {koiData.source}
          </p>
          <p className="flex items-center mt-2">
            <FaMoneyBill className="text-green-500 mr-1" />
            <span className="text-xl font-bold">{koiData.price} VND</span>
          </p>
          <button
            className="mt-4 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 flex items-center"
            onClick={handleAddToCart}
          >
            <FaShoppingCart className="mr-1" />
            Add to Cart
          </button>
        </div>
        {showAlert && (
          <AlertPopup
            title="Need login to continue!"
            onCancel={handleAlertCancel}
            onContinue={handleAlertContinue}
          />
        )}
        {/* Popup Component */}
        <Popup loginPopup={loginPopup} setLoginPopup={setLoginPopup} />
      </div>
      <div className="flex p-4">
        <div className="flex-1 mr-4">
          <KoiDetailFeedback fishId={fishId}/>
        </div>
      </div>
    </>
  );
};

export default KoiDetail;
