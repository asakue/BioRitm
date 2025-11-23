import { products } from '@/lib/products';
import { ServiceCard } from './service-card';

export function ServiceList() {
  return (
    <section id="services" className="py-16 lg:py-24 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-headline mb-4">Наши услуги</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Выберите из широкого спектра услуг, разработанных для достижения ваших целей в области хорошего самочувствия и адаптированных к вашим потребностям.
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
