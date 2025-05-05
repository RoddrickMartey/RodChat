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

function DetailsViewAndEdit({ username, firstname, surname }) {
  const [editmode, setEditMode] = useState(false);

  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    username,
    firstname,
    surname,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    toast.info("Updating User", { position: "top-left", duration: 1 });
    setProgress(30);
    setLoading(true);
    try {
      const res = await axiosInstance.patch("/user/update_details", formData);
      dispatch(updateSucess(res.data));
      setProgress(80);
      toast.success("Updated User Detail", { position: "top-left" });
    } catch (error) {
      console.error("Error:", error);
      toast.error("Updating avatar failed. Try again.");
    } finally {
      setProgress(0);
      setLoading(false);
    }

    setEditMode(false);
  };

  return (
    <section className="mt-10 px-10 w-1/2 bg-blue-300/80 p-3 rounded-lg border-pink-400 border-2">
      <div className="space-y-4 mt-5">
        {/* Username */}
        <div>
          <Label className="mb-2" htmlFor="username">
            Username
          </Label>
          {editmode ? (
            <Input
              className="focus-visible:border-pink-500 bg-purple-300 focus-visible:ring-pink-400/50 focus-visible:bg-white"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              disabled={loading}
            />
          ) : (
            <h1 className="text-base font-semibold text-gray-800 bg-purple-200 px-3 py-1 rounded-md shadow-inner">
              {username}
            </h1>
          )}
        </div>

        {/* First Name */}
        <div>
          <Label className="mb-2" htmlFor="firstname">
            First Name
          </Label>
          {editmode ? (
            <Input
              className="focus-visible:border-pink-500 bg-purple-300 focus-visible:ring-pink-400/50 focus-visible:bg-white"
              id="firstname"
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
              disabled={loading}
            />
          ) : (
            <h1 className="text-base font-semibold text-gray-800 bg-purple-200 px-3 py-1 rounded-md shadow-inner">
              {firstname}
            </h1>
          )}
        </div>

        {/* Surname */}
        <div>
          <Label className="mb-2" htmlFor="surname">
            Surname
          </Label>
          {editmode ? (
            <Input
              className="focus-visible:border-pink-500 bg-purple-300 focus-visible:ring-pink-400/50 focus-visible:bg-white"
              id="surname"
              name="surname"
              value={formData.surname}
              onChange={handleChange}
              disabled={loading}
            />
          ) : (
            <h1 className="text-base font-semibold text-gray-800 bg-purple-200 px-3 py-1 rounded-md shadow-inner">
              {surname}
            </h1>
          )}
        </div>
        {progress > 0 && <Progress />}

        {/* Action buttons */}
        <div className="mt-4 space-x-2">
          {editmode ? (
            <>
              <AlertDialog>
                <AlertDialogTrigger>
                  <Button className="bg-green-500" disabled={loading}>
                    Save
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Confirm Save Changes</AlertDialogTitle>
                    <AlertDialogDescription>
                      Please confirm that you want to save these changes. You
                      can’t undo this action once it’s applied.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Go Back</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleSave}
                      className="bg-green-500"
                    >
                      Save Changes
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

              <Button
                className="bg-yellow-500"
                onClick={() => {
                  setFormData({ username, firstname, surname });
                  setEditMode(false);
                }}
                disabled={loading}
              >
                Cancel
              </Button>
            </>
          ) : (
            <Button className="bg-green-500" onClick={() => setEditMode(true)}>
              Edit
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}

export default DetailsViewAndEdit;
