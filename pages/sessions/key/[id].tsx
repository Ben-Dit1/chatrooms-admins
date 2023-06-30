/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import Router, { useRouter } from 'next/router';
import { useCreateKey } from '@/hooks/queries/useCreateKey';
import { error } from '@/hooks/useToastify';
import { APP_AUTH_ROOT } from '@/config';
import Image from 'next/image';
import logo from '@/public/assets/logo.png';
import chatroomsLogo from '@/public/assets/chatroomsLogo.svg';
import ethyleneBig from '@/public/assets/ethyleneBig.png';
import doingudBig from '@/public/assets/doingudBig.png';
import orbisBig from '@/public/assets/orbisBig.png';

export default function Qr() {
  const [link, setLink] = useState<string>('');
  const router = useRouter();
  const { id } = router.query;
  const { mutateAsync } = useCreateKey();
  async function generateQr() {
    try {
      const { data } = await mutateAsync(id as string);
      QRCode.toDataURL(APP_AUTH_ROOT + '/' + data.key, (err, url) => {
        if (err) return console.log(err);
        setLink(url);
      });
    } catch (e: any) {
      error(e.response.data.message);
      Router.push('/organizations');
    }
  }
  useEffect(() => {
    const interval = setInterval(() => {
      if (id) generateQr();
    }, 10000);
    if (id) generateQr();
    return () => clearInterval(interval);
  }, [id]);

  return (
    <>
      <div className="bg w-full space-x-0 space-y-4 md:space-x-10 md:space-y-0 h-screen min-h-fullscreen flex-col md:flex-row flex items-center justify-center z-10">
        <img
          className="w-[40%] lg:w-[26%] rounded-3xl drop-shadow-xl shadow-sm shadow-gray-800"
          src={link}
          alt="qrToMint"
        />

        <div className="w-[56%] lg:w-[30%] min-h-[50%] border-[#283040] border-4 rounded-3xl linear-card flex flex-col justify-between items-center text-white py-8 px-6">
          <Image
            alt="chatroomsLogo"
            src={chatroomsLogo.src}
            width={250}
            height={250}
          />
          <div className="flex flex-col text-center justify-center items-center space-y-2">
            <p className="text-3xl font-medium">Engage with speakers</p>
            <p className="text-xl font-medium">by asking and upvoting</p>
          </div>
          <div className="px-4 py-2 rounded-lg border-[1px] border-white text-center">
            <p className="text-lg">+100$ USDC GIVEAWAY* 🎉</p>
          </div>
          <div className="flex items-center justify-between w-[90%]">
            <div className="flex flex-col space-y-1 items-start">
              <p className="text-xs font-light">Developed by</p>
              <div className="flex items-center flex-col space-x-0 space-y-1 md:space-x-2 md:flex-row justify-start">
                <Image
                  src={ethyleneBig.src}
                  alt="ethyleneBig"
                  width={110}
                  height={50}
                />
                <Image
                  src={doingudBig.src}
                  alt="doingudBig"
                  width={70}
                  height={30}
                />
              </div>
            </div>
            <div className="flex flex-col space-y-1 items-center">
              <p className="text-xs font-light">Powered by</p>
              <div className="flex items-center">
                <Image alt="" src={orbisBig.src} width={70} height={30} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
