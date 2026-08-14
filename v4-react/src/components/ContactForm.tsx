import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, type ContactValues } from "../schemas/contact";

const inputClass =
  "w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-indigo-400";
const errorClass = "mt-1 text-xs text-red-600";

export function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", topic: "order", message: "" },
  });

  async function onSubmit(values: ContactValues) {
    console.log("Liên hệ:", values);
    reset();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <div>
        <label htmlFor="contact-name" className="text-sm font-medium text-slate-700">
          Họ tên
        </label>
        <input
          id="contact-name"
          className={inputClass}
          aria-invalid={!!errors.name}
          {...register("name")}
        />
        {errors.name && <p className={errorClass}>{errors.name.message}</p>}
      </div>

      <div>
        <label
          htmlFor="contact-email"
          className="text-sm font-medium text-slate-700"
        >
          Email
        </label>
        <input
          id="contact-email"
          type="email"
          className={inputClass}
          aria-invalid={!!errors.email}
          {...register("email")}
        />
        {errors.email && <p className={errorClass}>{errors.email.message}</p>}
      </div>

      <div>
        <label
          htmlFor="contact-topic"
          className="text-sm font-medium text-slate-700"
        >
          Chủ đề
        </label>
        <select id="contact-topic" className={inputClass} {...register("topic")}>
          <option value="order">Đơn hàng</option>
          <option value="shipping">Vận chuyển</option>
          <option value="other">Khác</option>
        </select>
        {errors.topic && <p className={errorClass}>{errors.topic.message}</p>}
      </div>

      <div>
        <label
          htmlFor="contact-message"
          className="text-sm font-medium text-slate-700"
        >
          Nội dung
        </label>
        <textarea
          id="contact-message"
          rows={4}
          className={inputClass}
          aria-invalid={!!errors.message}
          {...register("message")}
        />
        {errors.message && <p className={errorClass}>{errors.message.message}</p>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-lg bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-60"
      >
        {isSubmitting ? "Đang gửi..." : "Gửi liên hệ"}
      </button>

      {isSubmitSuccessful && (
        <p className="text-sm text-emerald-600">Đã gửi (giả lập).</p>
      )}
    </form>
  );
}
