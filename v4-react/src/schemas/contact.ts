import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Tên tối thiểu 2 ký tự"),
  email: z.email("Email không hợp lệ"),
  topic: z.enum(["order", "shipping", "other"], {
    message: "Vui lòng chọn chủ đề",
  }),
  message: z
    .string()
    .trim()
    .min(10, "Nội dung tối thiểu 10 ký tự")
    .max(500, "Nội dung tối đa 500 ký tự"),
});

export type ContactValues = z.infer<typeof contactSchema>;
