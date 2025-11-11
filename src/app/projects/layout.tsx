import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projects | My Portfolio',
  description: 'Explore all my projects and work',
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
    </>
  );
}
