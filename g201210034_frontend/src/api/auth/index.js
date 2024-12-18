import Cookies from "js-cookie";

export const login = async (username, password) => {
  const loginRequest = {
    username,
    password,
  };

  try {
    const response = await fetch(`http://localhost:8081/login/v1/auth`, {
      cache: "no-store",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginRequest), // JSON.stringify kullanılıyor
    });

    if (!response.ok) {
      return "ERROR";
    }
    const data = await response.json();
    Cookies.set("token", data.data.token);
    Cookies.set("user-type", data.data.userSignUpTypes);
    Cookies.set("userId", data.data.userId);
    return data.resultMessage.messageType;
  } catch (error) {
    console.error(error);
  }
};


export const signup = async (username, password, firstName, lastName, email) => {
  const signupRequest = {
    username,
    password,
    email,
    firstName,
    lastName,
    userType: "ROLE_USER"
  };

  console.log("Siginup Request: ", signupRequest);

  try {
    const response = await fetch(`http://localhost:8081/login/v1/save`, {
      cache: "no-store",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signupRequest),
    });
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}