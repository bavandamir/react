import React, { useState, useEffect } from "react";

export const AuthContext = React.createContext();

export const AuthProvider = (props) => {
  const [token, settoken] = useState(localStorage.getItem("token"));

  return (
    <AuthContext.Provider value={[token, settoken]}>
      {props.children}
    </AuthContext.Provider>
  );
};
