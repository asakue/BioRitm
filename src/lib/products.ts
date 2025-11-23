import type { Product } from './types';

export const products: Product[] = [
  {
    id: 'prod_1',
    name: 'Personal Fitness Training',
    description: 'One-on-one sessions with a certified trainer to achieve your personal fitness goals.',
    price: 75,
    image: 'fitness_training',
  },
  {
    id: 'prod_2',
    name: 'Nutritional Coaching',
    description: 'Expert guidance on diet and nutrition to complement your fitness journey.',
    price: 50,
    image: 'nutrition_coaching',
  },
  {
    id: 'prod_3',
    name: 'Yoga & Mindfulness Course',
    description: 'A 4-week course to enhance flexibility, reduce stress, and improve mental clarity.',
    price: 120,
    image: 'yoga_course',
  },
  {
    id: 'prod_4',
    name: 'Group HIIT Classes',
    description: 'High-Intensity Interval Training classes to boost your metabolism and build strength.',
    price: 25,
    image: 'hiit_class',
  },
  {
    id: 'prod_5',
    name: 'Wellness Retreat Weekend',
    description: 'An immersive weekend of fitness, nutrition, and relaxation in a serene location.',
    price: 450,
    image: 'wellness_retreat',
  },
  {
    id: 'prod_6',
    name: 'Mindset Mastery Program',
    description: 'A comprehensive program to cultivate a positive and resilient mindset.',
    price: 180,
    image: 'mindset_program',
  },
];
