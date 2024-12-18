"use client";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from 'next/navigation';
import { getUserById } from "@/api/user";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { BsFillPeopleFill } from "react-icons/bs";
import { MdCarRental } from "react-icons/md";
import { RiLogoutCircleRLine } from "react-icons/ri";

export const notifications = [
  {
    id: 1,
    message: "Your rental reservation for 'Toyota Corolla' is confirmed.",
    date: "2024-12-14",
    type: "success",
  },
  {
    id: 2,
    message: "Your rental for 'Honda Civic' is due in 2 days.",
    date: "2024-12-16",
    type: "warning",
  },
  {
    id: 3,
    message: "Your payment for 'BMW X5' failed. Please update your payment method.",
    date: "2024-12-12",
    type: "error",
  },
  {
    id: 4,
    message: "New promotional offers are available! Check out our deals.",
    date: "2024-12-10",
    type: "info",
  },
];

export const rentals = [
  {
    id: 1,
    firstName: "Alice",
    lastName: "West",
    phoneNumber: "+1234567890",
    numberOfPeople: 4,
    luggageCount: 2,
    isConfirmed: true,
    startLocation: "New York",
    endLocation: "Los Angeles",
    car: {
      carId: 1,
      brand: "Toyota",
      model: "Corolla",
      plate: "34 ABC 123",
      year: 2020,
      fuelType: "Gasoline",
      gearType: "Automatic",
      description: "A compact car for daily use.",
      maxPassenger: 5,
      maxLuggage: 3,
    },
  },
  {
    id: 2,
    firstName: "Paul",
    lastName: "Walker",
    phoneNumber: "+1234567890",
    numberOfPeople: 2,
    luggageCount: 1,
    isConfirmed: false,
    startLocation: "Los Angeles",
    endLocation: "San Francisco",
    car: {
      carId: 2,
      brand: "Honda",
      model: "Civic",
      plate: "34 XYZ 456",
      year: 2021,
      fuelType: "Gasoline",
      gearType: "Automatic",
      description: "A compact car for daily use.",
      maxPassenger: 5,
      maxLuggage: 3,
    },
  },
  {
    id: 3,
    firstName: "Nick",
    lastName: "Jonas",
    phoneNumber: "+1234567890",
    numberOfPeople: 3,
    luggageCount: 2,
    isConfirmed: true,
    startLocation: "San Francisco",
    endLocation: "Las Vegas",
    car: {
      carId: 3,
      brand: "BMW",
      model: "X5",
      plate: "34 QWE 789",
      year: 2022,
      fuelType: "Diesel",
      gearType: "Automatic",
      description: "A luxury SUV for family trips.",
      maxPassenger: 7,
      maxLuggage: 5,
    },
  },
];



export default function Home() {
  const [menu, setMenu] = useState("dashboard"); 
  const [token, setToken] = useState(null);
  const [user, setUser] = useState([]);
  const [cars, setCars] = useState([]);
  const router = useRouter();

  useEffect(() => {
    console.log("Page loaded");
    const tk = Cookies.get("token");
    const role = Cookies.get("user-type");

    if(role === "ROLE_ADMIN") {
      router.push("/admin");
    }

    if (tk) {
      console.log("Token found");
    }
    else {
      router.push("/login");
    }
    setToken(tk);

    const handleGetUserDetails = async () => {
      const userId = Cookies.get("userId");
      const response = await getUserById(userId);
      setUser(response.data)
    }
    handleGetUserDetails();
  }, []);

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("user-type");
    Cookies.remove("userId");
    setToken(null);
    router.push("/login");
  }

  return (
    <>
      {token ? <div className="flex h-screen">
        <div className="w-1/6 bg-gray-900 text-white flex flex-col p-4">
          <h2 className="text-2xl font-bold mb-6">Car Rental</h2>
          <nav className="space-y-4">

            <div className={`w-full flex gap-x-2 items-center cursor-pointer text-left p-2 rounded-lg ${menu === "dashboard" ? "bg-blue-800" : "hover:bg-blue-600 duration-300 transition"
              }`}
              onClick={() => setMenu("dashboard")}>
              <MdOutlineSpaceDashboard size={26} />
              <button>
                Dashboard
              </button>
            </div>

            <div className={`w-full flex gap-x-2 items-center cursor-pointer text-left p-2 rounded-lg ${menu === "vehicles" ? "bg-blue-800" : "hover:bg-blue-600 duration-300 transition"
              }`}
              onClick={() => setMenu("users")}>
              <BsFillPeopleFill size={24} />
              <button>
                Users
              </button>
            </div>

            <div className={`w-full flex gap-x-2 items-center cursor-pointer text-left p-2 rounded-lg ${menu === "rentals" ? "bg-blue-800" : "hover:bg-blue-600 duration-300 transition"
              }`}
              onClick={() => setMenu("rentals")}>
              <MdCarRental size={30} />
              <button>
                Rentals
              </button>
            </div>

            <div className={`w-full flex gap-x-2 items-center cursor-pointer text-left p-2 rounded-lg ${menu === "logout" ? "bg-blue-800" : "hover:bg-blue-600 duration-300 transition"
              }`}
              onClick={handleLogout}>
              <RiLogoutCircleRLine size={26} />
              <button>
                Logout
              </button>
            </div>
          </nav>
        </div >

        <div className="flex-1 bg-gray-100 text-black p-8">
          <h1 className="text-3xl font-bold mb-6">Welcome to the Dashboard</h1>
          {menu === "dashboard" && (
            <div className="max-w-8xl mx-auto p-6 bg-gray-900 text-gray-100 rounded-lg shadow-xl">
              <h2 className="text-2xl font-semibold mb-6 text-center">Welcome to Your Dashboard</h2>

              <div className="mb-6">
                <h3 className="text-xl font-bold mb-4">Your Information</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b border-gray-700 pb-2">
                    <span className="font-semibold">Name:</span>
                    <span>{user.lastName}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-gray-700 pb-2">
                    <span className="font-semibold">Email:</span>
                    <span>{user.email}</span>
                  </div>
                </div>
              </div>
              <div className="mb-6">
                <h3 className="text-xl font-bold mb-4">Your Statistics</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-800 rounded-lg p-4 text-center shadow">
                    <h4 className="text-lg font-semibold">Total Cars Rented</h4>
                    <p className="text-2xl font-bold mt-2">{rentals?.length}</p>
                  </div>
                  <div className="bg-blue-800 rounded-lg p-4 text-center shadow">
                    <h4 className="text-lg font-semibold">Total Rentals</h4>
                    <p className="text-2xl font-bold mt-2">{cars?.length}</p>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4">Notifications</h3>
                <ul className="space-y-2">
                  {notifications.length > 0 ? (
                    notifications.map((notification, index) => (
                      <li
                        key={index}
                        className="bg-blue-800 rounded-lg p-4 shadow flex items-center justify-between"
                      >
                        <span>{notification.message}</span>
                        <span className="text-sm text-gray-400">{notification.date}</span>
                      </li>
                    ))
                  ) : (
                    <p className="text-gray-400">You have no new notifications.</p>
                  )}
                </ul>
              </div>
            </div>
          )}

          {menu === "users" && (
            <div className="max-w-8xl  p-6 bg-gray-900 text-gray-100 rounded-lg shadow-xl">
              <h2 className="text-2xl font-semibold mb-6 text-center">User Profile</h2>
              <div className="flex items-center justify-center mb-6">
                <div className="w-24 h-24 rounded-full bg-blue-700 flex items-center justify-center text-3xl font-bold shadow-lg">
                  {user.firstName.charAt(0).toUpperCase()}{user.lastName.charAt(0).toUpperCase()}
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-gray-700 pb-2">
                  <span className="font-semibold text-lg">Name:</span>
                  <span>{user.firstName}</span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-700 pb-2">
                  <span className="font-semibold text-lg">Surname:</span>
                  <span>{user.lastName}</span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-700 pb-2">
                  <span className="font-semibold text-lg">Email:</span>
                  <span>{user.email}</span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-700 pb-2">
                  <span className="font-semibold text-lg">Username:</span>
                  <span>{user.username}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-lg">Password:</span>
                  <span>******</span>
                </div>
              </div>
            </div>
          )}

          {menu === "rentals" && (
            <div className="max-w-8xl mx-auto p-6 bg-gray-900 text-gray-100 rounded-lg shadow-xl">
              <h2 className="text-2xl font-semibold mb-6 text-center">Rental History</h2>
              <p className="text-gray-400 mb-6 text-center">
                Below is the history of your rental transactions.
              </p>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-gray-800 text-gray-100 rounded-lg shadow-md">
                  <thead className="bg-blue-900 rounded-lg">
                    <tr>
                      <th className="py-3 px-6 text-left text-md font-bold uppercase">First Name</th>
                      <th className="py-3 px-6 text-left text-md font-bold uppercase">Last Name</th>
                      <th className="py-3 px-6 text-left text-md font-bold uppercase">Phone Number</th>
                      <th className="py-3 px-6 text-left text-md font-bold uppercase">Number of People</th>
                      <th className="py-3 px-6 text-left text-md font-bold uppercase">Luggage Count</th>
                      <th className="py-3 px-6 text-left text-md font-bold uppercase">Is Confirmed</th>
                      <th className="py-3 px-6 text-left text-md font-bold uppercase">Start Location</th>
                      <th className="py-3 px-6 text-left text-md font-bold uppercase">End Location</th>
                      <th className="py-3 px-6 text-left text-md font-bold uppercase">Car ID</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {rentals?.map((rental) => (
                      <tr key={rental?.id} className="hover:bg-gray-700 transition duration-200">
                        <td className="py-3 px-6 font-medium">{rental?.firstName}</td>
                        <td className="py-3 px-6 font-medium">{rental?.lastName}</td>
                        <td className="py-3 px-6 font-medium">{rental?.phoneNumber}</td>
                        <td className="py-3 px-6 font-medium">{rental?.numberOfPeople}</td>
                        <td className="py-3 px-6 font-medium">{rental?.luggageCount}</td>
                        <td className="py-3 px-6 font-medium">
                          {rental?.isConfirmed ? (
                            <span className="text-green-400">Confirmed</span>
                          ) : (
                            <span className="text-red-400">Pending</span>
                          )}
                        </td>
                        <td className="py-3 px-6 font-medium">{rental?.startLocation}</td>
                        <td className="py-3 px-6 font-medium">{rental?.endLocation}</td>
                        <td className="py-3 px-6 font-medium">{rental?.car?.carId}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {menu === "cars" && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Cars</h2>
              <p className="text-gray-600 mb-4">Manage your cars</p>
              <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
                <thead className="bg-blue-500 text-white">
                  <tr>
                    <th className="py-2 px-4 text-left">Brand</th>
                    <th className="py-2 px-4 text-left">Model</th>
                    <th className="py-2 px-4 text-left">Plate</th>
                    <th className="py-2 px-4 text-left">Year</th>
                    <th className="py-2 px-4 text-left">Fuel Type</th>
                    <th className="py-2 px-4 text-left">Gear Type</th>
                    <th className="py-2 px-4 text-left">Description</th>
                    <th className="py-2 px-4 text-left">Max Passenger</th>
                    <th className="py-2 px-4 text-left">Max Luggage</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {cars?.map((car) => (
                    <tr key={car.carId} className="hover:bg-gray-100">
                      <td className="py-2 px-4">{car?.brand}</td>
                      <td className="py-2 px-4">{car?.model}</td>
                      <td className="py-2 px-4">{car?.plate}</td>
                      <td className="py-2 px-4">{car?.year}</td>
                      <td className="py-2 px-4">{car?.fuelType}</td>
                      <td className="py-2 px-4">{car?.gearType}</td>
                      <td className="py-2 px-4">{car?.description}</td>
                      <td className="py-2 px-4">{car?.maxPassenger}</td>
                      <td className="py-2 px-4">{car?.maxLuggage}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div> : <div> Loading... </div>}
    </>
  );
}
