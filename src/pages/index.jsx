import SeoHead from "@/components/SeoHead";
import Layout from "@/components/layout/Layout";
import Feature from "@/components/Feature";
import Pricing from "@/components/Pricing";
import Hero from "@/components/Hero";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter(); // Inisialisasi useRouter

  const handleRegisterClick = () => {
    router.push("/auth/register"); // Arahkan ke halaman register
  };

  const handleLoginClick = () => {
    router.push("/auth/login"); // Arahkan ke halaman login
  };

  return (
    <>
      <SeoHead title="LaslesVPN Landing Page" />
      <Layout>
        <Hero />
        <Feature />
        <Pricing />
      </Layout>
    </>
  );
}
