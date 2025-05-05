import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardDescription,
  CardTitle,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import Login from "./Login";
import SignUp from "./SignUp";
import { MessageCircleHeart } from "lucide-react";

function Auth() {
  return (
    <main className="flex justify-center w-full pb-10 bg-gradient-to-r from-blue-500 from-30% via-purple-500 via-50% to-pink-500  min-h-screen">
      <div className="w-full max-w-md p-4 rounded-lg my-10">
        {/* RodChat Title */}
        <div className="text-center text-3xl font-bold mb-6 text-primary flex items-center gap-2 justify-center bg-background py-1 rounded-xl">
          <h1>RodChat</h1> <MessageCircleHeart className="text-pink-600" />
        </div>

        <Tabs defaultValue="login">
          <TabsList className="grid w-full grid-cols-2 ">
            <TabsTrigger
              value="login"
              className=" transition-all duration-300 data-[state=active]:bg-blue-400 data-[state=active]:text-white"
            >
              Login
            </TabsTrigger>
            <TabsTrigger
              value="signup"
              className=" transition-all duration-300 data-[state=active]:bg-blue-400 data-[state=active]:text-white"
            >
              Sign Up
            </TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <Card className="">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold">Login</CardTitle>
                <CardDescription className="text-sm  mb-4">
                  Please login to your account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Login />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="signup">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-semibold">
                  Sign Up
                </CardTitle>
                <CardDescription className="text-sm  mb-4">
                  Please enter details to create a user account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SignUp />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}

export default Auth;
