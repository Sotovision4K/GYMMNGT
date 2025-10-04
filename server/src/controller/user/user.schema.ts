import {z} from "zod"

const UserSchema = z.object({
    body : z.object({
        govId : z.string().min(1, "govId is required"),
        email : z.email().toLowerCase().nonempty("email is required"),
        password : z.string().min(6),
        fullName : z.string().nonempty("name is empty"),
        role: z.string().min(1, "role is required"),

    })
}
)

export type UserSchemaType = z.infer<typeof UserSchema>["body"]

export default UserSchema


export const LoginSchema = z.object({
    body : z.object({
        email : z.string().email().toLowerCase().nonempty("email is required"),
        password : z.string().min(6, "password must be at least 6 characters")
    })
})

export type LoginSchemaType = z.infer<typeof LoginSchema>["body"]


export const ChangePassword = z.object({
    body : z.object({
        currentPassword: z.string().min(6, "current password must be at least 6 characters"),
        newPassword: z.string().min(6, "new password must be at least 6 characters")
    }).refine((data) => {
        return data.currentPassword !== data.newPassword;
    },
    {
        message: "New password must be different from current password",
        path: ["newPassword"]
    }
    )
}
)

export type ChangePasswordType = z.infer<typeof ChangePassword>["body"]

