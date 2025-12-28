import { useProperties } from "@/hooks/use-properties";
import { PropertyCard } from "@/components/property-card";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Filter, Search } from "lucide-react";

export default function Properties() {
  const [location] = useLocation();
  const searchParams = new URLSearchParams(window.location.search);
  const statusFilter = searchParams.get('status') || undefined;
  
  const { data: properties, isLoading, error } = useProperties({ status: statusFilter });

  const getTitle = () => {
    if (statusFilter === 'for_rent') return "Properties For Rent";
    if (statusFilter === 'for_sale') return "Investment Opportunities";
    return "All Properties";
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-primary text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-display font-bold mb-4">{getTitle()}</h1>
          <p className="text-gray-300 max-w-2xl">
            Explore our diverse portfolio of residential and commercial properties, built with the highest standards of quality and design.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Toolbar */}
        <div className="flex flex-col md:flex-row gap-4 mb-8 justify-between items-center bg-white p-4 rounded-lg shadow-sm border border-gray-100">
           <div className="flex gap-2 w-full md:w-auto">
             <Button variant="outline" className="flex-1 md:flex-none">
               <Filter className="w-4 h-4 mr-2" /> Filter
             </Button>
             <Button variant="outline" className="flex-1 md:flex-none">
               Sort By
             </Button>
           </div>
           <div className="relative w-full md:w-96">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
             <input 
               type="text" 
               placeholder="Search locations, types..." 
               className="w-full pl-10 pr-4 py-2 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
             />
           </div>
        </div>

        {/* Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
             {[1,2,3,4,5,6].map(i => (
               <div key={i} className="bg-white rounded-xl h-[400px] shadow-sm border border-gray-100 overflow-hidden">
                 <Skeleton className="h-[250px] w-full" />
                 <div className="p-6 space-y-4">
                   <Skeleton className="h-6 w-3/4" />
                   <Skeleton className="h-4 w-1/2" />
                   <Skeleton className="h-10 w-full" />
                 </div>
               </div>
             ))}
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <h3 className="text-xl font-bold text-red-500 mb-2">Failed to load properties</h3>
            <p className="text-gray-500">Please try again later.</p>
          </div>
        ) : properties?.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-lg border border-dashed border-gray-300">
            <h3 className="text-xl font-bold text-gray-900 mb-2">No properties found</h3>
            <p className="text-gray-500">Try adjusting your filters or check back later.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties?.map(property => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
