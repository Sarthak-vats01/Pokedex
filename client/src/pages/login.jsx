import React, { useState, useEffect } from "react";
import { signup, signin } from "../api/pokedex.js";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(false); // Track whether it's login or signup
  const [loading, setLoading] = useState(false); // Loading state
  const [signingError, setSigningError] = useState(false);
  const [errorValue, setErrorValue] = useState("");
  const [showNotification, setShowNotification] = useState(true); // State to control notification visibility
  const navigate = useNavigate();

  useEffect(() => {
    // Auto-hide the notification after a few seconds
    const timer = setTimeout(() => setShowNotification(false), 10000);
    return () => clearTimeout(timer);
  }, []);

  async function handleSignup(e) {
    e.preventDefault();
    setLoading(true); // Set loading to true
    try {
      const userId = await signup({ username: email, password });
      navigate(`homepage/${userId}`);
    } catch (error) {
      setSigningError(true);
      setErrorValue(error.response?.data?.message);
      console.log(`Error occurred during signup: ${error}`);
    } finally {
      setLoading(false); // Stop loading after signup completes
    }
  }

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true); // Set loading to true
    try {
      const userId = await signin({ username: email, password });
      if (userId) {
        navigate(`/homepage/${userId}`);
      }
    } catch (error) {
      setSigningError(true);
      setErrorValue(error.response?.data?.message);
      console.log(`Error occurred during login: ${error}`);
    } finally {
      setLoading(false); // Stop loading after login completes
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-300">
      {showNotification && (
        <div className="fixed top-0 left-0 w-full bg-yellow-500 text-white p-4 text-center shadow-lg">
          <p>
            Since this website is deployed on a free service, it may take a few
            minutes to start the backend server. Please be patient.
          </p>
          <button
            onClick={() => setShowNotification(false)}
            className="ml-4 bg-yellow-600 px-3 py-1 rounded text-white font-bold hover:bg-yellow-700"
          >
            Close
          </button>
        </div>
      )}
      <div className="bg-blue-400 p-8 shadow-lg rounded-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          {isLogin ? "Login" : "Sign Up"}
        </h2>
        <form
          onSubmit={isLogin ? handleLogin : handleSignup}
          className="space-y-4"
        >
          <div>
            <label
              className="block text-gray-600 font-medium mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label
              className="block text-gray-600 font-medium mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your password"
            />
          </div>
          {signingError && <span className="text-red-500">{errorValue}</span>}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded-lg font-medium hover:bg-blue-600 transition duration-300 flex justify-center items-center"
            disabled={loading} // Disable button during loading
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : isLogin ? (
              "Login"
            ) : (
              "Sign Up"
            )}
          </button>
        </form>
        <p className="mt-4 text-center">
          {isLogin ? (
            <>
              Don't have an account?{" "}
              <span
                className="text-blue-600 cursor-pointer"
                onClick={() => setIsLogin(false)}
              >
                Sign Up
              </span>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <span
                className="text-blue-600 cursor-pointer"
                onClick={() => setIsLogin(true)}
              >
                Login
              </span>
            </>
          )}
        </p>
      </div>
    </div>
  );
}

export default Auth;
