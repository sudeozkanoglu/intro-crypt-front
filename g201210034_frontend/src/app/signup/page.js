"use client"
import React, { useState } from "react";
import { useRouter } from 'next/navigation';
import { toast } from "react-toastify";
import { signup } from "@/api/auth";

const SignUpPage = () => {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        const response = await signup(username, password, email, firstName, lastName);
        console.log("Signup Response: ", response);

        if (response.resultMessage.messageType === "SUCCESS") {
            toast.success("Sign up successful");
            router.push("/login");
        } else {
            toast.error(response.resultMessage.messageText);
        }
    };

    return (
        <>
            <div className="flex h-screen items-center justify-center bg-gray-100">
                <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
                    <h2 className="text-2xl font-bold text-gray-700 mb-6">Sign Up</h2>
                    <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label
                        htmlFor="firstName"
                        className="block text-sm font-medium text-gray-600"
                        >
                        First Name
                        </label>
                        <input
                        type="text"
                        id="firstName"
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-black focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter your first name"
                        onChange={(e) => setFirstName(e.target.value)}
                        />
                    </div>
                    <div>
                        <label
                        htmlFor="lastName"
                        className="block text-sm font-medium text-gray-600"
                        >
                        Last Name
                        </label>
                        <input
                        type="text"
                        id="lastName"
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-black focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter your last name"
                        onChange={(e) => setLastName(e.target.value)}
                        />
                    </div>
                    <div>
                        <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-600"
                        >
                        Email
                        </label>
                        <input
                        type="email"
                        id="email"
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-black focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter your email"
                        onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label
                        htmlFor="username"
                        className="block text-sm font-medium text-gray-600"
                        >
                        Username
                        </label>
                        <input
                        type="text"
                        id="username"
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-black focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter your username"
                        onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div>
                        <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-600"
                        >
                        Password
                        </label>
                        <input
                        type="password"
                        id="password"
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-black focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter your password"
                        onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div>
                        <label
                        htmlFor="confirmPassword"
                        className="block text-sm font-medium text-gray-600"
                        >
                        Confirm Password
                        </label>
                        <input
                        type="password"
                        id="confirmPassword"
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-black focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Confirm your password"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        Sign Up
                    </button>
                    <div className="text-center text-sm">
                        <a href="/login" className="text-blue-500">
                        Already have an account? Login
                        </a>
                    </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default SignUpPage;
