import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gray-50">
      <div className="text-center p-8 bg-white rounded-2xl shadow-xl max-w-md mx-4">
        <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="h-8 w-8 text-orange-600" />
        </div>
        
        <h1 className="text-4xl font-bold text-gray-900 mb-4 font-display">404</h1>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Page Not Found</h2>
        <p className="text-gray-500 mb-8">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>

        <Link href="/">
          <Button className="w-full h-12 text-lg">
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
