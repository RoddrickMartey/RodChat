import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSelector } from "react-redux";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import Logout from "./Logout";
import { LogOutIcon, User, Wallpaper } from "lucide-react";
import { Link } from "react-router";

function UserAvatar() {
  const { user } = useSelector((state) => state.user);

  return (
    <AlertDialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="hover:bg-blue-100 hover:border-2 h-full w-full items-center justify-center flex">
            <Avatar>
              <AvatarImage src={user.avatar} className="w-full" />
              <AvatarFallback>PIC</AvatarFallback>
            </Avatar>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" avoidCollisions>
          <DropdownMenuLabel>Me</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem className="focus:bg-blue-400">
              <Link
                to="/profile"
                className=" flex items-center justify-between w-full"
              >
                <h1 className="text-slate-900 font-semibold">Profile</h1>
                <User className="text-blue-600" />
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="focus:bg-blue-400">
              <Link
                to="/wallpaper"
                className=" flex items-center justify-between w-full"
              >
                <h1 className="text-slate-900 font-semibold">Wallpapers</h1>
                <Wallpaper className="text-pink-500" />
              </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <AlertDialogTrigger asChild>
              <DropdownMenuItem className="focus:bg-red-400">
                <div className="flex items-center justify-between w-full">
                  <h1 className="text-slate-900 font-semibold">Logout</h1>
                  <LogOutIcon className="text-red-600" />
                </div>
              </DropdownMenuItem>
            </AlertDialogTrigger>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* AlertDialog content is outside the menu */}
      <Logout />
    </AlertDialog>
  );
}

export default UserAvatar;
