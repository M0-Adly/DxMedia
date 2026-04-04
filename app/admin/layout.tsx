import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'لوحة التحكم | Dx Media',
  robots: 'noindex, nofollow',
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
