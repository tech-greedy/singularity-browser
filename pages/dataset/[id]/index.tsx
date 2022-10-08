import { GetServerSideProps } from "next";

export default function DatasetPage({ dataset }: any) {
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
                                    {dataset.cars.map((car: any) => (
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
                </div>
            </div>
        </div>
    )
}


export const getServerSideProps: GetServerSideProps = async (context) => {
    let res = await fetch(`${process.env.BACKEND_URL}/api/dataset/${context.params?.id}`, {
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
