"use client";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from 'next/navigation';
import { getAllUsers } from "@/api/user";
import { getAllCars } from "@/api/car";
import { getAllRentals } from "@/api/rentals";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { BsFillPeopleFill } from "react-icons/bs";
import { MdCarRental } from "react-icons/md";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { FaCar } from "react-icons/fa";


export default function AdminPage() {
  const [menu, setMenu] = useState("dashboard");
  const [token, setToken] = useState(null);
  const [users, setUsers] = useState([]);
  const [cars, setCars] = useState([]);
  const [rentals, setRentals] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const tk = Cookies.get("token");
    const role = Cookies.get("user-type");
    if(role !== "ROLE_ADMIN") {
      router.push("/");
    }

    if (tk) {
      console.log("Token found");
    }
    else {
      router.push("/login");
    }
    setToken(tk);

    const handleGetAllUsers = async () => {
      const response = await getAllUsers();
      setUsers(response.data)
    }

    const handleGetAllCars = async () => {
      const response = await getAllCars();
      setCars(response.data)
    }

    const handleGetAllRentals = async () => {
      const response = await getAllRentals();
      setRentals(response.data)
    }
    handleGetAllUsers();
    handleGetAllCars();
    handleGetAllRentals();
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
            <div className={`w-full flex gap-x-2 items-center cursor-pointer text-left p-2 rounded-lg 
              ${menu === "dashboard" ? "bg-blue-800" : "hover:bg-blue-600 duration-300 transition"}`}
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

            <div className={`w-full flex gap-x-2 items-center cursor-pointer text-left p-2 rounded-lg ${menu === "cars" ? "bg-blue-800" : "hover:bg-blue-600 duration-300 transition"
              }`}
              onClick={() => setMenu("cars")}>
              <FaCar size={24} />
              <button>
                Cars
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

        <div className="flex-1 bg-gray-100 text-black p-8" >
          <h1 className="text-3xl font-bold mb-6">Welcome to the Admin Dashboard</h1>
          {
            menu === "dashboard" && (
              <div>
                <h2 className="text-xl font-semibold mb-4 text-black">Dashboard Overview</h2>
                <p className="text-black mb-4">Here you can view the main dashboard stats.</p>
                <table className="min-w-full bg-blue-900 text-gray-100 border border-gray-700 rounded-lg shadow-xl">
                  <thead className="bg-blue-950">
                    <tr>
                      <th className="py-3 px-6 text-left text-md font-bold uppercase tracking-wider">Category</th>
                      <th className="py-3 px-6 text-left text-md font-bold uppercase tracking-wider">Count</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-blue-800">
                    <tr className="hover:bg-blue-800 transition duration-200">
                      <td className="py-4 px-6 font-medium">Total Users</td>
                      <td className="py-4 px-6">{users?.length}</td>
                    </tr>
                    <tr className="hover:bg-blue-800 transition duration-200">
                      <td className="py-4 px-6 font-medium">Total Cars</td>
                      <td className="py-4 px-6">{cars?.length}</td>
                    </tr>
                    <tr className="hover:bg-blue-800 transition duration-200">
                      <td className="py-4 px-6 font-medium">Total Rentals</td>
                      <td className="py-4 px-6">{rentals?.length}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )
          }

          {
            menu === "users" && (
              <div>
                <h2 className="text-xl font-semibold mb-4 text-black">User Table</h2>
                <p className="text-black mb-4">See information about users</p>
                <table className="min-w-full bg-blue-900 text-gray-100 border border-gray-700 rounded-lg shadow-xl">
                  <thead className="bg-blue-950">
                    <tr>
                      <th className="py-3 px-6 text-left text-md font-bold uppercase tracking-wider">Name</th>
                      <th className="py-3 px-6 text-left text-md font-bold uppercase tracking-wider">Surname</th>
                      <th className="py-3 px-6 text-left text-md font-bold uppercase tracking-wider">Email</th>
                      <th className="py-3 px-6 text-left text-md font-bold uppercase tracking-wider">Identity Number</th>
                      <th className="py-3 px-6 text-left text-md font-bold uppercase tracking-wider">Username</th>
                      <th className="py-3 px-6 text-left text-md font-bold uppercase tracking-wider">Password</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-blue-800">
                    {users?.map((user) => (
                      <tr key={user.userId} className="hover:bg-blue-800 transition duration-200">
                        <td className="py-4 px-6 font-medium">{user.firstName}</td>
                        <td className="py-4 px-6 font-medium">{user.lastName}</td>
                        <td className="py-4 px-6 font-medium">{user.email}</td>
                        <td className="py-4 px-6 font-medium">{user.identityNumber}</td>
                        <td className="py-4 px-6 font-medium">{user.username}</td>
                        <td className="py-4 px-6 font-medium">{user.password}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
          }

          {
            menu === "rentals" && (
              <div>
                <h2 className="text-xl font-semibold mb-4 text-black">Rental History</h2>
                <p className="text-black mb-4">View all rental transactions.</p>
                <table className="min-w-full bg-blue-900 text-gray-100 border border-gray-700 rounded-lg shadow-xl">
                  <thead className="bg-blue-950">
                    <tr>
                      <th className="py-3 px-6 text-left text-md font-bold uppercase tracking-wider">First Name</th>
                      <th className="py-3 px-6 text-left text-md font-bold uppercase tracking-wider">Last Name</th>
                      <th className="py-3 px-6 text-left text-md font-bold uppercase tracking-wider">Phone Number</th>
                      <th className="py-3 px-6 text-left text-md font-bold uppercase tracking-wider">Number of People</th>
                      <th className="py-3 px-6 text-left text-md font-bold uppercase tracking-wider">Luggage Count</th>
                      <th className="py-3 px-6 text-left text-md font-bold uppercase tracking-wider">Is Confirmed</th>
                      <th className="py-3 px-6 text-left text-md font-bold uppercase tracking-wider">Start Location</th>
                      <th className="py-3 px-6 text-left text-md font-bold uppercase tracking-wider">End Location</th>
                      <th className="py-3 px-6 text-left text-md font-bold uppercase tracking-wider">Car ID</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-blue-800">
                    {rentals.map((rental) => (
                      <tr key={rental.reservationId} className="hover:bg-blue-800 transition duration-200">
                        <td className="py-4 px-6 font-medium">{rental.firstName}</td>
                        <td className="py-4 px-6 font-medium">{rental.lastName}</td>
                        <td className="py-4 px-6 font-medium">{rental.phoneNumber}</td>
                        <td className="py-4 px-6 font-medium">{rental.numberOfPeople}</td>
                        <td className="py-4 px-6 font-medium">{rental.luggageCount}</td>
                        <td className="py-4 px-6 font-medium">{rental.isConfirmed ? "Yes" : "No"}</td>
                        <td className="py-4 px-6 font-medium">{rental.startLocation}</td>
                        <td className="py-4 px-6 font-medium">{rental.endLocation}</td>
                        <td className="py-4 px-6 font-medium">{rental.car.carId}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
          }

          {
            menu === "cars" && (
              <div>
                <h2 className="text-xl font-semibold mb-4 text-black">Cars</h2>
                <p className="text-black mb-4">Manage your cars</p>
                <table className="min-w-full bg-blue-900 text-gray-100 border border-gray-700 rounded-lg shadow-xl">
                  <thead className="bg-blue-950">
                    <tr>
                      <th className="py-3 px-6 text-left text-lg font-bold uppercase tracking-wider">Brand</th>
                      <th className="py-3 px-6 text-left text-lg font-bold uppercase tracking-wider">Model</th>
                      <th className="py-3 px-6 text-left text-lg font-bold uppercase tracking-wider">Plate</th>
                      <th className="py-3 px-6 text-left text-lg font-bold uppercase tracking-wider">Year</th>
                      <th className="py-3 px-6 text-left text-lg font-bold uppercase tracking-wider">Fuel Type</th>
                      <th className="py-3 px-6 text-left text-lg font-bold uppercase tracking-wider">Gear Type</th>
                      <th className="py-3 px-6 text-left text-lg font-bold uppercase tracking-wider">Description</th>
                      <th className="py-3 px-6 text-left text-lg font-bold uppercase tracking-wider">Max Passenger</th>
                      <th className="py-3 px-6 text-left text-lg font-bold uppercase tracking-wider">Max Luggage</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-blue-800">
                    {cars.map((car) => (
                      <tr key={car.carId} className="hover:bg-blue-800 transition duration-200">
                        <td className="py-4 px-6 font-medium">{car.brand}</td>
                        <td className="py-4 px-6 font-medium">{car.model}</td>
                        <td className="py-4 px-6 font-medium">{car.plate}</td>
                        <td className="py-4 px-6 font-medium">{car.year}</td>
                        <td className="py-4 px-6 font-medium">{car.fuelType}</td>
                        <td className="py-4 px-6 font-medium">{car.gearType}</td>
                        <td className="py-4 px-6 font-medium">{car.description}</td>
                        <td className="py-4 px-6 font-medium">{car.maxPassenger}</td>
                        <td className="py-4 px-6 font-medium">{car.maxLuggage}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
          }
        </div >
      </div > : <div> Loading... </div>
      }
    </>
  );
}
