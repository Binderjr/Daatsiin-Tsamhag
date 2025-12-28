import { Link } from "wouter";
import { type Property } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { MapPin, Bed, Bath, Move, ArrowRight, Tag } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

interface PropertyCardProps {
  property: Property;
}

export function PropertyCard({ property }: PropertyCardProps) {
  const [unit, setUnit] = useState<'sqft' | 'sqm'>('sqft');
  
  const toggleUnit = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setUnit(prev => prev === 'sqft' ? 'sqm' : 'sqft');
  };

  const displayArea = unit === 'sqft' 
    ? `${property.sqft.toLocaleString()} sq ft`
    : `${Math.round(property.sqft / 10.764).toLocaleString()} sq m`;

  const statusColor = property.status === 'for_sale' ? 'bg-secondary' : 'bg-primary';
  const statusLabel = property.status.replace('_', ' ').toUpperCase();

  return (
    <div className="group bg-white rounded-xl shadow-lg border border-border/50 overflow-hidden hover:shadow-2xl hover:border-secondary/30 transition-all duration-300 flex flex-col h-full">
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden">
        {/* Descriptive HTML comment for Unsplash */}
        {/* modern architecture building exterior */}
        <img 
          src={property.imageUrl} 
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-4 left-4">
          <Badge className={`${statusColor} text-white font-bold shadow-lg border-none`}>
            {statusLabel}
          </Badge>
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 pt-12">
          <p className="text-2xl font-bold text-white font-display">
            ${property.price.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-gray-900 mb-2 font-display group-hover:text-primary transition-colors line-clamp-1">
          {property.title}
        </h3>
        
        <div className="flex items-center gap-2 text-gray-500 mb-4 text-sm">
          <MapPin className="w-4 h-4 text-secondary shrink-0" />
          <span className="line-clamp-1">{property.location}</span>
        </div>

        <p className="text-gray-600 text-sm line-clamp-2 mb-6 flex-grow">
          {property.description}
        </p>

        {/* Specs */}
        <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-sm text-gray-600 mb-6 py-4 border-y border-gray-100">
          <div className="flex items-center gap-2">
            <Tag className="w-4 h-4 text-secondary" />
            <span className="capitalize">{property.type}</span>
          </div>
          <div className="flex items-center gap-2 cursor-pointer hover:text-primary transition-colors" onClick={toggleUnit}>
            <Move className="w-4 h-4 text-secondary" />
            <span>{displayArea}</span>
          </div>
        </div>

        <Link href={`/properties/${property.id}`} className="w-full">
          <Button className="w-full group-hover:bg-primary group-hover:text-white transition-colors">
            View Details <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
