import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const VerifyOTP = () => {
    // const { verifyOtp } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const email = location.state?.email;

    const [otp, setOtp] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { verifyOtp, setUser } = useAuth();


    if (!email) {
        navigate('/register');
        return null;
    }


    const handleVerify = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const result = await verifyOtp(otp, email);

        if (result.success) {
            setUser(result.user);
            localStorage.setItem('plan2go_user', JSON.stringify(result.user));
            localStorage.setItem('plan2go_token', result.token);
            navigate('/dashboard');
        } else {
            setError(result.error || 'Invalid OTP');
        }

        setLoading(false);
    };

    const handleResend = async () => {
        setError('');
        setLoading(true);

        try {
            const token = localStorage.getItem('plan2go_token');
            if (!token) {
                setError('No token found, please login again.');
                setLoading(false);
                return;
            }

            const res = await fetch('http://localhost:8080/users/resend-otp', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const data = await res.json();

            if (!data.success) setError(data.error || 'Failed to resend OTP');
            else alert('OTP resent successfully!');
        } catch (err) {
            console.error(err);
            setError('Server error');
        }

        setLoading(false);
    };


    return (
        <div className="min-h-screen bg-black/30 backdrop-blur-sm flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md border border-gray-200">
                <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full mb-4">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Verify Your Email</h2>
                    <p className="text-gray-600 text-sm">We've sent a 6-digit code to</p>
                    <p className="text-gray-900 font-semibold mt-1">{email}</p>
                </div>

                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-2xl text-sm mb-4" role="alert">
                        {error}
                    </div>
                )}

                <form className="space-y-5" onSubmit={handleVerify}>
                    <input
                        type="text"
                        maxLength="6"
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                        className="w-full text-center px-4 py-3.5 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition text-gray-900 placeholder-gray-400 text-2xl tracking-[0.5em] font-semibold"
                        required
                        autoFocus
                    />
                    <button
                        type="submit"
                        disabled={loading || otp.length !== 6}
                        className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-3.5 px-4 rounded-2xl font-semibold transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-0.5"
                    >
                        {loading ? 'Verifying...' : 'Verify & Continue'}
                    </button>
                </form>

                <div className="mt-6 text-center space-y-3">
                    <button
                        onClick={handleResend}
                        disabled={loading}
                        className="text-primary-600 hover:text-primary-700 text-sm font-medium disabled:opacity-50 transition"
                    >
                        Didn't receive code? Resend
                    </button>
                </div>
            </div>
        </div>
    );
};

export default VerifyOTP;
