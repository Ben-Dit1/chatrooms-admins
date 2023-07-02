/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import Router, { useRouter } from 'next/router';
import { useCreateKey } from '@/hooks/queries/useCreateKey';
import { error } from '@/hooks/useToastify';
import { ADMIN_ROOT, APP_AUTH_ROOT } from '@/config';
import Image from 'next/image';
import chatroomsLogo from '@/public/assets/chatroomsLogo.svg';
import ethyleneBig from '@/public/assets/ethyleneBig.png';
import doingudBig from '@/public/assets/doingudBig.png';
import orbisBig from '@/public/assets/orbisBig.png';
import useWindowSize from '@/hooks/useWindowSize';

export default function Qr() {
  const [link, setLink] = useState<string>('');
  const router = useRouter();
  let preSig: string;
  let { id } = router.query;
  const [w, h] = useWindowSize();
  const { mutateAsync } = useCreateKey();
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
        <div className="bg w-full p-4 space-x-0 space-y-4 lg:space-y-8 h-screen overflow-hidden min-h-fullscreen flex-col flex items-center justify-center z-10">
          <img
            className="w-auto h-[40%] rounded-3xl drop-shadow-xl shadow-sm shadow-gray-800"
            src={link}
            alt="qrToMint"
          />

          <div className="w-auto max-w-[700px] min-w-[80%] lg:h-[30%] h-[50%] space-y-2 border-[#283040] border-4 rounded-3xl linear-card flex flex-col justify-between items-center text-white p-4">
            <Image
              alt="chatroomsLogo"
              src={chatroomsLogo.src}
              width={250}
              height={250}
              style={{ marginBottom: '2px' }}
            />
            <div className="flex flex-col text-center justify-center items-center lg:space-y-10 space-y-1">
              <p className="text-xl lg:text-[4rem] font-medium">
                Engage with speakers
              </p>
              <p className="font-medium lg:text-[3rem] text-sm">
                by asking and upvoting
              </p>
            </div>
            <div className="p-2 rounded-lg border-[1px] border-white text-center">
              <p className="text-sm lg:text-[3rem] lg:px-10 py-6">
                +100$ USDC GIVEAWAY* 🎉
              </p>
            </div>
            <div className="flex items-center justify-between w-[98%]">
              <div className="flex flex-col space-y-1 items-start">
                <p className="text-[0.5rem] lg:text-[2rem] font-light">
                  Developed by
                </p>
                <div className="flex items-center space-x-2 justify-start">
                  <Image
                    src={ethyleneBig.src}
                    alt="ethyleneBig"
                    width={150}
                    height={30}
                  />
                  <Image
                    src={doingudBig.src}
                    alt="doingudBig"
                    width={100}
                    height={30}
                    style={{ transform: 'translateY(-1px)' }}
                  />
                </div>
              </div>
              <div className="flex flex-col space-y-1 items-center">
                <p className="text-[0.5rem] font-light lg:text-[2rem]">
                  Powered by
                </p>
                <div className="flex items-center">
                  <Image
                    alt="orbis"
                    src={orbisBig.src}
                    width={80}
                    height={30}
                  />
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
