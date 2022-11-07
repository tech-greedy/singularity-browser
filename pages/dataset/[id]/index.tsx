import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Pager from "../../../components/Pager";

export default function DatasetPage({ dataset }: any) {

    const [cids, setCids] = useState<any>([]);

    const router = useRouter();

    useEffect(() => {
      if(Array.isArray(dataset.cars)) {
        setCids(dataset.cars);
      }
    }, [dataset])
    
    // Triggers fetch for new page
    const handlePagination = (page: number) => {
      const path = router.pathname
      const query = router.query
      query.page = page + "";
      router.push({
        pathname: path,
        query: query,
      })
    }
    
    return (
        <div className="px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h1 className="text-xl font-semibold text-gray-900">Dataset - {dataset.dataset.name}</h1>
                    <p className="mt-2 text-sm text-gray-700">
                        A list of all the CIDs (CAR files) in this dataset
                    </p>
                </div>
            </div>
            <div className="mt-8 flex flex-col">
                <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full align-middle">
                        <div className="overflow-hidden shadow-sm ring-1 ring-black ring-opacity-5">
                            <table className="min-w-full w-full divide-y divide-gray-300">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th
                                            scope="col"
                                            className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 lg:pl-8"
                                        >
                                            Data CID
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Piece CID
                                        </th>
                                        <th scope="col" className="py-3.5 pl-3 pr-4 sm:pr-6 lg:pr-8">
                                            Files
                                        </th>
                                        <th scope="col" className="py-3.5 pl-3 pr-4 sm:pr-6 lg:pr-8">
                                            Deals
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {cids.length > 0 && cids.map((car: any) => (
                                        <tr key={car._id}>
                                            <td className="py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8">
                                                {car.dataCid}
                                            </td>
                                            <td className="px-3 py-4 text-sm text-gray-500">{car.pieceCid}</td>
                                            <td className="py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 lg:pr-8">
                                                <a href={'/dataset/' + dataset.dataset._id + '/files/' + car.dataCid} className="text-indigo-600 hover:text-indigo-900">
                                                    Files
                                                </a>
                                            </td>
                                            <td className="py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 lg:pr-8">
                                                <a href={'/dataset/' + dataset.dataset._id + '/deals?dataCid=' + car.dataCid} className="text-indigo-600 hover:text-indigo-900">
                                                    Deals
                                                </a>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
                        <Pager currentPage={dataset.pager.pageNumber} perPage={dataset.pager.perPage} total={dataset.pager.total} onPageChange={handlePagination} />
                    </div>
                </div>
            </div>
        </div>
    )
}


export const getServerSideProps: GetServerSideProps = async ( { query }) => {
    const page = query.page || 1
    console.log(page)
    let res = await fetch(`${process.env.BACKEND_URL}/api/dataset/${query.id}?page=${page}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    let dataset = await res.json();

    return {
        props: { dataset },
    };
}
