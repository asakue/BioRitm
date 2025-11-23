'use client';

import { useEffect, useState } from 'react';
import { Lightbulb } from 'lucide-react';
import { getRecommendedOfferings } from '@/lib/actions';
import type { CartItem } from '@/lib/types';
import { Skeleton } from '../ui/skeleton';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from '../ui/dialog';

function RecommendationsContent({
  recommendations,
  loading,
}: {
  recommendations: string[];
  loading: boolean;
}) {
  if (loading) {
    return (
      <div className="p-4 bg-secondary/50 rounded-lg space-y-2">
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-3 w-3/4" />
        <Skeleton className="h-3 w-2/3" />
      </div>
    );
  }

  if (recommendations.length === 0) {
    return null;
  }

  return (
    <div className="p-4 bg-secondary/50 rounded-lg">
      <h5 className="flex items-center text-sm font-semibold mb-2 font-headline">
        <Lightbulb className="h-4 w-4 mr-2 text-primary" />
        Вам также может понравиться...
      </h5>
      <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
        {recommendations.map((rec, index) => (
          <li key={index}>{rec}</li>
        ))}
      </ul>
    </div>
  );
}

export function RecommendedOfferings({ items }: { items: CartItem[] }) {
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!items || items.length === 0) {
      setRecommendations([]);
      setLoading(false);
      return;
    }

    const fetchRecommendations = async () => {
      setLoading(true);
      const result = await getRecommendedOfferings(items);
      setRecommendations(result);
      setLoading(false);
      if (result.length > 0 && isMobile) {
        setDialogOpen(true);
      }
    };

    fetchRecommendations();
  }, [items, isMobile]);

  if (isMobile) {
    return (
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="ghost" className="w-full justify-start p-0 h-auto font-normal text-primary">
            <Lightbulb className="h-4 w-4 mr-2" />
            Показать рекомендации
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Рекомендуемые услуги</DialogTitle>
            <DialogDescription>
              Основываясь на товарах в вашей корзине, мы подобрали несколько услуг, которые могут вас заинтересовать.
            </DialogDescription>
          </DialogHeader>
          <RecommendationsContent recommendations={recommendations} loading={loading} />
        </DialogContent>
      </Dialog>
    );
  }

  return <RecommendationsContent recommendations={recommendations} loading={loading} />;
}
