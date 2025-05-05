import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useState } from "react";
import axios from "axios";
import axiosInstance from "@/app/axiosConfig";
import { useDispatch } from "react-redux";
import { loginSuccess } from "@/features/userSlice";
import { useNavigate } from "react-router";

// Zod schema (avatar will be a FileList but validated later)
const signupSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  firstname: z.string().min(1, "First name is required"),
  surname: z.string().min(1, "Surname is required"),
  email: z.string().email("Invalid email"),
  avatar: z.any(), // validated manually
});

export function SignUp() {
  const form = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      username: "",
      firstname: "",
      surname: "",
      email: "",
      password: "",
      avatar: null,
    },
  });

  const { isSubmitting } = form.formState;

  const [processing, setProcessing] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setProcessing(10);
    const file = data.avatar;

    console.log(data.avatar);

    if (!file || file.length === 0) {
      toast.warning("Please select an avatar image.", {
        position: "top-center",
      });

      return;
    }
    // const file = fileList[0];

    setProcessing(30);

    const uniqueId = Date.now();
    // Upload to Cloudinary
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "rodco_business_hub");
    formData.append("public_id", `rodchat/avatars/${uniqueId}-${file.name}`);

    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dd4bv2upq/image/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setProcessing(70);

      const cloudinaryData = res.data;
      if (!cloudinaryData.secure_url) {
        toast.error("Upload failed. Try again.");
        throw new Error("Upload failed");
      }

      const finalPayload = {
        username: data.username,
        password: data.password,
        firstname: data.firstname,
        surname: data.surname,
        email: data.email,
        avatar: cloudinaryData.secure_url,
      };

      const response = await axiosInstance.post("/auth/sign_up", finalPayload);

      dispatch(loginSuccess(response.data));
      setProcessing(100);
      toast.success("Sign Up Complete", { position: "top-right" });
      navigate("/");

      // Send to your backend here
    } catch (err) {
      console.error("Error:", err);
      toast.error("Signing Up Failed. Try again.");
    } finally {
      setProcessing(0);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* Username */}
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your username"
                  disabled={isSubmitting}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Firstname */}
        <FormField
          control={form.control}
          name="firstname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your first name"
                  disabled={isSubmitting}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Surname */}
        <FormField
          control={form.control}
          name="surname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Surname</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your surname"
                  disabled={isSubmitting}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  disabled={isSubmitting}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Password */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  disabled={isSubmitting}
                  {...field}
                />
              </FormControl>
              <FormDescription>At least 6 characters.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Avatar File Upload */}
        <FormField
          control={form.control}
          name="avatar"
          render={({ field: { value, onChange, ...fieldProps } }) => (
            <FormItem>
              <FormLabel>Avatar</FormLabel>
              <FormControl>
                <input
                  {...fieldProps}
                  placeholder="Picture"
                  type="file"
                  accept="image/*, application/pdf"
                  onChange={(event) =>
                    onChange(event.target.files && event.target.files[0])
                  }
                  disabled={isSubmitting}
                  className="file:text-foreground placeholder:text-muted-foreground border-input h-9 w-full rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-colors outline-none file:h-7 file:text-sm file:font-medium focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring aria-invalid:border-destructive"
                />
              </FormControl>
              <FormDescription>Upload a profile picture.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {processing > 0 && <Progress value={processing} />}

        <Button type="submit" disabled={isSubmitting}>
          Sign Up
        </Button>
      </form>
    </Form>
  );
}

export default SignUp;
