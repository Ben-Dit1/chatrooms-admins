/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import Router, { useRouter } from 'next/router';
import { useCreateKey } from '@/hooks/queries/useCreateKey';
import { error } from '@/hooks/useToastify';
import { ADMIN_ROOT, APP_AUTH_ROOT } from '@/config';
import Image from 'next/image';
import chatroomsLogo from '@/public/assets/chatroomsLogo.svg';
import barcaLogo from '@/public/assets/logo.png';
import ethyleneBig from '@/public/assets/ethyleneBig.png';
import doingudBig from '@/public/assets/doingudBig.png';
import orbisBig from '@/public/assets/orbisBig.png';
import useWindowSize from '@/hooks/useWindowSize';
import { useGetSessionById } from '@/hooks/queries/useGetSessionById';
import { MdOutlineLightMode } from 'react-icons/md';

export default function Qr() {
  const [link, setLink] = useState<string>('');
  const router = useRouter();
  let preSig: string;
  let { id } = router.query;
  const [w, h] = useWindowSize();
  const { mutateAsync } = useCreateKey();
  const { data } = useGetSessionById(id as string);
  const [isGreen, setIsGreen] = useState(false);
  async function generateQr() {
    if (typeof id == 'string' && id.includes('-')) {
      const fullId = id;
      id = fullId.split('-')[0];
      preSig = fullId.split('-')[1];
    }
    try {
      id = id as string;
      const { data } = await mutateAsync({
        sessionId: id,
        preSig: preSig ? preSig : undefined,
      });
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
  if (h > w) {
    return (
      <>
        <div
          className={`${
            isGreen ? 'bg-green-grad' : 'bg'
          } bg w-full p-4 space-x-0 space-y-4 lg:space-y-12 h-screen overflow-hidden min-h-fullscreen flex-col flex items-center justify-center z-10`}
        >
          <img
            className="w-auto h-[40%] rounded-3xl drop-shadow-xl shadow-sm shadow-gray-800"
            src={link}
            alt="qrToMint"
          />

          <div className="w-auto max-w-[900px] backdrop:blur-xl min-w-[94%] lg:h-[46%] h-[50%] space-y-2 border-[rgba(54,69,79,0.4)] border-4 rounded-[30px] linear-card flex flex-col justify-around items-center text-white p-6">
            <Image
              alt="chatroomsLogo"
              src={chatroomsLogo.src}
              width={350}
              height={250}
            />
            <div className="text-center">
              <p className="text-[3.25rem] font-medium leading-[1.3em]">
                Engage with speakers
              </p>
              <p className="font-medium text-[2.75rem] leading-[1.3em]">
                by asking and upvoting
              </p>
            </div>
            {data && (
              <div>
                <p
                  className={`${
                    isGreen ? 'text-[#F6C24D]' : 'text-[#CBA1A4]'
                  } text-center font-medium text-[2.25rem]`}
                >
                  Presentation
                </p>
                <p className="text-[2.75rem] text-center text-white capitalize">
                  {data.data.name}
                </p>
              </div>
            )}
            <div
              className={`rounded-2xl border-[3px] ${
                isGreen ? 'border-[#F6C24D]' : 'border-[#CBA1A4]'
              }  text-center`}
            >
              <p className="text-[2.25rem] py-5 px-6">
                +100$ USDC GIVEAWAY 🎉
              </p>
            </div>
            <div className="flex items-center justify-between w-[98%] px-4">
              <div className="flex flex-col space-y-1 items-start">
                <p className="text-[0.5rem] lg:text-[2rem] font-light">
                  Developed by
                </p>
                <div className="flex items-center space-x-2 lg:space-x-10 justify-start">
                  <Image
                    src={ethyleneBig.src}
                    alt="ethyleneBig"
                    width={260}
                    height={60}
                  />
                  <Image
                    src={doingudBig.src}
                    alt="doingudBig"
                    width={180}
                    height={60}
                    style={{ transform: 'translateY(-2px)' }}
                  />
                </div>
              </div>
              <div className="flex flex-col space-y-1 items-center -translate-y-[8px]">
                <p className="text-[0.5rem] font-light lg:text-[2rem]">
                  Powered by
                </p>
                <div className="flex items-center">
                  <Image
                    alt="orbis"
                    src={orbisBig.src}
                    width={140}
                    height={60}
                  />
                </div>
              </div>
            </div>
          </div>
          {!id?.includes('-') && (
            <button
              className=" border-[1px] border-white text-sm p-2 rounded-lg absolute top-4 right-16 text-white"
              onClick={() => {
                navigator.clipboard.writeText(
                  `${ADMIN_ROOT}/sessions/key/${id}-${window.localStorage.getItem(
                    'chatrooms',
                  )}`,
                );
              }}
            >
              Get Permalink
            </button>
          )}
          <button
            onClick={() => {
              setIsGreen((prev) => !prev);
            }}
            className="absolute top-6 right-6 text-white"
          >
            <MdOutlineLightMode size={30} />
          </button>
        </div>
      </>
    );
  }
  return (
    <>
      <div className="bg w-full p-4 space-x-0 space-y-4 md:space-x-10 md:space-y-0 h-screen min-h-fullscreen flex-col md:flex-row flex items-center justify-center z-10">
        <img
          className="w-[50%] lg:w-[26%] rounded-3xl drop-shadow-xl shadow-sm shadow-gray-800"
          src={link}
          alt="qrToMint"
        />

        <div className="w-[70%] lg:w-[30%] min-h-[50%] border-[#283040] border-4 rounded-3xl linear-card flex flex-col justify-between items-center text-white py-8 px-6">
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
          {data && (
            <p className="text-xl text-center text-white capitalize">{data.data.name}</p>
          )}
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
                  width={100}
                  height={30}
                />
                <Image
                  src={doingudBig.src}
                  alt="doingudBig"
                  width={70}
                  height={30}
                  style={{ transform: 'translateY(-3px)' }}
                />
              </div>
            </div>
            <div className="flex flex-col space-y-1 items-center">
              <p className="text-xs font-light">Powered by</p>
              <div className="flex items-center">
                <Image alt="orbis" src={orbisBig.src} width={70} height={30} />
              </div>
            </div>
          </div>
        </div>
        {!id?.includes('-') && (
          <button
            className=" border-[1px] border-white text-sm p-2 rounded-lg absolute top-4 right-4 text-white"
            onClick={() => {
              navigator.clipboard.writeText(
                `${ADMIN_ROOT}/sessions/key/${id}-${window.localStorage.getItem(
                  'chatrooms',
                )}`,
              );
            }}
          >
            Get Permalink
          </button>
        )}
      </div>
    </>
  );
}
