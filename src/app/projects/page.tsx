import { Metadata } from 'next';
import Projects from '@/components/Projects';

export const metadata: Metadata = {
  title: 'Projects | My Portfolio',
  description: 'Explore all my projects and work',
};

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-gray-900">
      <Projects showAll={true} />
    </div>
  );
}