"use client";

import { Suspense, useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Image from "next/image";
import Logo from "@/public/images/logo.png";
import { useRouter, useSearchParams } from "next/navigation";
import { resetUserPassword } from "../../../actions/supabaseAuth";
import { PasswordInput } from "@/components/auth/PasswordInput";

interface FormErrors {
  password: string;
  confirmPassword: string;
  general: string;
}

function ResetPasswordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isCodeValid, setIsCodeValid] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formErrors, setFormErrors] = useState<FormErrors>({
    password: "",
    confirmPassword: "",
    general: "",
  });
  const [token, setToken] = useState("");

  useEffect(() => {
    console.log("Checking if we're in a valid password reset session");

    const queryParams = new URLSearchParams(window.location.search);
    if (!queryParams.has("code")) {
      console.error("No reset code in URL");
      setIsCodeValid(false);
    }

    // Extract code from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const codeParam = urlParams.get("code") || searchParams?.get("code") || "";

    console.log("Reset code in URL:", codeParam ? "Found" : "Not found");

    if (!codeParam) {
      setIsCodeValid(false);
    } else {
      setToken(codeParam); // Store the token for later use
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setFormErrors({
      password: "",
      confirmPassword: "",
      general: "",
    });

    let hasError = false;
    const errors: FormErrors = {
      password: "",
      confirmPassword: "",
      general: "",
    };

    if (!password) {
      errors.password = "الرجاء إدخال كلمة المرور";
      hasError = true;
    } else if (password.length < 8) {
      errors.password = "يجب أن تكون كلمة المرور 8 أحرف على الأقل";
      hasError = true;
    }

    if (!confirmPassword) {
      errors.confirmPassword = "الرجاء تأكيد كلمة المرور";
      hasError = true;
    } else if (password !== confirmPassword) {
      errors.confirmPassword = "كلمة المرور غير متطابقة";
      hasError = true;
    }

    if (hasError) {
      setFormErrors(errors);
      return;
    }

    setIsLoading(true);
    try {
      // Pass the token we extracted from the URL
      console.log("Submitting with token:", token ? "Valid token" : "No token");
      const result = await resetUserPassword(password, token);
      if (result.success) {
        setIsSuccess(true);
        setTimeout(() => {
          router.push("/dashboard"); // was "/sign-in"
        }, 3000);
      } else {
        setFormErrors((prev) => ({
          ...prev,
          general:
            result.message || "حدث خطأ غير متوقع. الرجاء المحاولة مرة أخرى.",
        }));
      }
    } catch (error) {
      console.error("Reset password error:", error);
      setFormErrors((prev) => ({
        ...prev,
        general: "حدث خطأ غير متوقع. الرجاء المحاولة مرة أخرى.",
      }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-grid-background" />
      <motion.div
        className="auth-container"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <Image src={Logo} alt="Logo" className="h-14 w-auto" priority />
          </Link>
          <h2 className="auth-heading">إعادة تعيين كلمة المرور</h2>
        </div>

        <Card className="auth-card">
          {!isCodeValid ? (
            <div className="text-center">
              <Alert className="bg-red-500/20 border-red-500 text-white mb-4">
                <AlertDescription>
                  رابط إعادة تعيين كلمة المرور غير صالح أو منتهي الصلاحية
                </AlertDescription>
              </Alert>
              <Link href="/forgot-password">
                <Button className="w-full bg-secondary hover:bg-secondary/90">
                  طلب رابط جديد
                </Button>
              </Link>
            </div>
          ) : isSuccess ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Alert className="bg-secondary/20 border-secondary text-white mb-4">
                <AlertDescription>
                  تم إعادة تعيين كلمة المرور بنجاح. سيتم توجيهك إلى لوحة التحكم.
                </AlertDescription>
              </Alert>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="password" className="auth-label">
                  كلمة المرور الجديدة
                </label>
                <PasswordInput
                  id="password"
                  placeholder="أدخل كلمة المرور الجديدة"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  error={formErrors.password}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="confirmPassword" className="auth-label">
                  تأكيد كلمة المرور
                </label>
                <PasswordInput
                  id="confirmPassword"
                  placeholder="أعد إدخال كلمة المرور"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  error={formErrors.confirmPassword}
                />
              </div>

              {formErrors.general && (
                <p className="text-red-500 text-sm text-center">
                  {formErrors.general}
                </p>
              )}

              <Button
                type="submit"
                className="w-full py-2 bg-secondary hover:bg-secondary/90 text-lg"
                disabled={isLoading}
              >
                {isLoading ? "جاري المعالجة..." : "إعادة تعيين كلمة المرور"}
              </Button>
            </form>
          )}

          <div className="mt-6 text-center text-sm">
            <Link
              href="/sign-in"
              className="font-medium text-secondary hover:text-secondary/90"
            >
              العودة إلى تسجيل الدخول
            </Link>
          </div>
        </Card>

        <div className="mt-8 text-center">
          <Link href="/" className="auth-link">
            العودة إلى الصفحة الرئيسية
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

export default function ResetPassword() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPasswordContent />
    </Suspense>
  );
}
