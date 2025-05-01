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

function Auth() {
  return (
    <main className="flex justify-center w-full pb-10 bg-background ">
      <div className="w-full max-w-md p-4 rounded-lg my-10">
        {/* RodChat Title */}
        <h1 className="text-center text-3xl font-bold mb-6 text-primary">
          RodChat
        </h1>

        <Tabs defaultValue="login">
          <TabsList className="grid w-full grid-cols-2 ">
            <TabsTrigger
              value="login"
              className="font-semibold transition-all duration-300"
            >
              Login
            </TabsTrigger>
            <TabsTrigger
              value="signup"
              className="font-semibold transition-all duration-300"
            >
              Sign Up
            </TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <Card>
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
