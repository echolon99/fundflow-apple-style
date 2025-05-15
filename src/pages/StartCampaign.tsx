
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import Layout from "@/components/Layout";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { addCampaign } from "@/store/campaignStore";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  title: z.string().min(5, {
    message: "Title must be at least 5 characters.",
  }),
  goal: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Goal must be a positive number.",
  }),
  duration: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Duration must be a positive number.",
  }),
  category: z.string().min(1, {
    message: "Please select a category.",
  }),
  description: z.string().min(50, {
    message: "Description must be at least 50 characters.",
  }),
});

const categories = [
  "Technology",
  "Arts",
  "Film & Video",
  "Music",
  "Design",
  "Games",
  "Food",
  "Publishing",
  "Fashion",
  "Other",
];

const StartCampaign = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [coverImage, setCoverImage] = useState<File | null>(null);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      goal: "",
      duration: "30",
      category: "",
      description: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    
    try {
      // Simulieren einer API-Anfrage
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Generieren einer zufälligen ID
      const newId = Math.random().toString(36).substring(2, 9);
      
      // Erstellen eines Placeholder-Bildes, wenn kein Bild hochgeladen wurde
      const imageUrl = coverImage 
        ? URL.createObjectURL(coverImage)
        : "https://images.unsplash.com/photo-1568992687947-868a62a9f521?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cHJvamVjdHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60";
      
      // Neue Kampagne zum Store hinzufügen
      addCampaign({
        id: newId,
        title: values.title,
        description: values.description,
        image: imageUrl,
        raisedAmount: 0,
        goalAmount: parseInt(values.goal),
        backers: 0,
        daysLeft: parseInt(values.duration),
        category: values.category
      });
      
      toast({
        title: "Campaign created!",
        description: "Your campaign has been successfully created.",
      });
      
      // Formular zurücksetzen
      form.reset();
      setCoverImage(null);
      
      // Zur Discover-Seite navigieren, um die neue Kampagne zu sehen
      navigate("/discover");
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "There was an error creating your campaign. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCoverImage(e.target.files[0]);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold mb-2">Start a Campaign</h1>
            <p className="text-gray-600">
              Share your project with the world and get the funding you need
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-apple-md border border-gray-200/50 p-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Campaign Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter campaign title" {...field} />
                      </FormControl>
                      <FormDescription>
                        Choose a clear, specific title to grab attention.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="goal"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Funding Goal ($)</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="e.g. 10000" {...field} />
                        </FormControl>
                        <FormDescription>
                          How much money do you need?
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="duration"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Campaign Duration (days)</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormDescription>
                          Campaigns under 30 days have the best success rate.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <FormControl>
                        <select
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                          {...field}
                        >
                          <option value="">Select a category</option>
                          {categories.map((category) => (
                            <option key={category} value={category}>
                              {category}
                            </option>
                          ))}
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="space-y-2">
                  <FormLabel>Campaign Cover Image</FormLabel>
                  <div className="flex flex-col items-center p-6 border-2 border-dashed border-gray-300 rounded-md bg-gray-50 hover:bg-gray-100 transition cursor-pointer">
                    <input
                      type="file"
                      id="cover-image"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                    <label htmlFor="cover-image" className="cursor-pointer text-center">
                      {coverImage ? (
                        <>
                          <div className="text-sm text-green-600 mb-2">
                            Image selected: {coverImage.name}
                          </div>
                          <div className="text-xs text-gray-500">
                            Click to change
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="text-sm mb-2">
                            Drag and drop an image, or click to browse
                          </div>
                          <div className="text-xs text-gray-500">
                            Recommended size: 1200 x 675 pixels
                          </div>
                        </>
                      )}
                    </label>
                  </div>
                </div>

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Campaign Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe your campaign in detail..."
                          className="min-h-32"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Tell your story. Why is this project important? What will the funds be used for?
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="pt-4">
                  <Button type="submit" className="w-full md:w-auto" disabled={isSubmitting}>
                    {isSubmitting ? "Creating Campaign..." : "Create Campaign"}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default StartCampaign;
