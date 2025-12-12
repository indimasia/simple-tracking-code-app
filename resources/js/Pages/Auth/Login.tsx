import { useState } from "react";
import { Mail, Lock, Eye, EyeOff, Code } from "lucide-react";
import { Link, useForm } from "@inertiajs/react";
import { route } from "ziggy-js";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { T } from "@tolgee/react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { data, setData, post, errors, processing, clearErrors } = useForm({
    email: "",
    password: "",
    credentials: "",
  });

  const handleSubmit = (e) => {
    clearErrors();
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      post(route("login.post"));
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div
            className="inline-flex items-center justify-center w-12 h-12 rounded-lg mb-4"
            style={{ backgroundColor: "hsl(232, 99%, 59%)" }}
          >
            <span className="text-white font-bold text-xl"><Code className="w-5 h-5" /></span>
          </div>
          <h1 className="text-3xl font-bold text-slate-900"><T keyName={'app-title'}/></h1>
          <p className="text-slate-600 text-sm mt-2">
            Manage your tracking codes
          </p>
        </div>

        {/* Login Card */}
        <Card className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            Welcome Back
          </h2>

          {errors.credentials && (
            <Card className="shadow-none rounded-sm bg-red-100 border border-red-400 px-3 py-2 mb-4">
              <p className="text-sm font-semibold text-red-600">
                {errors.credentials}
              </p>
            </Card>
          )}

          <div className="space-y-5">
            {/* Email Field */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-slate-700"
              >
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <Input
                  id="email"
                  type="email"
                  value={data.email}
                  onChange={(e) => setData("email", e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 transition-all"
                  required
                />
              </div>
              {errors.email && (
                <p className="text-xs font-medium text-red-600">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-slate-700"
              >
                <T keyName="password" />
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={data.password}
                  onChange={(e) => setData("password", e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-12 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 transition-all"
                  required
                />
                <Button
                  variant="ghost"
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute p-0 hover:bg-transparent right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </Button>
              </div>
              {errors.password && (
                <p className="text-xs font-medium text-red-600">
                  {errors.password}
                </p>
              )}
            </div>

            {/* Remember & Forgot */}
            {/* <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-slate-300" />
                <span className="text-sm text-slate-600">Remember me</span>
              </label>
              <Link href="#" className="text-sm font-semibold transition-colors hover:underline" style={{ color: 'hsl(232, 99%, 59%)' }}>
                Forgot password?
              </Link>
            </div> */}

            {/* Submit Button */}
            <Button
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full py-3 px-4 rounded-lg font-semibold text-white transition-all duration-200 flex items-center justify-center gap-2 hover:brightness-95 disabled:opacity-80"
              style={{ backgroundColor: "hsl(232, 99%, 59%)" }}
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </div>
          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <div className="flex-1 h-px bg-slate-200"></div>
            <span className="text-xs text-slate-500">Or</span>
            <div className="flex-1 h-px bg-slate-200"></div>
          </div>
          {/* Sign Up Link */}
          <p className="text-center text-slate-600 text-sm">
            Don't have an account?{" "}
            <Link
              href={route("register.form")}
              className="font-semibold transition-colors hover:underline"
              style={{ color: "hsl(232, 99%, 59%)" }}
            >
              Sign up
            </Link>
          </p>
        </Card>

        {/* Footer */}
        <p className="text-center text-slate-500 text-xs mt-6">
          By signing in, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
}
