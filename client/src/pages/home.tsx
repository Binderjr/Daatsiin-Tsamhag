import { useProperties } from "@/hooks/use-properties";
import { PropertyCard } from "@/components/property-card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, Hammer, Users, Trophy } from "lucide-react";

export default function Home() {
  const { data: properties, isLoading } = useProperties();
  const featuredProperties = properties?.slice(0, 3) || [];

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          {/* skyscraper construction site sunset */}
          <img 
            src="https://pixabay.com/get/gaf6599da653e047afa36490d40e682d5c84c8299736a116377fb3a22d10e3ad81b5be46dd1191e044cfbc506b07c92caac7cfdc5be145507c132099a91728a60_1280.jpg" 
            alt="Hero Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-primary/80 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/30 to-primary/90" />
        </div>

        {/* Hero Content */}
        <div className="container relative z-10 px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 font-display animate-in slide-in-from-bottom-5 fade-in duration-700">
            Building Your <span className="text-secondary">Legacy</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-10 max-w-2xl mx-auto font-light animate-in slide-in-from-bottom-5 fade-in duration-700 delay-200">
            Premium commercial and residential developments crafted with precision and excellence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-in slide-in-from-bottom-5 fade-in duration-700 delay-300">
            <Link href="/properties">
              <Button size="lg" variant="construction" className="h-14 px-8 text-lg w-full sm:w-auto">
                Explore Properties
              </Button>
            </Link>
            <Link href="/about">
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg border-white text-white hover:bg-white hover:text-primary w-full sm:w-auto">
                About Our Company
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-secondary text-white">
        <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { label: "Years Experience", value: "25+" },
            { label: "Projects Completed", value: "150+" },
            { label: "Happy Clients", value: "500+" },
            { label: "Awards Won", value: "12" },
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center">
              <span className="text-4xl md:text-5xl font-bold font-display mb-2">{stat.value}</span>
              <span className="text-sm md:text-base font-medium opacity-90 uppercase tracking-widest">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Featured Developments</h2>
              <p className="text-gray-500 max-w-xl">Discover our latest premium listings, available for investment, purchase, or lease.</p>
            </div>
            <Link href="/properties">
              <Button variant="ghost" className="hidden md:flex text-secondary hover:text-secondary/80 font-semibold">
                View All <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-96 bg-gray-200 rounded-xl animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredProperties.map(property => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          )}
          
          <div className="mt-8 text-center md:hidden">
            <Link href="/properties">
              <Button variant="outline" className="w-full">View All Properties</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-24 bg-white relative overflow-hidden">
         <div className="container mx-auto px-4 grid md:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-secondary/10 rounded-full" />
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-primary/5 rounded-full" />
              {/* construction team looking at blueprints */}
              <img 
                src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2070&auto=format&fit=crop" 
                alt="Construction Team" 
                className="relative rounded-2xl shadow-2xl z-10 w-full"
              />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">Master Builders of the Modern World</h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                At ApexConstruct, we don't just build structures; we create environments that inspire. With over two decades of excellence, our team of architects, engineers, and craftsmen are dedicated to delivering perfection in every square foot.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                <div className="flex gap-4 items-start">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <Trophy className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-primary">Award Winning</h4>
                    <p className="text-sm text-gray-500">Recognized globally for design excellence.</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-primary">Expert Team</h4>
                    <p className="text-sm text-gray-500">Industry veterans on every project.</p>
                  </div>
                </div>
              </div>

              <Link href="/about">
                <Button variant="default" className="bg-primary text-white">Learn More About Us</Button>
              </Link>
            </div>
         </div>
      </section>

    </div>
  );
}
