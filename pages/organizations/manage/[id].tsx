import { MemberTable } from '@/components/Members/MemberTable';
import { useRouter } from 'next/router';
import React from 'react';

const Manage = () => {
  const router = useRouter();
  const { id } = router.query;

  return <MemberTable organizationId={id as string} />;
};

export default Manage;
