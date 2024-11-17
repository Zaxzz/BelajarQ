import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Materi() {
  const router = useRouter();
  const { id } = router.query; // Mengambil parameter id dari URL
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mengambil data dari API berdasarkan ID
  useEffect(() => {
    if (!id) return; // Tunggu hingga id tersedia

    const fetchMateri = async () => {
      try {
        const response = await fetch(`https://api.kontenbase.com/query/api/v1/79297f44-a03f-401b-a2c6-6b7ce1c7866f/Belajar/${id}?$lookup=*`, {
          method: "GET",
          headers: {
        "Authorization": `Bearer ${process.env.NEXT_PUBLIC_BEARER_TOKEN}`,
          },
        });

        if (!response.ok) {
          throw new Error("Gagal mengambil data");
        }

        const result = await response.json();
        console.log("Data yang diterima:", result); // Memeriksa data yang diterima
        setData(result);
      } catch (err) {
        console.error("Terjadi kesalahan:", err);
        setError("Terjadi kesalahan saat mengambil data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMateri();
  }, [id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  // Debugging: Periksa data yang diterima
  if (!data || !data.Detailbelajar || data.Detailbelajar.length === 0) {
    return <div>Tidak ada data yang tersedia</div>;
  }

  // Data materi yang diambil dari data.Detailbelajar
  const materiList = data.Detailbelajar;

  return (
    <div className="flex flex-col items-center p-8">
      <h1 className="text-3xl font-bold mb-4">Halaman Materi</h1>
      <p className="text-lg text-center mb-8">Selamat datang di halaman Materi! Di sini Anda dapat mengakses materi pembelajaran yang tersedia.</p>

      {/* Menampilkan kategori dan deskripsi */}
      <div className="mt-4">
        <h3 className="text-xl font-semibold mb-2">Kategori: {data.Kategori}</h3>
        <p className="text-gray-700">{data.description || "Tidak ada deskripsi tersedia"}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6 justify-center ">
        {materiList.map((item, index) => (
          <div key={index} className="p-6 border rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-2xl font-semibold mb-2">{item.Mapel || `Materi ${index + 1}`}</h2>
            <p className="text-gray-700">ID: {item._id}</p>

            {/* Footer card dengan tombol Pelajari */}
            <div className="mt-4 flex justify-end">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300"
                onClick={() => router.push(`/app/pelajaran`)} // Arahkan ke halaman materi berdasarkan ID
              >
                Pelajari
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 p-6 border rounded-lg shadow-lg bg-gray-100">
        <h2 className="text-2xl font-semibold mb-4">Kesimpulan</h2>
        <p className="text-gray-700">
          Pembelajaran ini akan memberi Anda pemahaman yang lebih baik tentang materi yang telah disajikan. Semoga Anda siap untuk melanjutkan perjalanan belajar Anda!
        </p>
      </div>
    </div>
  );
}
