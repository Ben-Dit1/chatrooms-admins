import { MemberTable } from '@/components/Members/MemberTable';
import { useRouter } from 'next/router';
import React from 'react';

const Manage = () => {
  const router = useRouter();
  const { id } = router.query;

  return <MemberTable id={id} />;
};

export default Manage;
