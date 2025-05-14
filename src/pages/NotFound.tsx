
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";

const NotFound = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16 flex flex-col items-center text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-6">404</h1>
        <h2 className="text-2xl font-medium text-gray-700 mb-8">Page Not Found</h2>
        <p className="text-gray-600 mb-10 max-w-md">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Link to="/">
          <Button size="lg" className="apple-button">
            Back to Homepage
          </Button>
        </Link>
      </div>
    </Layout>
  );
};

export default NotFound;
