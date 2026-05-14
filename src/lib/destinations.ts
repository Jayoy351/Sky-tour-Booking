export type Destination = {
  id: string;
  name: string;
  location: string;
  image: string;
  price: number; // PHP per person, day tour base
  rating: number;
  reviews: number;
  description: string;
  highlights: string[];
};

export const DESTINATIONS: Destination[] = [
  {
    id: "boracay",
    name: "Boracay Island Escape",
    location: "Aklan, Philippines",
    image: "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=1200&q=80",
    price: 3500,
    rating: 4.8,
    reviews: 124,
    description: "Powdery white sand, turquoise waters and unforgettable sunsets on world-famous White Beach.",
    highlights: ["White Beach access", "Island hopping", "Sunset sailing", "Welcome drink"],
  },
  {
    id: "palawan",
    name: "El Nido Lagoon Tour",
    location: "Palawan, Philippines",
    image: "https://images.unsplash.com/photo-1518509562904-e7ef99cddc85?w=1200&q=80",
    price: 4200,
    rating: 4.9,
    reviews: 210,
    description: "Glide through hidden lagoons and limestone cliffs in one of the world's most beautiful seascapes.",
    highlights: ["Big & Small Lagoon", "Snorkeling gear", "Buffet lunch", "Licensed guide"],
  },
  {
    id: "cebu",
    name: "Cebu Whale Shark & Falls",
    location: "Oslob, Cebu",
    image: "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=1200&q=80",
    price: 2800,
    rating: 4.7,
    reviews: 98,
    description: "Swim with gentle whale sharks and chase the cool blue cascades of Kawasan Falls.",
    highlights: ["Whale shark watch", "Kawasan Falls", "Lunch included", "Hotel pickup"],
  },
  {
    id: "bohol",
    name: "Bohol Countryside Day Tour",
    location: "Bohol, Philippines",
    image: "https://images.unsplash.com/photo-1565073624497-7e91b5cc3843?w=1200&q=80",
    price: 2500,
    rating: 4.6,
    reviews: 76,
    description: "Chocolate Hills, tarsiers, and a relaxing Loboc River lunch cruise in one full day.",
    highlights: ["Chocolate Hills", "Tarsier sanctuary", "River cruise", "Heritage stops"],
  },
  {
    id: "siargao",
    name: "Siargao Surf & Island Hop",
    location: "Surigao del Norte",
    image: "https://images.unsplash.com/photo-1559494007-9f5847c49d94?w=1200&q=80",
    price: 3800,
    rating: 4.9,
    reviews: 142,
    description: "Catch waves at Cloud 9 and explore Naked, Daku, and Guyam islands like a local.",
    highlights: ["Cloud 9 surf", "3-island hop", "Coconut lunch", "Drone-ready spots"],
  },
  {
    id: "batanes",
    name: "Batanes Highland Adventure",
    location: "Batanes, Philippines",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80",
    price: 5200,
    rating: 5.0,
    reviews: 64,
    description: "Rolling green hills, stone houses, and the dramatic cliffs of the Philippines' northern frontier.",
    highlights: ["Marlboro hills", "Vayang ridges", "Stone village tour", "Local lunch"],
  },
];

export const peso = (n: number) =>
  new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP", maximumFractionDigits: 0 }).format(n);
