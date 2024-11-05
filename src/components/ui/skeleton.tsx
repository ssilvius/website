import { Card, CardContent } from '@/components/ui/card';

export const Skeleton = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <div className="mb-6 relative aspect-video bg-gray-200 animate-pulse" />
        <div className="h-8 bg-gray-200 rounded mb-2 animate-pulse" />
        <div className="flex items-center gap-4 text-sm text-gray-200 animate-pulse">
          <div className="h-6 w-6 rounded-full bg-gray-200 animate-pulse" />
          <div className="h-6 w-24 bg-gray-200 rounded animate-pulse" />
          <div className="h-6 w-20 bg-gray-200 rounded animate-pulse" />
          <div className="h-6 w-16 bg-gray-200 rounded animate-pulse" />
        </div>
      </header>
      <Card className="my-6">
        <CardContent className="p-4">
          <div className="space-y-4">
            <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse" />
            <div className="h-4 bg-gray-200 rounded w-full animate-pulse" />
            <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
