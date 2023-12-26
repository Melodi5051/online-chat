import React, { useEffect } from "react";
import { userStore } from "../store/user";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";

type Props = { children: React.ReactNode };

const ProtectedComponents = ({ children }: Props) => {
  console.log(children);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userStore.userAuth) {
      navigate("/");
    }
  }, [navigate]);

  if (!userStore.userAuth) {
    return null;
  }

  return <>{children}</>;
};

export default observer(ProtectedComponents);
