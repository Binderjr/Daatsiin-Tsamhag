import { useAuth } from "@/hooks/use-auth";
import { useVisitStats } from "@/hooks/use-visits";
import { useProperties, useCreateProperty } from "@/hooks/use-properties";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertPropertySchema } from "@shared/schema";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Users, HardHat, Building, DollarSign, PlusCircle } from "lucide-react";

// Form schema with string coercion for numbers
const formSchema = insertPropertySchema.extend({
  price: z.coerce.number().min(1, "Price must be greater than 0"),
  sqft: z.coerce.number().min(1, "Area must be greater than 0"),
});

type PropertyFormValues = z.infer<typeof formSchema>;

export default function Dashboard() {
  const { user } = useAuth();
  
  if (!user) return <div className="p-8 text-center">Please log in to view dashboard</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-primary mb-1">Dashboard</h1>
            <p className="text-gray-500">Welcome back, {user.firstName || 'User'}</p>
          </div>
          <div className="bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100 flex items-center gap-2">
             <span className="w-2 h-2 rounded-full bg-green-500"></span>
             <span className="text-sm font-medium text-gray-600 capitalize">{user.role} Account</span>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-8">
          <TabsList className="bg-white p-1 rounded-lg border border-gray-200">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            {(user.role === 'admin' || user.role === 'poster') && (
              <TabsTrigger value="properties">Manage Properties</TabsTrigger>
            )}
            {user.role === 'worker' && (
               <TabsTrigger value="tasks">My Tasks</TabsTrigger>
            )}
          </TabsList>

          <TabsContent value="overview">
             <Overview role={user.role} />
          </TabsContent>

          <TabsContent value="properties">
            <PropertyManager />
          </TabsContent>

          <TabsContent value="tasks">
             <WorkerTasks />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function Overview({ role }: { role: string }) {
  const { data: stats } = useVisitStats();
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Conditional stats based on role */}
        {(role === 'admin') && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Site Visits</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.total || 0}</div>
              <p className="text-xs text-muted-foreground">+20.1% from last month</p>
            </CardContent>
          </Card>
        )}
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">3 completing this week</p>
          </CardContent>
        </Card>

        <Card>
           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Tasks</CardTitle>
            <HardHat className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">High priority</p>
          </CardContent>
        </Card>

         <Card>
           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Investments</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$1.2M</div>
            <p className="text-xs text-muted-foreground">+15% ytd growth</p>
          </CardContent>
        </Card>
      </div>

      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>
            Latest system events and updates.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
             {[1, 2, 3].map((i) => (
               <div key={i} className="flex items-center">
                 <div className="space-y-1">
                   <p className="text-sm font-medium leading-none">New Property Listed</p>
                   <p className="text-sm text-muted-foreground">Luxury Villa in Miami was added by Admin.</p>
                 </div>
                 <div className="ml-auto font-medium text-sm text-gray-500">2h ago</div>
               </div>
             ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function PropertyManager() {
  const { mutate, isPending } = useCreateProperty();
  const { toast } = useToast();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<PropertyFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      status: 'for_sale',
      type: 'residential',
    }
  });

  const onSubmit = (data: PropertyFormValues) => {
    mutate(data, {
      onSuccess: () => {
        toast({ title: "Property Created", description: "Successfully added new listing." });
        reset();
      },
      onError: (err) => {
        toast({ title: "Error", description: err.message, variant: "destructive" });
      }
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Add New Property</CardTitle>
            <CardDescription>Create a new listing for the marketplace.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
               <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-2">
                   <Label htmlFor="title">Title</Label>
                   <Input id="title" {...register("title")} placeholder="e.g. Modern Apartment" />
                   {errors.title && <p className="text-xs text-red-500">{errors.title.message}</p>}
                 </div>
                 <div className="space-y-2">
                   <Label htmlFor="price">Price ($)</Label>
                   <Input id="price" type="number" {...register("price")} placeholder="e.g. 250000" />
                   {errors.price && <p className="text-xs text-red-500">{errors.price.message}</p>}
                 </div>
               </div>

               <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-2">
                   <Label htmlFor="location">Location</Label>
                   <Input id="location" {...register("location")} placeholder="e.g. New York, NY" />
                   {errors.location && <p className="text-xs text-red-500">{errors.location.message}</p>}
                 </div>
                 <div className="space-y-2">
                    <Label htmlFor="sqft">Area (Sq Ft)</Label>
                    <Input id="sqft" type="number" {...register("sqft")} placeholder="e.g. 1500" />
                    {errors.sqft && <p className="text-xs text-red-500">{errors.sqft.message}</p>}
                 </div>
               </div>

               <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <select 
                      id="status" 
                      {...register("status")}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                      <option value="for_sale">For Sale</option>
                      <option value="for_rent">For Rent</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="type">Type</Label>
                    <select 
                      id="type" 
                      {...register("type")}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                      <option value="residential">Residential</option>
                      <option value="commercial">Commercial</option>
                      <option value="land">Land</option>
                    </select>
                  </div>
               </div>

               <div className="space-y-2">
                 <Label htmlFor="imageUrl">Image URL (Unsplash)</Label>
                 <Input id="imageUrl" {...register("imageUrl")} placeholder="https://images.unsplash.com/..." />
                 {errors.imageUrl && <p className="text-xs text-red-500">{errors.imageUrl.message}</p>}
               </div>

               <div className="space-y-2">
                 <Label htmlFor="description">Description</Label>
                 <Textarea id="description" {...register("description")} placeholder="Property details..." />
                 {errors.description && <p className="text-xs text-red-500">{errors.description.message}</p>}
               </div>

               <Button type="submit" disabled={isPending} className="w-full">
                 {isPending ? "Creating..." : "Create Listing"}
               </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-1">
        <Card>
          <CardHeader>
            <CardTitle>Recent Listings</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500">List of recently added properties will appear here.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function WorkerTasks() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Assigned Tasks</CardTitle>
        <CardDescription>Manage your daily work orders.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
           {[1, 2, 3].map((i) => (
             <div key={i} className="flex items-center justify-between p-4 border rounded-lg bg-gray-50">
               <div className="flex items-center gap-3">
                 <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary" />
                 <div>
                   <p className="font-medium">Site Inspection - Project A</p>
                   <p className="text-xs text-gray-500">Due Today</p>
                 </div>
               </div>
               <Badge variant="outline">Pending</Badge>
             </div>
           ))}
        </div>
      </CardContent>
    </Card>
  );
}
