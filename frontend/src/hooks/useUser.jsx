import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import axios from "axios";

function useUser() {
  const { user } = useContext(AuthContext);
  const [role, setRole] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      axios
        .get(`http://localhost:8000/user/${user}`)
        .then((res) => {
          setUserData(res.data);
          setRole(res.data.role); // Set the role data
          setError(null); // Clear any errors
        })
        .catch((err) => {
          setError(err.response?.data?.message || "Failed to fetch user role");
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [user]);

  return { userData, role, loading, error };
}

export default useUser;
