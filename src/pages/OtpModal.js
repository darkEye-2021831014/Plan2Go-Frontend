import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

const OtpModal = () => {
    const { showOtpModal, verifyOtp, setShowOtpModal, pendingEmail } = useAuth();
    const [otp, setOtp] = useState("");
    const [error, setError] = useState("");

    if (!showOtpModal) return null;

    const submitOtp = async () => {
        const res = await verifyOtp(otp);
        if (!res.success) {
            setError(res.error);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-xl w-96 shadow-xl">
                <h2 className="text-xl font-bold">Verify Email</h2>
                <p className="text-sm mb-4">Enter the OTP sent to <b>{pendingEmail}</b></p>

                <input
                    className="w-full p-2 border rounded mb-3"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                />

                {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

                <button
                    onClick={submitOtp}
                    className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
                >
                    Verify
                </button>

                <button
                    onClick={() => setShowOtpModal(false)}
                    className="w-full mt-2 text-gray-700"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default OtpModal;
