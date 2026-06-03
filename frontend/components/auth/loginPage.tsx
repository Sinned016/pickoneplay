"use client";
import { LoginAccount } from "@/services/auth";
import { useAuth } from "@/store/useAuth";
import { LoginFormData } from "@/types/LoginFormData";
import { Lock, Mail } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";

export default function LoginPage() {
  const router = useRouter();
  const { fetchUser } = useAuth.getState();

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    mode: "onSubmit",
  });

  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    console.log("hello!", data);

    try {
      const response = await LoginAccount(data);

      console.log("RESPONSE: ", response);

      // Fetching user with jwt cookie
      await fetchUser();

      router.push("/");
      reset();
      return;
    } catch (error: any) {
      setError("root", { message: error.message });
      return;
    }
  };

  return (
    <div className="flex flex-1 items-center justify-center">
      <div className="relative bg-surface1 rounded-xl w-100 mx-auto border border-surface1">
        {/* <X className="w-5 h-5 absolute right-5 top-5" /> */}

        <div className="flex flex-col gap-6 p-6">
          <h2 className="text-3xl text-text1 mx-auto">Login</h2>

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

            {/* <div className="">
              <Link
                className="text-sm text-text1 hover:text-text-hover"
                href={"#"}
              >
                Forgot password?
              </Link>
            </div> */}

            <div className="mt-6">
              <button
                disabled={isSubmitting}
                className="py-2 px-3 bg-button hover:bg-button-hover w-full text-black text-lg rounded-sm transition-all duration-200 cursor-pointer"
              >
                {isSubmitting ? "Loading..." : "Login"}
              </button>
            </div>

            {errors.root && (
              <div className="text-red-400 text-sm mx-auto">
                {errors.root.message}
              </div>
            )}

            <div className="flex justify-center items-center gap-2 mt-4">
              <p className="text-sm">Don't have an account?</p>
              <Link
                className="text-sm text-main1 hover:text-main1-hover"
                href={"/register"}
              >
                Register
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
