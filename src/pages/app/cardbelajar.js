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
import { useRouter } from 'next/router'

export function CardWithForm() {
  const [data, setData] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const router = useRouter(); // Inisialisasi router di dalam komponen

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://api.kontenbase.com/query/api/v1/79297f44-a03f-401b-a2c6-6b7ce1c7866f/Belajar", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${process.env.NEXT_PUBLIC_BEARER_TOKEN}`,
          },
        });

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
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const cards = Array.isArray(data) ? data : [];

  return (
    <div className="flex justify-center">
      {/* <button onClick={() => router.push("/app/materi")}>Kembali</button> */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl h-2">
        {cards.map((item, index) => (
          <Card key={index} className="w-full">
            <CardHeader>
              <CardTitle>{item.Kategori || `Kelas ${index + 1}`}</CardTitle>
              <CardDescription>{item.description || "No description available"}</CardDescription>
              {item.image && (
                <img src={item["image"][0]["url"]} alt={item.Kategori || "Image"} className="w-full h-48 object-cover rounded-md" />
              )}
            </CardHeader>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Cancel</Button>
              <Button onClick={() => router.push(`/app/materi/${item["_id"]}`)}>Belajar</Button>


            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default CardWithForm;
