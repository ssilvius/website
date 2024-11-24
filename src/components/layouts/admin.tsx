import { getNavigation } from '@/actions/editor/navigation';
import EditorLayout from '@/components/editor/EditorLayout';

export default async function EditorPage() {
  const { navMain } = await getNavigation();
  
  return <EditorLayout navigation={navMain} />;
}