"use client";

import React, { useState, useEffect, useRef } from "react";
import { toast, Toaster } from "sonner";
import { useSelector, useDispatch } from "react-redux";
import {
  changeToSignIn,
  changeToSignUp,
  toggleShowPassword,
  toggleShowConfirmPassword,
} from "./credentialsSlice";
import { setUserDetails, setUserToken } from "../jwt/userJwtSlice";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";

//form handlers
import {
  useCreateUserMutation,
  useSignInUserMutation,
} from "./userLogApiSlice";
import { useNavigate } from "react-router-dom";

function EnhancedLoginCard() {
  // const [signState,setSignState] = useState('Sign In')
  const navigate = useNavigate();
  const initialFormData = {
    email: "",
    name: "",
    phone: "",
    password: "",
    confirmPassword: "",
  };

  const [inputErrors, setInputErrors] = useState({ ...initialFormData });

  const signUpFormDataRef = useRef({ ...initialFormData });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    signUpFormDataRef.current[name] = value;

    // console.log(signUpFormDataRef.current,'changed data')
  };

  const signState = useSelector((state) => state.signState.value);
  const obj = useSelector((s) => s.signState);
  const { showConfirmPassword, showPassword } = obj;
  // console.log(obj)
  const dispatch = useDispatch();

  const userData = useRef({ name: "", email: "" });
  const [signInUser, { isSignInLoading, isSignInSuccess, isSignInError }] =
    useSignInUserMutation();
  const handleSignInClick = async () => {
    if (signState !== "Sign In") return;
    const signinEmail = signUpFormDataRef.current.email;
    const signinPassword = signUpFormDataRef.current.password;
    try {
      const res = await signInUser({
        email: signinEmail,
        password: signinPassword,
      }).unwrap();
      // console.log(res, "sign in try data");
      if (res.token) {
        // console.log(res);
        userData.current = res.userDetails;
        dispatch(setUserToken(res.token));
        dispatch(setUserDetails(res.userDetails))
        signUpFormDataRef.current = { ...initialFormData };
        toast.success("User Logged In");
        // localStorage.setItem('userName',res.userDetails.name)
        // console.log(localStorage.getItem('userName'),'got data from ls')
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error, "sign in catch data");
      if (error.error) {
        toast.error(`${error.error}`);
      }
      const errObj = error.data?.errors;
      if (errObj) {
        for (const [key, val] of Object.entries(errObj)) {
          toast.warning(`${val}`);
        }
      }
      const errMsg = error.data?.message;
      console.log(errMsg, errObj);
      if (errMsg) {
        toast.error(`${errMsg}`);
      }
    }
  };

  const [createUser, { isSignUpLoading, isSuccess, error }] =
    useCreateUserMutation();
  const handleSignUpClick = async () => {
    if (signState !== "Sign Up") return;

    try {
      const res = await createUser(signUpFormDataRef).unwrap();

      // console.log('usercreated')

      toast.success("success !!!");
    } catch (error) {
      console.log(error, "error data");
      if (error.error) {
        toast.error(`${error.error}`);
      }
      const errObj = error.data?.errors;
      if (errObj) {
        for (const [key, val] of Object.entries(errObj)) {
          console.log(key, val);
          toast.warning(`${val}`);
        }
      }
      const errMsg = error.data?.message;
      console.log(errMsg, errObj);
      if (errMsg) {
        toast.error(`${errMsg}`);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-start  justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Orbs */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-2000"></div>

        {/* Moving Particles */}
        <div className="absolute top-10 left-10 w-2 h-2 bg-white/30 rounded-full animate-bounce delay-300"></div>
        <div className="absolute top-20 right-20 w-1 h-1 bg-purple-300/50 rounded-full animate-bounce delay-700"></div>
        <div className="absolute bottom-20 left-20 w-1.5 h-1.5 bg-blue-300/40 rounded-full animate-bounce delay-1000"></div>
        <div className="absolute bottom-10 right-10 w-2 h-2 bg-pink-300/30 rounded-full animate-bounce delay-1500"></div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] animate-pulse"></div>
      </div>

      {/* Login Card */}
      <Card
        className={`w-full ${
          signState === "Sign In" ? "mt-28" : "mt-14"
        }  max-w-md relative z-10 bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl`}
      >
        <CardHeader className="space-y-2 text-center">
          <div className="mx-auto w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-4">
            <div className="w-6 h-6 bg-white rounded-full"></div>
          </div>
          <CardTitle className="text-2xl font-bold text-white">
            Welcome Back
          </CardTitle>
          <CardDescription className="text-gray-300">
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-100 font-medium">
                Email Address
              </Label>
              <Input
                onChange={handleInputChange}
                name="email"
                id="email"
                type="email"
                placeholder="Enter your email"
                required
                className="bg-white/15 border-white/30 text-white placeholder:text-gray-300 focus:border-purple-400 focus:ring-purple-400/20 transition-all duration-200"
              />
            </div>
            {signState === "Sign Up" ? (
              <div className="space-y-2">
                <Label htmlFor="name" className="text-gray-100 font-medium">
                  Your Name
                </Label>
                <Input
                  onChange={handleInputChange}
                  name="name"
                  id="name"
                  type="text"
                  placeholder="Enter your name"
                  className="bg-white/15 border-white/30 text-white placeholder:text-gray-300 focus:border-purple-400 focus:ring-purple-400/20 transition-all duration-200"
                />
                <Label htmlFor="name" className="text-gray-100 font-medium">
                  Phone Number (Optional)
                </Label>
                <Input
                  onChange={handleInputChange}
                  name="phone"
                  id="phone"
                  type="text"
                  placeholder="Enter your Number"
                  className="bg-white/15 border-white/30 text-white placeholder:text-gray-300 focus:border-purple-400 focus:ring-purple-400/20 transition-all duration-200"
                />
              </div>
            ) : (
              <></>
            )}

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-gray-100 font-medium">
                  Password
                </Label>

                {signState === "Sign In" ? (
                  <a
                    href="#"
                    className="text-sm text-purple-300 hover:text-purple-200 underline-offset-4 hover:underline transition-colors duration-200"
                  >
                    Forgot password?
                  </a>
                ) : (
                  <></>
                )}
              </div>
              <div className="relative">
                <Input
                  
                  onChange={handleInputChange}
                  name="password"
                  autoComplete="password"
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder={
                    signState === "Sign Up"
                      ? "Enter a new password"
                      : "Enter Your Password"
                  }
                  required
                  className="bg-white/15 border-white/30 text-white placeholder:text-gray-300 focus:border-purple-400 focus:ring-purple-400/20 transition-all duration-200 pr-10"
                />
                <button
                  type="button"
                  onClick={() => dispatch(toggleShowPassword())}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-white transition-colors duration-200"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              {signState === "Sign Up" ? (
                <>
                  <div className="flex items-center justify-between">
                    <Label
                      htmlFor="ConfirmPassword"
                      className="text-gray-100 font-medium"
                    >
                      Confirm Password
                    </Label>
                  </div>
                  <div className="relative">
                    <Input
                      onChange={handleInputChange}
                      id="ConfirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Re-Enter your new password"
                      required
                      className="bg-white/15 border-white/30 text-white placeholder:text-gray-300 focus:border-purple-400 focus:ring-purple-400/20 transition-all duration-200 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => dispatch(toggleShowConfirmPassword())}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-white transition-colors duration-200"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>{" "}
                </>
              ) : (
                <></>
              )}
            </div>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col gap-3">
          {signState === "Sign In" ? (
            <>
              <Button
                onClick={handleSignInClick}
                disabled={isSignInLoading}
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-2.5 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
              >
                Sign In
              </Button>
              <Button
                onClick={() => dispatch(changeToSignUp())}
                variant="link"
                className="text-purple-300 hover:text-purple-200 transition-colors duration-200"
              >
                Don't have an account? Sign Up
              </Button>{" "}
            </>
          ) : (
            <>
              <Button
                onClick={handleSignUpClick}
                disabled={isSignUpLoading}
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-2.5 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
              >
                Sign Up
              </Button>
              <Button
                onClick={() => dispatch(changeToSignIn())}
                variant="link"
                className="text-purple-300 hover:text-purple-200 transition-colors duration-200"
              >
                Already have an account? Sign In
              </Button>{" "}
            </>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}

export default EnhancedLoginCard;
