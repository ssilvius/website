import { NavGroup } from './nav-group';
import { getNavigation } from "@/actions/editor/navigation";
import { ErrorState } from './error';

export async function GithubContent() {
  try {
    const data = await getNavigation();

    if (!data?.navMain?.length) {
      return <ErrorState />;
    }

    return (
      <>
        {data.navMain.map((group) => (
          <NavGroup key={group.title} group={group} />
        ))}
      </>
    );
  } catch (error) {
    console.error('Failed to fetch github content:', error);
    return <ErrorState message="Failed to load content" />;
  }
}