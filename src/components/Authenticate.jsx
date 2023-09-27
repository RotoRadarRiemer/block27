import { useState } from "react";

export default function Authenticate({ token }) {
  const [successMessage, setSuccessMessage] = useState(null);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState(null);

  async function handleClick() {
    try {
      const response = await fetch("https://fsa-jwt-practice.herokuapp.com/authenticate", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message);
      }

      setSuccessMessage(result.message);
      setUserData(result.data);  // Store the user data
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <div>
      <h2>Authenticate</h2>
      {successMessage && <p>{successMessage}</p>}
      {userData && <p>Welcome back, {userData.username}!</p>}
      {error && <p>{error}</p>}
      <button onClick={handleClick}>Authenticate Token</button>
    </div>
  );
}
