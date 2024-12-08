// pages/pelajaran/[id].js

import { useState, useEffect } from 'react';
import axios from 'axios';

const PelajaranPage = ({ pelajaran }) => {
  const [data, setData] = useState(pelajaran);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://api.kontenbase.com/query/api/v1/79297f44-a03f-401b-a2c6-6b7ce1c7866f/Detailbelajar/${data._id}?$lookup=*`);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, [data._id]);

  if (!data) return <div>Loading...</div>;

  return (
    <div className="bg-gradient-to-b from-blue-500 to-blue-800 min-h-screen p-6">
      <h1 className="text-4xl font-bold text-white">{data.Judul}</h1>
      <h2 className="text-2xl text-white mt-2">Kategori: {data.Kategori[0].Kategori}</h2>
      <h3 className="text-xl text-white mt-2">Mapel: {data.Mapel}</h3>
      <p className="text-white mt-4">{data.Pelajaran}</p>
         </div>
  );
};

export default PelajaranPage;

export async function getServerSideProps(context) {
  const { id } = context.params;
  try {
    const response = await axios.get(`https://api.kontenbase.com/query/api/v1/79297f44-a03f-401b-a2c6-6b7ce1c7866f/Detailbelajar/${id}?$lookup=*`);
    return {
      props: {
        pelajaran: response.data,
      },
    };
  } catch (error) {
    console.error("Error fetching data: ", error);
    return {
      props: {
        pelajaran: null,
      },
    };
  }
}
