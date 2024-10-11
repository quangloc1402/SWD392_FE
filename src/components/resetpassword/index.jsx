import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { confirmPasswordReset } from "firebase/auth";
import { auth } from "../../config/firebase"; // Đảm bảo đường dẫn đúng
import './index.scss'; // Import SCSS

function ResetPassword() {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [searchParams] = useSearchParams(); // Lấy mã hành động (action code) từ URL
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError("Passwords do not match!");
            return;
        }

        const oobCode = searchParams.get("oobCode"); // Lấy mã xác nhận từ URL
        if (!oobCode) {
            setError("Invalid or missing reset code.");
            return;
        }

        try {
            await confirmPasswordReset(auth, oobCode, password);
            alert("Password has been reset successfully.");
            navigate("/login"); // Chuyển hướng người dùng đến trang đăng nhập
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="reset-password">
            <h1>Reset Password</h1>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="password"
                    placeholder="New Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                /><br/><br/>
                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                /><br/><br/>
                <button type="submit">Reset Password</button>
            </form>
        </div>
    );
}

export default ResetPassword;
