import Layout from "@/components/layout/adminLayout";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

export default function ErrorSubjects({ error }) {
  return (
    <Layout>
      <div className="flex flex-col justify-center items-center h-full text-center p-6">
        <AlertTriangle className="text-red-500 mb-4" size={64} />
        <h2 className="text-2xl font-bold text-red-600 mb-2">
          Failed to Load Subjects
        </h2>
        <p className="text-gray-600 mb-4">
          {error.message || "An unexpected error occurred"}
        </p>
        <Button onClick={() => window.location.reload()} variant="destructive">
          Try Again
        </Button>
      </div>
    </Layout>
  );
}
