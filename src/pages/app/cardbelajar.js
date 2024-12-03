import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

export function CardWithForm() {
  const [data, setData] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const router = useRouter();
  const { data: session } = useSession(); // Ambil data session
  const token = session?.user.token; // Ambil token dari session

  React.useEffect(() => {
    if (!token) {
      setError("Token not found. Please log in.");
      setIsLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.kontenbase.com/query/api/v1/79297f44-a03f-401b-a2c6-6b7ce1c7866f/Belajar",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`, // Gunakan token Bearer
            },
          }
        );

        if (!response.ok) {
          throw new Error("Error fetching data");
        }

        const result = await response.json();
        setData(result);
      } catch (err) {
        setError("Error fetching data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [token]); // Dependensi untuk useEffect

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const cards = Array.isArray(data) ? data : [];

  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl">
        {cards.map((item, index) => (
          <Card key={index} className="w-full">
            <CardHeader>
              <CardTitle>{item.Kategori || `Kelas ${index + 1}`}</CardTitle>
              <CardDescription>
                {item.description || "No description available"}
              </CardDescription>
              {item.image && (
                <img
                  src={item["image"][0]["url"]}
                  alt={item.Kategori || "Image"}
                  className="w-full h-48 object-cover rounded-md"
                />
              )}
            </CardHeader>
            <CardFooter className="flex justify-between">
              <Button onClick={() => router.push(`/app/quiz`)}>
                Quiz
              </Button>
              <Button onClick={() => router.push(`/app/materi/${item["_id"]}`)}>
                Belajar
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default CardWithForm;
