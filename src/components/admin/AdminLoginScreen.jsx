import React from 'react';
import { Lock } from 'lucide-react';

const AdminLoginScreen = ({ passwordInput, onPasswordChange, onSubmit }) => (
  <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
    <form onSubmit={onSubmit} className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-sm">
      <div className="flex justify-center mb-6">
        <div className="w-16 h-16 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center">
          <Lock size={32} />
        </div>
      </div>
      <h2 className="text-2xl font-black text-center mb-6 text-gray-900">Admin Login</h2>
      <input
        type="password"
        placeholder="Enter Master Password"
        value={passwordInput}
        onChange={e => onPasswordChange(e.target.value)}
        className="w-full p-4 mb-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none"
      />
      <button type="submit" className="w-full py-4 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl shadow-lg transition-all">
        Unlock Dashboard
      </button>
    </form>
  </div>
);

export default AdminLoginScreen;
