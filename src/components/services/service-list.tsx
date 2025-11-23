import { products } from '@/lib/products';
import { ServiceCard } from './service-card';
import { Dumbbell } from 'lucide-react';

export function ServiceList() {
  return (
    <section id="services" className="py-16 lg:py-24">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-headline mb-2">Our Services</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Choose from a range of services designed to help you achieve your wellness goals, tailored to your needs.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ServiceCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
