
import { useParams } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { getCampaigns, type Campaign } from "@/store/campaignStore";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Spendenschema zur Validierung
const donationSchema = z.object({
  amount: z.string().refine((val) => {
    const num = parseFloat(val);
    return !isNaN(num) && num > 0;
  }, {
    message: "Bitte geben Sie einen gültigen Betrag ein.",
  }),
  paymentMethod: z.enum(["paypal", "credit_card"]),
});

type DonationFormValues = z.infer<typeof donationSchema>;

const CampaignDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showDonationForm, setShowDonationForm] = useState(false);
  const { toast } = useToast();

  const form = useForm<DonationFormValues>({
    resolver: zodResolver(donationSchema),
    defaultValues: {
      amount: "10",
      paymentMethod: "paypal",
    },
  });

  useEffect(() => {
    // Simulate loading
    setIsLoading(true);
    setTimeout(() => {
      const allCampaigns = getCampaigns();
      const foundCampaign = allCampaigns.find(c => c.id === id);
      
      if (foundCampaign) {
        setCampaign(foundCampaign);
      }
      
      setIsLoading(false);
    }, 500);
  }, [id]);

  const handleBackProject = () => {
    setShowDonationForm(true);
  };

  const onDonationSubmit = (data: DonationFormValues) => {
    // Simulation einer PayPal-Weiterleitung
    if (data.paymentMethod === "paypal") {
      toast({
        title: "Sie werden zu PayPal weitergeleitet...",
        description: "Dies ist eine Demo. In einer echten Anwendung würden Sie zu PayPal weitergeleitet werden.",
      });
      
      // Simuliere eine Verzögerung für die "PayPal-Zahlung"
      setTimeout(() => {
        toast({
          title: "Vielen Dank für Ihre Unterstützung!",
          description: `Sie haben ${data.amount}€ über PayPal gespendet.`,
        });
        setShowDonationForm(false);
      }, 2000);
    } else {
      toast({
        title: "Vielen Dank für Ihre Unterstützung!",
        description: "Dies ist ein Demo-Projekt, es werden keine tatsächlichen Zahlungen verarbeitet.",
      });
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto py-8 px-4">
          <div className="flex justify-center items-center h-64">
            <div className="animate-pulse text-center">
              <div className="h-8 bg-gray-200 rounded w-48 mb-4 mx-auto"></div>
              <div className="h-4 bg-gray-200 rounded w-64 mb-2 mx-auto"></div>
              <div className="h-4 bg-gray-200 rounded w-56 mx-auto"></div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!campaign) {
    return (
      <Layout>
        <div className="container mx-auto py-16 px-4 text-center">
          <h1 className="text-3xl font-bold mb-4">Campaign Not Found</h1>
          <p className="mb-6">The campaign you're looking for doesn't exist or has been removed.</p>
          <Link to="/discover">
            <Button>Discover Other Projects</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const percentFunded = Math.min(Math.round((campaign.raisedAmount / campaign.goalAmount) * 100), 100);

  return (
    <Layout>
      <div className="bg-apple-background min-h-screen py-8">
        <div className="container mx-auto px-4">
          <Link to="/discover" className="text-primary hover:underline mb-6 inline-block">
            &larr; Zurück zur Übersicht
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left column - Image and funding details */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-apple-md overflow-hidden">
                <div className="aspect-w-16 aspect-h-9 relative">
                  <img 
                    src={campaign.image} 
                    alt={campaign.title} 
                    className="w-full h-[300px] object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/80 backdrop-blur-md text-sm rounded-full px-3 py-1 font-medium text-gray-700">
                      {campaign.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h1 className="text-3xl font-bold mb-4">{campaign.title}</h1>
                  <p className="text-gray-600 mb-6 whitespace-pre-line">
                    {campaign.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Right column - Funding info and back project */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-apple-md p-6 sticky top-8">
                {!showDonationForm ? (
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-2xl font-bold">${campaign.raisedAmount.toLocaleString()}</h3>
                        <span className="text-gray-500">von ${campaign.goalAmount.toLocaleString()}</span>
                      </div>
                      <Progress value={percentFunded} className="h-2 mb-4" />
                      <div className="grid grid-cols-3 gap-2 text-center">
                        <div>
                          <div className="font-bold text-lg">{percentFunded}%</div>
                          <div className="text-gray-500 text-sm">Finanziert</div>
                        </div>
                        <div>
                          <div className="font-bold text-lg">{campaign.backers}</div>
                          <div className="text-gray-500 text-sm">Unterstützer</div>
                        </div>
                        <div>
                          <div className="font-bold text-lg">{campaign.daysLeft}</div>
                          <div className="text-gray-500 text-sm">Tage übrig</div>
                        </div>
                      </div>
                    </div>

                    <Button 
                      className="w-full py-6 text-lg" 
                      onClick={handleBackProject}
                    >
                      Projekt unterstützen
                    </Button>

                    <div className="text-center text-gray-500 text-sm">
                      Durch die Unterstützung stimmen Sie den Nutzungsbedingungen und der Datenschutzerklärung zu.
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold">Unterstützen Sie dieses Projekt</h3>
                    
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onDonationSubmit)} className="space-y-4">
                        <FormField
                          control={form.control}
                          name="amount"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Spendenbetrag (€)</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="z.B. 10" 
                                  {...field} 
                                  type="number"
                                  min="1"
                                  step="1"
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="paymentMethod"
                          render={({ field }) => (
                            <FormItem className="space-y-3">
                              <FormLabel>Zahlungsmethode</FormLabel>
                              <FormControl>
                                <RadioGroup
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                  className="flex flex-col space-y-1"
                                >
                                  <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl>
                                      <RadioGroupItem value="paypal" />
                                    </FormControl>
                                    <FormLabel className="font-normal cursor-pointer flex items-center">
                                      <img src="https://www.paypalobjects.com/webstatic/mktg/logo/pp_cc_mark_37x23.jpg" alt="PayPal" className="h-6 mr-2" />
                                      PayPal
                                    </FormLabel>
                                  </FormItem>
                                  <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl>
                                      <RadioGroupItem value="credit_card" />
                                    </FormControl>
                                    <FormLabel className="font-normal cursor-pointer">
                                      Kreditkarte
                                    </FormLabel>
                                  </FormItem>
                                </RadioGroup>
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        
                        <div className="flex space-x-3 pt-4">
                          <Button 
                            type="button" 
                            variant="outline" 
                            onClick={() => setShowDonationForm(false)}
                            className="flex-1"
                          >
                            Abbrechen
                          </Button>
                          <Button 
                            type="submit" 
                            className="flex-1"
                          >
                            {form.getValues("paymentMethod") === "paypal" ? "Mit PayPal zahlen" : "Bezahlen"}
                          </Button>
                        </div>
                      </form>
                    </Form>

                    <div className="text-center text-gray-500 text-sm">
                      Sichere Bezahlung über verschlüsselte Verbindung
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CampaignDetails;
