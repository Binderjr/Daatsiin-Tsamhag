import { useProperty } from "@/hooks/use-properties";
import { useRoute } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { useCreateInvestment } from "@/hooks/use-investments";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { MapPin, Check, DollarSign, Calendar, Move } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

export default function PropertyDetails() {
  const [, params] = useRoute("/properties/:id");
  const id = Number(params?.id);
  const { data: property, isLoading } = useProperty(id);
  const { user, isAuthenticated } = useAuth();
  const { mutate: createInvestment, isPending } = useCreateInvestment();
  const { toast } = useToast();
  
  const [isInvestOpen, setIsInvestOpen] = useState(false);
  const [investmentAmount, setInvestmentAmount] = useState<number>(10000);
  const [unit, setUnit] = useState<'sqft' | 'sqm'>('sqft');

  if (isLoading) return <DetailsSkeleton />;
  if (!property) return <div className="p-20 text-center">Property not found</div>;

  const toggleUnit = () => setUnit(prev => prev === 'sqft' ? 'sqm' : 'sqft');
  
  const displayArea = unit === 'sqft' 
    ? `${property.sqft.toLocaleString()} sq ft`
    : `${Math.round(property.sqft / 10.764).toLocaleString()} sq m`;

  // Google Maps URL
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(property.location)}`;

  const handleInvest = () => {
    if (!isAuthenticated) return;
    
    createInvestment({
      propertyId: property.id,
      amount: investmentAmount,
      userId: user?.id || "",
    }, {
      onSuccess: () => {
        setIsInvestOpen(false);
        toast({
          title: "Investment Request Sent",
          description: "Our team will review your request and contact you shortly.",
        });
      },
      onError: (err) => {
        toast({
          title: "Error",
          description: err.message,
          variant: "destructive",
        });
      }
    });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Image */}
      <div className="relative h-[60vh] bg-gray-900">
        <img 
          src={property.imageUrl} 
          alt={property.title} 
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 text-white">
          <div className="container mx-auto">
             <div className="flex flex-col md:flex-row justify-between items-end gap-6">
                <div>
                  <Badge className="bg-secondary text-white mb-4 text-lg py-1 px-4">{property.status.replace('_', ' ').toUpperCase()}</Badge>
                  <h1 className="text-4xl md:text-5xl font-bold font-display mb-2">{property.title}</h1>
                  <a 
                    href={googleMapsUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-300 hover:text-secondary transition-colors text-lg"
                  >
                    <MapPin className="w-5 h-5" /> {property.location}
                  </a>
                </div>
                <div className="text-right">
                  <p className="text-xl text-gray-300 mb-1">Price</p>
                  <p className="text-4xl md:text-5xl font-bold font-display text-white">
                    ${property.price.toLocaleString()}
                  </p>
                </div>
             </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* Overview */}
            <section>
              <h2 className="text-2xl font-bold text-primary mb-6">Overview</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6 bg-gray-50 rounded-xl border border-gray-100">
                <div className="space-y-1">
                  <p className="text-sm text-gray-500 uppercase tracking-wide">Property Type</p>
                  <p className="font-bold text-lg capitalize">{property.type}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-500 uppercase tracking-wide">Total Area</p>
                  <button onClick={toggleUnit} className="font-bold text-lg flex items-center gap-2 hover:text-secondary transition-colors">
                    {displayArea} <Move className="w-3 h-3 text-gray-400" />
                  </button>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-500 uppercase tracking-wide">Listed Date</p>
                  <p className="font-bold text-lg">{new Date(property.createdAt!).toLocaleDateString()}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-500 uppercase tracking-wide">ID</p>
                  <p className="font-bold text-lg text-gray-400">#{property.id.toString().padStart(4, '0')}</p>
                </div>
              </div>
            </section>

            {/* Description */}
            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">Description</h2>
              <p className="text-gray-600 leading-relaxed text-lg whitespace-pre-line">
                {property.description}
              </p>
            </section>

            {/* Features (Mocked) */}
            <section>
              <h2 className="text-2xl font-bold text-primary mb-6">Features & Amenities</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {['24/7 Security', 'Parking Space', 'Central Heating', 'Elevator', 'Fire Alarm', 'Gym'].map((feature, i) => (
                  <div key={i} className="flex items-center gap-3 text-gray-700">
                    <div className="bg-green-100 p-1 rounded-full">
                       <Check className="w-3 h-3 text-green-600" />
                    </div>
                    {feature}
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white p-6 rounded-xl shadow-xl border border-border/50">
              <h3 className="text-xl font-bold text-primary mb-6">Interested in this property?</h3>
              
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                  <p className="text-sm text-gray-500 mb-1">Estimated Monthly Payment</p>
                  <p className="text-2xl font-bold text-primary">${Math.round(property.price / 240).toLocaleString()}<span className="text-sm font-normal text-gray-400">/mo</span></p>
                </div>

                {!isAuthenticated ? (
                  <div className="bg-blue-50 p-4 rounded-lg text-sm text-blue-800">
                    Please <a href="/api/login" className="font-bold underline">log in</a> to view investment options or schedule a tour.
                  </div>
                ) : (
                   <>
                    <Button onClick={() => setIsInvestOpen(true)} className="w-full h-12 text-lg" variant="construction">
                      Invest Now
                    </Button>
                    <Button variant="outline" className="w-full h-12 text-lg">
                      Schedule Tour
                    </Button>
                   </>
                )}

                <div className="pt-6 border-t border-gray-100 mt-6">
                  <div className="flex items-center gap-4">
                     <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                        <span className="font-bold text-gray-500">AC</span>
                     </div>
                     <div>
                       <p className="font-bold text-gray-900">Apex Agent</p>
                       <p className="text-sm text-gray-500">Licensed Broker</p>
                     </div>
                  </div>
                  <Button variant="ghost" className="w-full mt-4 text-primary hover:text-primary hover:bg-primary/5">
                    Contact Agent
                  </Button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Investment Dialog */}
      <Dialog open={isInvestOpen} onOpenChange={setIsInvestOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Invest in {property.title}</DialogTitle>
            <DialogDescription>
              Enter the amount you wish to invest. Minimum investment is $10,000.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-6">
             <label className="block text-sm font-medium text-gray-700 mb-2">Investment Amount (USD)</label>
             <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input 
                  type="number" 
                  min="10000"
                  step="1000"
                  value={investmentAmount}
                  onChange={(e) => setInvestmentAmount(Number(e.target.value))}
                  className="w-full pl-10 pr-4 py-3 rounded-md border border-input text-lg font-bold"
                />
             </div>
             <p className="text-xs text-gray-500 mt-2">
               By proceeding, you agree to our investment terms and conditions.
             </p>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsInvestOpen(false)}>Cancel</Button>
            <Button onClick={handleInvest} disabled={isPending}>
              {isPending ? "Processing..." : "Confirm Investment"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function DetailsSkeleton() {
  return (
    <div className="min-h-screen bg-white">
      <Skeleton className="h-[60vh] w-full" />
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
           <div className="lg:col-span-2 space-y-8">
             <Skeleton className="h-12 w-1/3" />
             <Skeleton className="h-64 w-full rounded-xl" />
             <Skeleton className="h-40 w-full rounded-xl" />
           </div>
           <div className="lg:col-span-1">
             <Skeleton className="h-96 w-full rounded-xl" />
           </div>
        </div>
      </div>
    </div>
  );
}
