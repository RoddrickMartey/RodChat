import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import axiosInstance from "@/app/axiosConfig";
import { useDispatch } from "react-redux";
import { updateSucess } from "@/features/userSlice";
import { Eye, EyeOff } from "lucide-react";

function PasswordViewAndEdit() {
  const [editmode, setEditMode] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleSave = async () => {
    toast.info("Updating Password", { position: "top-left", duration: 1 });
    setProgress(30);
    setLoading(true);
    try {
      const res = await axiosInstance.patch("/user/change_password", {
        currentPassword,
        newPassword,
      });
      dispatch(updateSucess(res.data));
      setProgress(80);
      toast.success("Password updated successfully", { position: "top-left" });
      setCurrentPassword("");
      setNewPassword("");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to update password. Try again.");
    } finally {
      setProgress(0);
      setLoading(false);
      setEditMode(false);
    }
  };

  return (
    <section className="mt-10 px-10 w-1/2 bg-blue-300/80 p-3 rounded-lg border-pink-400 border-2">
      <div className="space-y-4 mt-5">
        <div>
          <Label htmlFor="current-password">Current Password</Label>
          {editmode ? (
            <div className="relative">
              <Input
                id="current-password"
                type={showCurrent ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                disabled={loading}
                className="pr-10 bg-purple-300 focus-visible:border-pink-500 focus-visible:ring-pink-400/50 focus-visible:bg-white"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 transform -translate-y-1/2"
                onClick={() => setShowCurrent(!showCurrent)}
              >
                {showCurrent ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
          ) : (
            <h1 className="text-base font-semibold text-gray-800 bg-purple-200 px-3 py-1 rounded-md shadow-inner">
              ********
            </h1>
          )}
        </div>

        {editmode && (
          <div>
            <Label htmlFor="new-password">New Password</Label>
            <div className="relative">
              <Input
                id="new-password"
                type={showNew ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                disabled={loading}
                className="pr-10 bg-purple-300 focus-visible:border-pink-500 focus-visible:ring-pink-400/50 focus-visible:bg-white"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 transform -translate-y-1/2 "
                onClick={() => setShowNew(!showNew)}
              >
                {showNew ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        )}

        {progress > 0 && <Progress />}

        <div className="mt-4 space-x-2">
          {editmode ? (
            <>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button className="bg-green-500" disabled={loading}>
                    Save
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Confirm Password Change</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to change your password? Make sure
                      it’s strong and secure.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleSave}
                      className="bg-green-500"
                    >
                      Change Password
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

              <Button
                className="bg-yellow-500"
                onClick={() => {
                  setCurrentPassword("");
                  setNewPassword("");
                  setEditMode(false);
                }}
                disabled={loading}
              >
                Cancel
              </Button>
            </>
          ) : (
            <Button className="bg-green-500" onClick={() => setEditMode(true)}>
              Change Password
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}

export default PasswordViewAndEdit;
