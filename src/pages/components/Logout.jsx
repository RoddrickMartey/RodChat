import React from "react";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { logOut } from "@/features/userSlice";
import axiosInstance from "@/app/axiosConfig";

function Logout() {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      const res = await axiosInstance.post("/auth/logout");
      console.log(res);
    } catch (error) {
      console.log(error);
    } finally {
      toast.info("Logged Out");
      dispatch(logOut());
    }
  };

  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Log Out?</AlertDialogTitle>
        <AlertDialogDescription>
          Are you sure you want to log out?
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction className="bg-red-600" onClick={handleLogout}>
          Logout
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
}

export default Logout;
