/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import Router, { useRouter } from 'next/router';
import { useCreateKey } from '@/hooks/queries/useCreateKey';
import { error } from '@/hooks/useToastify';

export default function Qr() {
  const [link, setLink] = useState<string>('');
  const router = useRouter();
  const { id } = router.query;
  const { mutateAsync } = useCreateKey();
  async function generateQr() {
    try {
      const { data } = await mutateAsync(id as string);
      QRCode.toDataURL('localhost:3000/yoyo/' + data.key, (err, url) => {
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
      <div className="bg-gray-900 w-full h-screen min-h-fullscreen flex items-center justify-center relative z-10">
        <div className="md:space-x-16 flex flex-col items-center justify-center md:flex-row space-y-8 md:space-y-0 py-5 md:py-0">
          <div className="flex justify-center items-center flex-col text-white space-y-4">
            <img
              className="w-[200px] rounded-md drop-shadow-xl shadow-sm shadow-gray-800"
              src={link}
              alt="qrToMint"
            />
          </div>
        </div>
      </div>
    </>
  );
}
