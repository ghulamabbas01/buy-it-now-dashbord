import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { setLogin, setLogout, setInitialize } from "src/redux/slices/settings";
// utils
import { isValidToken, jwtDecode, setSession } from "src/utils/jwt";
// ----------------------------------------------------------------------

function AuthProvider({ ...props }) {
  const { children } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setInitialize());
    const initialize = async () => {
      try {
        const token = localStorage.getItem("token");

        if (token && isValidToken(token)) {
          setSession(token);
          const newUser = jwtDecode(token);

          dispatch(setLogin(newUser));
        } else {
          localStorage.removeItem("token");
          dispatch(setLogout(null));
          navigate("/auth/login");
        }
      } catch (err) {
        console.error(err);
        localStorage.removeItem("token");
        dispatch(setLogout(null));
        navigate("/auth/login");
      }
    };

    initialize();
  }, []);

  return <>{children}</>;
}

export { AuthProvider };
