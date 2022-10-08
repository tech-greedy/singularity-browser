/**
 * List all unixFS entries inside of a CID
 */


import { GetServerSideProps } from "next";

export default function FilesPage({ params, dataArray }: any) {
    return (
        <div className="px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h1 className="text-xl font-semibold text-gray-900">CID - {params.dataCid}</h1>
                    <p className="mt-2 text-sm text-gray-700">
                        A list of all the UnixFS entries (raw files) in this CID
                    </p>
                </div>
            </div>
            <div className="mt-8 flex flex-col">
                <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full align-middle">
                        <div className="overflow-hidden shadow-sm ring-1 ring-black ring-opacity-5">
                            <table className="min-w-full divide-y divide-gray-300">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th
                                            scope="col"
                                            className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 lg:pl-8"
                                        >
                                            Path
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Data CID
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Size
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {dataArray.map((obj: any) => (
                                        <tr key={obj.cid}>
                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8">
                                                {obj.path}
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{obj.cid}</td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{obj.size}</td>
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
    let res = await fetch(`${process.env.BACKEND_URL}/api/dataset/${context.params?.id}/files/${context.params?.dataCid}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    let dataArray = await res.json();

    return {
        props: { params: context.params, dataArray },
    };
}
