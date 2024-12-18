import Cookies from "js-cookie";

export const getAllUsers = async () => {

    const token = Cookies.get("token");

    try {
        const response = await fetch(`http://localhost:8081/user/v1/getAllUsers`, {
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

export const getUserById = async (id) => {

    const token = Cookies.get("token");

    try {
        const response = await fetch(`http://localhost:8081/user/v1/getUserById?id=${id}`, {
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
}