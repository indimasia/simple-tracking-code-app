import { useState } from "react";
import {
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  Code,
} from "lucide-react";
import { Link, useForm } from "@inertiajs/react";
import { route } from "ziggy-js";

export default function RegisterPage() {
  const { data, setData, post, errors, processing } = useForm({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    post(route("register.post"));
  };

  const passwordStrength = () => {
    if (!data.password) return { strength: 0, color: "bg-slate-200", text: "" };

    let strength = 0;
    if (data.password.length >= 8) strength++;
    if (/[A-Z]/.test(data.password)) strength++;
    if (/[0-9]/.test(data.password)) strength++;
    if (/[!@#$%^&*]/.test(data.password)) strength++;

    if (strength === 1)
      return { strength: 1, color: "bg-red-500", text: "Weak" };
    if (strength === 2)
      return { strength: 2, color: "bg-yellow-500", text: "Fair" };
    if (strength === 3)
      return { strength: 3, color: "bg-blue-500", text: "Good" };
    return { strength: 4, color: "bg-green-500", text: "Strong" };
  };

  const strength = passwordStrength();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div
            className="inline-flex items-center justify-center w-12 h-12 rounded-lg mb-4"
            style={{ backgroundColor: "hsl(232, 99%, 59%)" }}
          >
            <span className="text-white font-bold text-xl"><Code className="w-5 h-5" /></span>
          </div>
          <h1 className="text-3xl font-bold text-slate-900">Script Tracker</h1>
          <p className="text-slate-600 text-sm mt-2">
            Create your account to get started
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Sign Up</h2>

          <div className="space-y-5">
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="block text-sm font-semibold text-slate-700"
              >
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  id="name"
                  type="text"
                  value={data.name}
                  onChange={(e) => {
                    setData("name", e.target.value);
                    if (errors.name) setData("name", "");
                  }}
                  placeholder="John Doe"
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                    errors.name
                      ? "border-red-300 focus:ring-red-200"
                      : "border-slate-300 focus:ring-blue-200"
                  }`}
                />
              </div>
              {errors.name && (
                <p className="text-xs text-red-600 flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.name}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-slate-700"
              >
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  id="email"
                  type="email"
                  value={data.email}
                  onChange={(e) => {
                    setData("email", e.target.value);
                    if (errors.email) setData("email", "");
                  }}
                  placeholder="you@example.com"
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                    errors.email
                      ? "border-red-300 focus:ring-red-200"
                      : "border-slate-300 focus:ring-blue-200"
                  }`}
                />
              </div>
              {errors.email && (
                <p className="text-xs text-red-600 flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.email}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-slate-700"
              >
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={data.password}
                  onChange={(e) => {
                    setData("password", e.target.value);
                    if (errors.password) setData("password", "");
                  }}
                  placeholder="••••••••"
                  className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                    errors.password
                      ? "border-red-300 focus:ring-red-200"
                      : "border-slate-300 focus:ring-blue-200"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-red-600 flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.password}
                </p>
              )}

              {data.password && (
                <div className="mt-3 space-y-2">
                  <div className="flex gap-1">
                    {[...Array(4)].map((_, i) => (
                      <div
                        key={i}
                        className={`h-1 flex-1 rounded-full transition-colors ${
                          i < strength.strength
                            ? strength.color
                            : "bg-slate-200"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-slate-600 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    Password strength:{" "}
                    <span className="font-semibold">{strength.text}</span>
                  </p>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-semibold text-slate-700"
              >
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={data.confirmPassword}
                  onChange={(e) => {
                    setData("confirmPassword", e.target.value);
                    if (errors.confirmPassword)
                      setData("confirmPassword", "");
                  }}
                  placeholder="••••••••"
                  className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                    errors.confirmPassword
                      ? "border-red-300 focus:ring-red-200"
                      : "border-slate-300 focus:ring-blue-200"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-xs text-red-600 flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-slate-300 mt-1"
              />
              <span className="text-xs text-slate-600">
                I agree to the{" "}
                <a
                  href="#"
                  className="font-semibold hover:underline"
                  style={{ color: "hsl(232, 99%, 59%)" }}
                >
                  Terms of Service
                </a>{" "}
                and{" "}
                <a
                  href="#"
                  className="font-semibold hover:underline"
                  style={{ color: "hsl(232, 99%, 59%)" }}
                >
                  Privacy Policy
                </a>
              </span>
            </label>

            <button
              onClick={handleSubmit}
              disabled={processing}
              className="w-full py-3 px-4 rounded-lg font-semibold text-white transition-all duration-200 flex items-center justify-center gap-2 hover:brightness-95 disabled:opacity-80"
              style={{ backgroundColor: "hsl(232, 99%, 59%)" }}
            >
              {processing && (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Creating account...
                </>)}
              {!processing && "Create Account"}
            </button>
          </div>

          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <div className="flex-1 h-px bg-slate-200"></div>
            <span className="text-xs text-slate-500">Or</span>
            <div className="flex-1 h-px bg-slate-200"></div>
          </div>

          {/* Sign In Link */}
          <p className="text-center text-slate-600 text-sm">
            Already have an account?{" "}
            <Link
              href={route("login.form")}
              className="font-semibold transition-colors hover:underline"
              style={{ color: "hsl(232, 99%, 59%)" }}
            >
              Sign in
            </Link>
          </p>
        </div>

        {/* Footer */}
        <p className="text-center text-slate-500 text-xs mt-6">
          Join thousands of users managing their tracking codes efficiently
        </p>
      </div>
    </div>
  );
}
