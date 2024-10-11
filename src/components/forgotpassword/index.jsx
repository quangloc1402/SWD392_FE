import React from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../config/firebase"; // Đảm bảo đường dẫn đúng
import { useNavigate } from "react-router-dom";
import './index.scss'; // Import SCSS

function ForgotPassword() {
    const navigate = useNavigate(); // Sử dụng navigate thay vì history để rõ ràng hơn

    const handleSubmit = async (e) => {
        e.preventDefault();
        const emailVal = e.target.email.value;

        try {
            // Gửi email reset mật khẩu
            await sendPasswordResetEmail(auth, emailVal, {
                url: 'http://localhost:3000/reset-password', // URL tùy chỉnh cho localhost hoặc URL sản phẩm
                handleCodeInApp: true,
            });
            alert("Check your email for the password reset link.");
            navigate("/"); // Chuyển hướng về trang chủ sau khi gửi thành công
        } catch (err) {
            alert(err.code); // Hiển thị lỗi nếu có
        }
    };

    return (
        <div className="forgot-password">
            <h1>Forgot Password</h1>
            <form onSubmit={handleSubmit}>
                <input 
                    name="email" 
                    type="email" 
                    placeholder="Enter your email" 
                    required 
                /><br/><br/>
                <button type="submit">Reset</button>
            </form>
        </div>
    );
}

export default ForgotPassword;
