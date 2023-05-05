import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const Login = () => {
  return (
    <div className="bg-slate-900 h-screen w-screen justify-center items-center flex flex-col gap-y-8 ">
      <p className="text-slate-100 text-4xl tracking-wider">chatrooms.</p>
      <ConnectButton showBalance={false} />
    </div>
  );
};

export default Login;
