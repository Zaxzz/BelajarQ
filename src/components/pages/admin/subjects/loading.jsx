import Layout from "@/components/layout/adminLayout";
import Spinner from "@/components/ui/spinner";

export default function SubjectLoading() {
  return (
    <Layout>
      <div className="flex justify-center items-center h-full font-bold text-xl">
        <Spinner color="text-zinc-600" size="xl" />
      </div>
    </Layout>
  );
}
