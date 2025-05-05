import React, { useRef, useState } from "react";
import Cropper from "react-easy-crop";
import imageCompression from "browser-image-compression";
import { Edit } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import axios from "axios";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import axiosInstance from "@/app/axiosConfig";
import { updateSucess } from "@/features/userSlice";
import { motion } from "framer-motion";

function AvatarViewAndEdit({ avatar }) {
  const fileInputRef = useRef(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [showCropper, setShowCropper] = useState(false);
  const [originalFile, setOriginalFile] = useState(null);
  const [currentProgress, setCurrentProgress] = useState(0);

  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setOriginalFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc(reader.result);
        setShowCropper(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const onCropComplete = (_, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const getCroppedImage = async () => {
    const image = await createImage(imageSrc);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const { width, height, x, y } = croppedAreaPixels;
    canvas.width = width;
    canvas.height = height;

    ctx.drawImage(image, x, y, width, height, 0, 0, width, height);

    const blob = await new Promise((resolve) =>
      canvas.toBlob(resolve, "image/jpeg")
    );
    const compressed = await imageCompression(blob, { maxSizeMB: 0.2 });

    setShowCropper(false);
    setImageSrc(null);

    setCurrentProgress(30);

    const uniqueId = Date.now();
    const fileName = originalFile?.name || "avatar.jpg";

    const formData = new FormData();
    formData.append("file", compressed);
    formData.append("upload_preset", "rodco_business_hub");
    formData.append("public_id", `rodchat/avatars/${uniqueId}-${fileName}`);

    try {
      setLoading(true);
      toast.info("Updating Avatar", { position: "top-left", duration: 1 });

      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dd4bv2upq/image/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const cloudinaryData = res.data;
      if (!cloudinaryData.secure_url) {
        toast.error("Updating avatar failed. Try again.");
        throw new Error("Upload failed");
      }

      setCurrentProgress(70);

      const newUser = await axiosInstance.patch("/user/update_avatar", {
        avatar: cloudinaryData.secure_url,
      });

      setCurrentProgress(100);

      dispatch(updateSucess(newUser.data));

      setCurrentProgress(0);
      toast.success("Update Successful", { position: "top-left" });
    } catch (error) {
      console.error("Error:", error);
      toast.error("Updating avatar failed. Try again.");
    } finally {
      setCurrentProgress(0);
      setLoading(false);
    }
  };

  const createImage = (url) =>
    new Promise((resolve, reject) => {
      const img = new Image();
      img.src = url;
      img.crossOrigin = "anonymous";
      img.onload = () => resolve(img);
      img.onerror = reject;
    });

  return (
    <section className="mt-10 px-10">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        onClick={handleClick}
        className="relative w-50 h-50 rounded-full overflow-hidden group cursor-pointer border-2 border-pink-400"
      >
        <img
          src={avatar}
          alt="Avatar"
          className="w-full h-full object-cover rounded-full"
        />

        <div className="absolute inset-0 bg-white/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center flex-col">
          <Edit className="text-pink-700 mb-1" title="Edit avatar" />
          <span className="text-sm text-pink-700 font-medium">
            Change picture
          </span>
        </div>

        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileChange}
          disabled={loading}
        />
      </motion.div>
      {currentProgress > 0 && <Progress value={currentProgress} />}

      {showCropper && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="relative w-[300px] h-[300px] bg-white rounded shadow">
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              zoomSpeed={0.5}
              cropShape="round"
              aspect={1}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
            />
            <button
              onClick={getCroppedImage}
              className="absolute bottom-2 left-4 px-4 py-2 bg-blue-500 text-white text-sm rounded"
            >
              Save
            </button>
            <button
              onClick={() => setShowCropper(false)}
              className="absolute bottom-2 right-4 px-4 py-2 bg-gray-300 text-black text-sm rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

export default AvatarViewAndEdit;
