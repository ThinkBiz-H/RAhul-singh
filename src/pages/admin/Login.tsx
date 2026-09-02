import React, { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { FiLock, FiUser } from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";

const Login: React.FC = () => {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (isAuthenticated) return <Navigate to="/admin" replace />;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ok = login(username, password);
    if (ok) {
      navigate("/admin");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="min-h-screen bg-navy flex items-center justify-center px-4">
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-cardHover p-8 w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center text-white font-display font-bold text-xl mx-auto mb-3">
            TJ
          </div>
          <h1 className="font-display font-bold text-xl text-navy">Admin Login</h1>
          <p className="text-ink/50 text-sm mt-1">Sign in to manage the website</p>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-navy mb-1.5">Username</label>
          <div className="flex items-center border border-line rounded-md px-3">
            <FiUser className="text-ink/40" size={16} />
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-2 py-2.5 text-sm outline-none"
              placeholder="admin"
              autoFocus
            />
          </div>
        </div>

        <div className="mb-2">
          <label className="block text-sm font-medium text-navy mb-1.5">Password</label>
          <div className="flex items-center border border-line rounded-md px-3">
            <FiLock className="text-ink/40" size={16} />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-2 py-2.5 text-sm outline-none"
              placeholder="••••••••"
            />
          </div>
        </div>

        {error && <p className="text-xs text-red-500 mt-2">{error}</p>}

        <button
          type="submit"
          className="w-full bg-primary hover:bg-primary-hover text-white font-semibold py-3 rounded-md transition-colors mt-6"
        >
          Login
        </button>

        <p className="text-xs text-ink/40 text-center mt-5">
          Default credentials: admin / admin123
        </p>
      </form>
    </div>
  );
};

export default Login;
