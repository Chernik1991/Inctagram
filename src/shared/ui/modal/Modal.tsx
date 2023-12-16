import dynamic from 'next/dynamic'

import { Loader } from '@/src/shared/ui/loader'

export const Modal = dynamic(() => import('./BaseModal'), {
  loading: () => <Loader />,
  ssr: false,
})
