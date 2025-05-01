import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button"; // Adjust according to your import path
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"; // Adjust according to your import path
import { Input } from "@/components/ui/input"; // Adjust according to your import path
import axiosInstance from "@/app/axiosConfig";
import { useDispatch } from "react-redux";
import { loginSuccess } from "@/features/userSlice";
import { useNavigate } from "react-router";
import { toast } from "sonner";

// Zod schema for login validation
const loginSchema = z.object({
  username: z.string().min(1, { message: "Username is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});

export function Login() {
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isSubmitting } = form.formState;

  const onSubmit = async (data) => {
    const finalPayload = {
      username: data.username,
      password: data.password,
    };

    try {
      const res = await axiosInstance.post("/auth/login", finalPayload);
      dispatch(loginSuccess(res.data));
      toast.success("Login Complete", { position: "top-left" });
      navigate("/");

      // Send to your backend here
    } catch (err) {
      console.error("Error:", err);
      toast.error("Signing Up Failed. Try again.", {
        position: "bottom-right",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* Username Field */}
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

        {/* Password Field */}
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
              <FormDescription>
                Make sure your password is secure.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <Button type="submit" disabled={isSubmitting}>
          Login
        </Button>
      </form>
    </Form>
  );
}

export default Login;
