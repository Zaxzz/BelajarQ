import SeoHead from "@/components/SeoHead";
import Layout from "@/components/layout/Layout";
import Feature from "@/components/Feature";
import Pricing from "@/components/Pricing";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <>
      <SeoHead title="BelajarQ" />
      <Layout>
        <Hero />
        <Feature />
        <Pricing />
      </Layout>
    </>
  );
}
