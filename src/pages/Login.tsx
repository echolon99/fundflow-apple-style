
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import Layout from "@/components/Layout";
import { useAuth } from "@/hooks/useAuth";

const formSchema = z.object({
  email: z.string().email({
    message: "Bitte gib eine gültige E-Mail-Adresse ein.",
  }),
  password: z.string().min(6, {
    message: "Das Passwort muss mindestens 6 Zeichen lang sein.",
  }),
});

const Login = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    
    try {
      await login(values.email, values.password);
      toast({
        title: "Erfolgreich eingeloggt",
        description: "Du bist jetzt angemeldet.",
      });
      
      // Überprüfen, ob der Nutzer von der StartCampaign-Seite umgeleitet wurde
      const redirectPath = new URLSearchParams(window.location.search).get("redirectTo");
      navigate(redirectPath || "/");
    } catch (error) {
      toast({
        title: "Fehler bei der Anmeldung",
        description: "Bitte überprüfe deine Anmeldedaten und versuche es erneut.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold">Anmelden</h1>
            <p className="mt-2 text-gray-600">
              Melde dich an, um deine eigene Kampagne zu erstellen
            </p>
          </div>

          <div className="mt-8 p-6 bg-white rounded-xl shadow-apple-md border border-gray-200/50">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>E-Mail</FormLabel>
                      <FormControl>
                        <Input placeholder="deine@email.de" {...field} />
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
                      <FormLabel>Passwort</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="••••••••" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Anmeldung..." : "Anmelden"}
                </Button>
              </form>
            </Form>

            <div className="mt-6 text-center text-sm">
              <p>
                Noch kein Konto?{" "}
                <Link to="/signup" className="font-medium text-primary hover:underline">
                  Jetzt registrieren
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
