import Cookies from "js-cookie";

export const getAllRentals = async () => {

    const token = Cookies.get("token");

    try {
        const response = await fetch(`http://localhost:8081/reservation/v1/getAllReservations`, {
            cache: "no-store",
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },

        });

        if (!response.ok) {
            return "ERROR";
        }
        const data = await response.json();
        return data;

    } catch (error) {
        console.error(error);
    }
};