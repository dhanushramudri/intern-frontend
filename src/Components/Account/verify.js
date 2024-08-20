import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import logout from "../Auth/logout";
import { useDispatch } from "react-redux";

export default function Verify() {
  const { token } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const set_token = (token) => ({
    type: "token",
    payload: token,
  });

  useEffect(() => {
    (async () => {
      fetch(`${process.env.REACT_APP_API_ENDPOINT}/verify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          if (data.status === "success") {
            const ThreeDaysFromNow = new Date();
            ThreeDaysFromNow.setDate(ThreeDaysFromNow.getDate() + 3);
            document.cookie = `token=${encodeURIComponent(
              data.token
            )};  domain=.joby.ai; path=/;`;
            dispatch(set_token(data.token));
            navigate("/");
          } else {
            logout();
            alert("Email verification failed!");
            navigate("/login");
          }
        });
    })();
  }, []);
  return <div>Verifying...</div>;
}
