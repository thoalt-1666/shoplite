import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginInput, type LoginValues } from "../schemas/login";

const inputClass =
  "w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-indigo-400";
const errorClass = "mt-1 text-xs text-red-600";

export function LoginForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<LoginInput, unknown, LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "", remember: false },
  });

  // RHF only calls this once Zod says the values are valid.
  async function onSubmit(values: LoginValues) {
    console.log("Đăng nhập:", values);
    reset({ email: values.email, password: "", remember: values.remember });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <div>
        <label htmlFor="login-email" className="text-sm font-medium text-slate-700">
          Email
        </label>
        <input
          id="login-email"
          type="email"
          autoComplete="email"
          className={inputClass}
          aria-invalid={!!errors.email}
          {...register("email")}
        />
        {errors.email && <p className={errorClass}>{errors.email.message}</p>}
      </div>

      <div>
        <label
          htmlFor="login-password"
          className="text-sm font-medium text-slate-700"
        >
          Mật khẩu
        </label>
        <input
          id="login-password"
          type="password"
          autoComplete="current-password"
          className={inputClass}
          aria-invalid={!!errors.password}
          {...register("password")}
        />
        {errors.password && (
          <p className={errorClass}>{errors.password.message}</p>
        )}
      </div>

      <label className="flex items-center gap-2 text-sm text-slate-600">
        <input type="checkbox" className="rounded" {...register("remember")} />
        Ghi nhớ đăng nhập
      </label>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-lg bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-60"
      >
        {isSubmitting ? "Đang xử lý..." : "Đăng nhập"}
      </button>

      {isSubmitSuccessful && (
        <p className="text-sm text-emerald-600">Đăng nhập thành công (giả lập).</p>
      )}
    </form>
  );
}
