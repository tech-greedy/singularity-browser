import Link from "next/link";
import { useEffect, useState } from "react";

export default function DatasetsPage({ datasets }: any) {
  
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    if (Array.isArray(datasets)) {
      setData(datasets);
    }
  }, [datasets])
  
  return (
    <div className="p-6">
      <p>Currently the system contains the following datasets:</p>
      <ul>
        {data.length > 0 && data.map((ds: any) => (
          <li key={ds._id}>
            <Link href={'/dataset/' + ds._id}>
              <a className="m-4 text-indigo-600 hover:text-indigo-900">{ds.name}</a>
            </Link>
            |
            <Link href={'/dataset/' + ds._id + '/deals'}>
              <a className="m-4 text-indigo-600 hover:text-indigo-900">See deals</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export async function getServerSideProps() {
  let res = await fetch(`${process.env.BACKEND_URL}/api/dataset`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  let datasets = await res.json();

  return {
    props: { datasets },
  };
}
