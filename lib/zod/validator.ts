import * as z from "zod";

//! USER
export const userLoginSchema = z.object({
  email: z.string().email({
    message: "L'email est requis.",
  }),
  password: z.string().min(1, "Le mot de passe est requis."),
  code: z.optional(z.string()), // Pour Auhtentification à deux facteurs
});

export const userRegisterSchema = z
  .object({
    firstName: z
      .string()
      .min(2, "Le prénom doit contenir au moins 2 caractères"),
    lastName: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
    email: z.string().email({
      message: "L'email est requis.",
    }),
    password: z
      .string()
      .min(8, "Le mot de passe doit contenir au moins 6 caractères."),
    passwordConfirmation: z.string(),
  })
  .superRefine(({ passwordConfirmation, password }, ctx) => {
    if (passwordConfirmation !== password) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Les mots de passe ne correspondent pas.",
        path: ["passwordConfirmation"],
      });
    }
  });

export const ResetSchema = z.object({
  email: z.string().email({
    message: "L'email est requis.",
  }),
});

export const newPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Le mot de passe doit contenir au moins 8 caractères."),
    passwordConfirmation: z.string(),
  })
  .superRefine(({ passwordConfirmation, password }, ctx) => {
    if (passwordConfirmation !== password) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Les mots de passe ne correspondent pas.",
        path: ["passwordConfirmation"],
      });
    }
  });
