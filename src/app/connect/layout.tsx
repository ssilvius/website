import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Connect | sean.silvius.me',
  description: 'Schedule time with Sean for mentoring, advisory, or coaching sessions.',
};

export default function ConnectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}