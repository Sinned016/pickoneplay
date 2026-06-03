"use client";
import { RegisterAccount } from "@/services/auth";
import { RegisterFormData } from "@/types/RegisterFormData";
import { Lock, Mail, UserCircle, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";

export default function RegisterPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    mode: "onSubmit",
  });

  const password = watch("password");

  const onSubmit: SubmitHandler<RegisterFormData> = async (data) => {
    console.log("hello!", data);

    if (data.password !== data.confirmPassword) {
      setError("root", {
        type: "manual",
        message: "Passwords do not match",
      });
      return;
    }

    try {
      const response = await RegisterAccount(data);

      console.log("RESPONSE: ", response);

      router.push("/login");
      reset();
      return;
    } catch (error: any) {
      setError("root", { message: error.message });
      return;
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="relative bg-surface1 rounded-xl w-100 mx-auto border border-surface1-hover">
        {/* <X className="w-5 h-5 absolute right-5 top-5" /> */}

        <div className="flex flex-col gap-6 p-6">
          <h2 className="text-3xl text-text1 mx-auto">Register</h2>

          <form
            className="flex flex-col gap-2"
            onSubmit={handleSubmit(onSubmit)}
            autoComplete="off"
          >
            <div className="flex items-center gap-2 border border-gray-500 rounded-sm py-3 px-3 focus-within:border-muted focus-within:bg-white/5">
              <Mail className="w-5 h-5" />
              <input
                {...register("email", {
                  required: "Please enter your email",
                  validate: (value) => {
                    if (!value.includes("@")) {
                      return "Email must contain @";
                    }
                  },
                })}
                className="outline-none focus:outline-none focus:ring-0 focus:border-transparent w-full"
                type="email"
                placeholder="Email"
              />
            </div>

            {errors.email && (
              <div className="text-red-400 text-sm">{errors.email.message}</div>
            )}

            <div className="flex items-center gap-2 border border-gray-500 rounded-sm py-3 px-3 focus-within:border-muted focus-within:bg-white/5">
              <UserCircle className="w-5 h-5" />
              <input
                {...register("username", {
                  required: "Please enter your username",
                  minLength: {
                    value: 6,
                    message: "Minimum 6 characters",
                  },
                  maxLength: {
                    value: 12,
                    message: "Maximum 12 characters",
                  },
                })}
                className="outline-none focus:outline-none focus:ring-0 focus:border-transparent w-full"
                type="text"
                placeholder="Username"
              />
            </div>

            {errors.username && (
              <div className="text-red-400 text-sm">
                {errors.username.message}
              </div>
            )}

            <div className="flex items-center gap-2 border border-gray-500 rounded-sm py-3 px-3 focus-within:border-muted focus-within:bg-white/5">
              <Lock className="w-5 h-5" />
              <input
                {...register("password", {
                  required: "Please enter a password",
                  minLength: {
                    value: 8,
                    message: "Password has to be minimum 8 characters",
                  },
                })}
                className="outline-none focus:outline-none focus:ring-0 focus:border-transparent w-full"
                type="password"
                placeholder="Password"
              />
            </div>

            {errors.password && (
              <div className="text-red-400 text-sm">
                {errors.password.message}
              </div>
            )}

            <div className="flex items-center gap-2 border border-gray-500 rounded-sm py-3 px-3 focus-within:border-muted focus-within:bg-white/5">
              <Lock className="w-5 h-5" />
              <input
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                })}
                className="outline-none focus:outline-none focus:ring-0 focus:border-transparent w-full"
                type="password"
                placeholder="Password Confirmation"
              />
            </div>

            {errors.confirmPassword && (
              <div className="text-red-400 text-sm">
                {errors.confirmPassword.message}
              </div>
            )}

            <button
              disabled={isSubmitting}
              className="mt-6 py-2 px-3 bg-button hover:bg-button-hover w-full text-black text-lg rounded-sm transition-all duration-200 cursor-pointer"
            >
              {isSubmitting ? "Loading..." : "Register"}
            </button>

            {errors.root && (
              <div className="text-red-400 text-sm mx-auto">
                {errors.root.message}
              </div>
            )}

            <div className="flex justify-center items-center gap-2 mt-4">
              <p className="text-sm">Already have an account?</p>
              <Link
                className="text-sm text-main1 hover:text-main1-hover"
                href={"/login"}
              >
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
