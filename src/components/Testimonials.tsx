
const testimonials = [
  {
    id: 1,
    content: "FundMe helped me raise over $50,000 for my product in just 30 days. The platform was easy to use and the support team was incredibly helpful throughout the process.",
    author: "Sarah Johnson",
    role: "Tech Entrepreneur",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=100&q=80"
  },
  {
    id: 2,
    content: "As a first-time creator, I was worried about launching my campaign. FundMe made it simple and provided all the resources I needed to succeed. My project was fully funded in 2 weeks!",
    author: "Michael Chen",
    role: "Game Developer",
    image: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=100&q=80"
  },
  {
    id: 3,
    content: "The community we built through our FundMe campaign has been instrumental to our success. Even after our campaign ended, those supporters became our first customers and brand advocates.",
    author: "Emma Rodriguez",
    role: "Fashion Designer",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZmlsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=100&q=80"
  }
];

const Testimonials = () => {
  return (
    <div className="bg-gradient-to-b from-blue-50/50 to-white py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold mb-4">Success Stories</h2>
          <p className="text-gray-600 max-w-lg mx-auto">
            Hear from creators who have successfully funded their projects on FundMe
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id} 
              className="apple-card p-6 transition-all duration-300 hover:shadow-apple-md flex flex-col"
            >
              <div className="mb-6 flex-grow">
                <svg className="h-8 w-8 text-gray-300 mb-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <p className="text-gray-600 leading-relaxed">
                  {testimonial.content}
                </p>
              </div>
              
              <div className="flex items-center mt-4">
                <div className="flex-shrink-0">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.author} 
                    className="h-10 w-10 rounded-full object-cover"
                  />
                </div>
                <div className="ml-3">
                  <h4 className="text-sm font-medium">{testimonial.author}</h4>
                  <p className="text-xs text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
