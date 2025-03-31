"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Logo from "@/public/images/logo.png";

export default function SignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Here you would normally redirect after successful login
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10 animate-pulse"></div>
      <motion.div
        className="w-full max-w-md z-10"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <Image src={Logo} alt="Logo" className=" w-14" ity />
          </Link>
          <h2 className="mt-6 text-2xl font-bold text-white">
            تسجيل الدخول إلى حسابك
          </h2>
        </div>

        <Card className="p-6 bg-gray-900 border border-gray-800 shadow-xl text-right">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-white mb-2 font-medium text-sm"
              >
                البريد الإلكتروني
              </label>
              <div className="relative">
                <input
                  id="email"
                  placeholder="أدخل بريدك الإلكتروني"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-700 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Link
                  href="/forgot-password"
                  className="text-sm text-secondary hover:text-secondary/90"
                >
                  نسيت كلمة المرور؟
                </Link>
                <label
                  htmlFor="password"
                  className="block text-white mb-2 font-medium text-sm"
                >
                  كلمة المرور
                </label>
              </div>
              <div className="relative">
                <input
                  id="password"
                  placeholder="أدخل كلمة المرور"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-700 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-secondary hover:bg-secondary/90 text-lg"
              disabled={isLoading}
            >
              {isLoading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
              <ArrowRight className="mr-2 w-5 h-5" />
            </Button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full border-gray-700" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-900 text-gray-400">
                  أو تسجيل الدخول باستخدام
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                className="border-gray-700 hover:bg-gray-800 hover:text-white"
              >
                <svg
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                  className="ml-2"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                جوجل
              </Button>
              <Button
                variant="outline"
                className="border-gray-700 hover:bg-gray-800 hover:text-white"
              >
                <Github className="ml-2 h-5 w-5" />
                جيثب
              </Button>
            </div>
          </div>

          <div className="mt-6 text-center text-sm">
            <span className="text-gray-400">ليس لديك حساب؟</span>{" "}
            <Link
              href="/sign-up"
              className="font-medium text-secondary hover:text-secondary/90"
            >
              إنشاء حساب جديد
            </Link>
          </div>
        </Card>

        <div className="mt-8 text-center">
          <Link
            href="/"
            className="text-sm text-gray-400 hover:text-white transition-colors"
          >
            العودة إلى الصفحة الرئيسية
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
