import React, { useState } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import { useSignMessage } from 'wagmi';
import { RotatingLines } from 'react-loader-spinner';
import { useSetSignature } from '@/recoil/User/UserStoreHooks';
import { SignatureMessage } from '@/constants/Message';
import { useRouter } from 'next/router';

const Login = () => {
  const setSignature = useSetSignature();
  const { isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage({ message: SignatureMessage });
  const [isLoading, setIsLoading] = useState(false);
  const route = useRouter();

  return (
    <div className="bg-slate-900 h-screen w-screen justify-center items-center flex flex-col gap-y-4 ">
      <p className="text-slate-100 text-4xl tracking-wider">chatrooms.</p>

      <ConnectButton showBalance={false} />

      {!isLoading && isConnected ? (
        <button
          onClick={async () => {
            setIsLoading(true);
            try {
              const signature = await signMessageAsync();
              setIsLoading(false);
              setSignature(signature);
              route.push('/organizations');
            } catch (err) {
              setIsLoading(false);
            }
          }}
          className="bg-slate-100 px-6 py-2 rounded-md font-bold text-slate-900 hover:bg-slate-200"
        >
          Login
        </button>
      ) : null}

      <RotatingLines
        strokeColor="white"
        strokeWidth="5"
        animationDuration="0.75"
        width="40"
        visible={isLoading && isConnected}
      />
    </div>
  );
};

export default Login;
