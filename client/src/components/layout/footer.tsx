import { Building2, Facebook, Twitter, Linkedin, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-primary text-gray-300 pt-16 pb-8 border-t-4 border-secondary">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Building2 className="w-8 h-8 text-secondary" />
              <span className="font-display font-bold text-2xl text-white uppercase">
                Apex<span className="text-secondary">Construct</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed text-gray-400">
              Building the future with precision, integrity, and excellence. Your trusted partner in commercial and residential development.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-6 font-display uppercase tracking-wider text-sm">Company</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="/about" className="hover:text-secondary transition-colors">About Us</a></li>
              <li><a href="/properties" className="hover:text-secondary transition-colors">Our Projects</a></li>
              <li><a href="#" className="hover:text-secondary transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-secondary transition-colors">News & Press</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-bold mb-6 font-display uppercase tracking-wider text-sm">Services</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-secondary transition-colors">Commercial Construction</a></li>
              <li><a href="#" className="hover:text-secondary transition-colors">Residential Development</a></li>
              <li><a href="#" className="hover:text-secondary transition-colors">Property Management</a></li>
              <li><a href="#" className="hover:text-secondary transition-colors">Real Estate Investment</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold mb-6 font-display uppercase tracking-wider text-sm">Contact Us</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-secondary shrink-0" />
                <span>123 Construction Blvd, Suite 100<br />New York, NY 10001</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-secondary shrink-0" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-secondary shrink-0" />
                <span>info@apexconstruct.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-500">© 2024 Apex Construct Inc. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="text-gray-400 hover:text-white transition-colors"><Facebook className="w-5 h-5" /></a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors"><Twitter className="w-5 h-5" /></a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors"><Linkedin className="w-5 h-5" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
