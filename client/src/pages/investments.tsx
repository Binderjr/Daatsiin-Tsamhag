import { useInvestments } from "@/hooks/use-investments";
import { useAuth } from "@/hooks/use-auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Clock, CheckCircle } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function Investments() {
  const { user } = useAuth();
  const { data: investments, isLoading, error } = useInvestments();

  if (!user) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
       <div className="text-center">
         <h1 className="text-2xl font-bold mb-4">Please log in to view investments</h1>
         <Link href="/api/login"><Button>Login</Button></Link>
       </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-primary mb-2">My Investments</h1>
        <p className="text-gray-500 mb-8">Track your portfolio performance and history.</p>
        
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
           <Card className="bg-primary text-white border-none">
             <CardHeader className="pb-2">
               <CardTitle className="text-sm font-medium opacity-80 text-white">Total Invested</CardTitle>
             </CardHeader>
             <CardContent>
               <div className="text-3xl font-bold">
                 ${investments?.reduce((acc, curr) => acc + curr.amount, 0).toLocaleString() || 0}
               </div>
             </CardContent>
           </Card>
           
           <Card>
             <CardHeader className="pb-2">
               <CardTitle className="text-sm font-medium text-gray-500">Active Investments</CardTitle>
             </CardHeader>
             <CardContent>
               <div className="text-3xl font-bold text-gray-900">{investments?.length || 0}</div>
             </CardContent>
           </Card>

           <Card>
             <CardHeader className="pb-2">
               <CardTitle className="text-sm font-medium text-gray-500">Projected Return</CardTitle>
             </CardHeader>
             <CardContent>
               <div className="text-3xl font-bold text-green-600">+12.5%</div>
             </CardContent>
           </Card>
        </div>

        {/* Investment List */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-primary mb-4">Investment History</h2>
          
          {isLoading ? (
            [1, 2].map(i => <Skeleton key={i} className="h-24 w-full rounded-lg" />)
          ) : investments?.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg border border-dashed">
              <p className="text-gray-500 mb-4">You haven't made any investments yet.</p>
              <Link href="/properties?status=for_sale">
                <Button>Browse Opportunities</Button>
              </Link>
            </div>
          ) : (
            investments?.map((inv) => (
              <div key={inv.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                   <div className="bg-secondary/10 p-3 rounded-full">
                      <TrendingUp className="w-6 h-6 text-secondary" />
                   </div>
                   <div>
                     <h3 className="font-bold text-gray-900">Property ID #{inv.propertyId}</h3>
                     <p className="text-sm text-gray-500">{new Date(inv.createdAt!).toLocaleDateString()}</p>
                   </div>
                </div>
                
                <div className="flex items-center gap-8">
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Amount</p>
                    <p className="font-bold text-lg">${inv.amount.toLocaleString()}</p>
                  </div>
                  <div>
                    <Badge variant={inv.status === 'pending' ? 'outline' : 'default'} className="capitalize">
                      {inv.status}
                    </Badge>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
