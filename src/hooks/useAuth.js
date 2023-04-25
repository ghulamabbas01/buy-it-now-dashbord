import { useContext } from "react";
import { AuthContext } from "../contexts/jwtContext";

// ----------------------------------------------------------------------

const useAuth = () => useContext(AuthContext);

export default useAuth;
