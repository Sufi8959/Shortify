import { createContext, useContext, useState } from "react";

const authContextApi = createContext();

export const ContextProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(
    () => localStorage.getItem("ACCESS_TOKEN") || null
  );

  const sendData = {
    accessToken,
    setAccessToken,
  };

  return (
    <authContextApi.Provider value={sendData}>
      {children}
    </authContextApi.Provider>
  );
};

export const useContextApi = () => {
  const context = useContext(authContextApi);
  return context;
};
