
import { useState, useEffect } from "react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { User, Lock, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
  rememberMe: z.boolean().optional(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const Login = () => {
  const [searchParams] = useSearchParams();
  const typeParam = searchParams.get('type');
  const [isPatient, setIsPatient] = useState(typeParam !== 'clinician');
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Update isPatient state when the URL parameter changes
    setIsPatient(typeParam !== 'clinician');
  }, [typeParam]);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = (data: LoginFormValues) => {
    // This would connect to your backend auth system
    console.log("Login attempted with:", data);
    
    // For now, we'll just mock successful login and redirect
    toast({
      title: "Login Successful",
      description: "Welcome back to MedConnect!",
    });
    
    // Redirect based on user type
    setTimeout(() => {
      navigate(isPatient ? "/patient" : "/clinician");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-blue-600">MedConnect</span>
            </Link>
            <nav className="hidden md:flex space-x-4">
              <a href="#features" className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Features</a>
              <a href="#about" className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">About</a>
              <a href="#contact" className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Contact</a>
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Card className="border-gray-200 shadow-lg">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold text-center">Sign in to MedConnect</CardTitle>
              <CardDescription className="text-center">
                Enter your email and password to access your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <div className="bg-gray-100 rounded-lg p-1 flex mb-6">
                  <button
                    onClick={() => setIsPatient(true)}
                    className={`flex-1 py-2 px-4 rounded-md flex justify-center items-center gap-2 transition-all ${
                      isPatient ? "bg-white shadow-sm" : "text-gray-600"
                    }`}
                  >
                    <User size={18} />
                    Patient
                  </button>
                  <button
                    onClick={() => setIsPatient(false)}
                    className={`flex-1 py-2 px-4 rounded-md flex justify-center items-center gap-2 transition-all ${
                      !isPatient ? "bg-white shadow-sm" : "text-gray-600"
                    }`}
                  >
                    <Lock size={18} />
                    Clinician
                  </button>
                </div>
              </div>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
                            <Input className="pl-10" placeholder="name@example.com" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
                            <Input 
                              className="pl-10" 
                              type="password" 
                              placeholder="••••••••" 
                              {...field} 
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="remember" {...form.register("rememberMe")} />
                      <Label htmlFor="remember" className="text-sm text-gray-500">Remember me</Label>
                    </div>
                    <Button variant="link" className="p-0 h-auto text-sm text-blue-600" type="button">
                      Forgot password?
                    </Button>
                  </div>
                  <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                    Sign in
                  </Button>
                </form>
              </Form>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4 items-center">
              <div className="text-sm text-gray-500">
                Don't have an account yet?{" "}
                <Button variant="link" className="p-0 h-auto text-blue-600">
                  Sign up
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Login;
