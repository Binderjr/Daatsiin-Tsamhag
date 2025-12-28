import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function About() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <div className="bg-primary text-white py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">Building Excellence Since 1999</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            ApexConstruct is a premier construction and real estate development firm dedicated to reshaping skylines and creating sustainable communities.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-24">
        <div className="grid md:grid-cols-2 gap-16 items-center">
           <div>
             <h2 className="text-3xl font-bold text-primary mb-6">Our Mission</h2>
             <p className="text-gray-600 text-lg leading-relaxed mb-6">
               To deliver world-class construction projects that exceed expectations through innovation, integrity, and unparalleled craftsmanship. We believe in building not just structures, but lasting relationships with our clients and partners.
             </p>
             <p className="text-gray-600 text-lg leading-relaxed mb-8">
               From residential complexes to commercial skyscrapers, our portfolio reflects our commitment to quality and our passion for excellence.
             </p>
             <div className="grid grid-cols-2 gap-8">
                <div>
                   <span className="block text-4xl font-bold text-secondary mb-2">25+</span>
                   <span className="text-gray-500 font-medium">Years of Experience</span>
                </div>
                <div>
                   <span className="block text-4xl font-bold text-secondary mb-2">$500M+</span>
                   <span className="text-gray-500 font-medium">Project Value Delivered</span>
                </div>
             </div>
           </div>
           <div className="relative">
             {/* architect working on blueprints */}
             <img 
               src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2089&auto=format&fit=crop" 
               alt="Our Mission" 
               className="rounded-xl shadow-2xl"
             />
             <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-lg shadow-xl max-w-xs border border-gray-100 hidden md:block">
               <p className="font-display font-bold text-primary text-lg mb-2">"Quality is not an act, it is a habit."</p>
               <p className="text-sm text-gray-500">- Aristotle</p>
             </div>
           </div>
        </div>
      </div>

      {/* Team */}
      <div className="bg-gray-50 py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
             <h2 className="text-3xl font-bold text-primary mb-4">Meet Our Leadership</h2>
             <p className="text-gray-500">The visionaries behind our success.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "John Smith", role: "CEO & Founder", img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop" },
              { name: "Sarah Johnson", role: "Chief Architect", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop" },
              { name: "Michael Chen", role: "Head of Operations", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=800&auto=format&fit=crop" }
            ].map((member, i) => (
              <div key={i} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                 <div className="h-80 overflow-hidden">
                   <img src={member.img} alt={member.name} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
                 </div>
                 <div className="p-6 text-center">
                   <h3 className="font-bold text-xl text-primary">{member.name}</h3>
                   <p className="text-secondary font-medium text-sm uppercase tracking-wide">{member.role}</p>
                 </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="py-24 text-center container mx-auto px-4">
         <h2 className="text-3xl font-bold text-primary mb-6">Ready to start your project?</h2>
         <p className="text-gray-500 mb-8 max-w-2xl mx-auto">Contact us today for a consultation or browse our available properties for investment opportunities.</p>
         <div className="flex gap-4 justify-center">
            <Link href="/properties">
               <Button size="lg" variant="construction">View Projects</Button>
            </Link>
            <Button size="lg" variant="outline">Contact Us</Button>
         </div>
      </div>
    </div>
  );
}
