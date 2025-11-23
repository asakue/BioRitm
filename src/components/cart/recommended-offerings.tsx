'use client';

import { useEffect, useState } from 'react';
import { Lightbulb } from 'lucide-react';
import { getRecommendedOfferings } from '@/lib/actions';
import type { CartItem } from '@/lib/types';
import { Skeleton } from '../ui/skeleton';

export function RecommendedOfferings({ items }: { items: CartItem[] }) {
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendations = async () => {
      setLoading(true);
      const result = await getRecommendedOfferings(items);
      setRecommendations(result);
      setLoading(false);
    };

    if (items.length > 0) {
      fetchRecommendations();
    } else {
      setRecommendations([]);
    }
  }, [items]);

  if (loading) {
    return (
      <div className="p-4 bg-secondary/50 rounded-lg space-y-2">
         <Skeleton className="h-4 w-1/2" />
         <Skeleton className="h-3 w-3/4" />
         <Skeleton className="h-3 w-2/3" />
      </div>
    )
  }

  if (recommendations.length === 0) {
    return null;
  }

  return (
    <div className="p-4 bg-secondary/50 rounded-lg">
      <h5 className="flex items-center text-sm font-semibold mb-2 font-headline">
        <Lightbulb className="h-4 w-4 mr-2 text-primary" />
        You might also like...
      </h5>
      <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
        {recommendations.map((rec, index) => (
          <li key={index}>{rec}</li>
        ))}
      </ul>
    </div>
  );
}
