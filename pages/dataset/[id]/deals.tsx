/**
 * List all deals in a dataset, or filter by a CID
 */

import { GetServerSideProps } from "next";
import Pager from "../../../components/Pager";

export default function DealsPage({ dealsObj }: any) {
    return (
        <div className="px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h1 className="text-xl font-semibold text-gray-900">Deals</h1>
                    <p className="mt-2 text-sm text-gray-700">
                        Total {dealsObj.count} deals, showing {dealsObj.deals.length} on page {dealsObj.page}
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
                                            Deal ID
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Client
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Provider
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Data CID
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Piece CID
                                        </th>
                                        <th scope="col" className="py-3.5 pl-3 pr-4 sm:pr-6 lg:pr-8">
                                            Files
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {dealsObj.deals.map((obj: any) => (
                                        <tr key={obj.dealId}>
                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8">
                                                {obj.dealId}
                                            </td>
                                            <td className="truncate px-3 py-4 text-sm text-gray-500">{obj.client}</td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{obj.provider}</td>
                                            <td className="truncate px-3 py-4 text-sm text-gray-500">{obj.dataCid}</td>
                                            <td className="truncate px-3 py-4 text-sm text-gray-500">{obj.pieceCid}</td>
                                            <td className="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 lg:pr-8">
                                                <a href={'/dataset/' + obj.datasetId + '/files/' + obj.dataCid} className="text-indigo-600 hover:text-indigo-900">
                                                    Files
                                                </a>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
                        <Pager currentPage={dealsObj.page} perPage={dealsObj.perPage} total={dealsObj.count} urlRoot={'/dataset/' + dealsObj.deals[0].datasetId + '/deals'} />
                    </div>
                </div>
            </div>

        </div>
    )
}


export const getServerSideProps: GetServerSideProps = async (context) => {
    let url = `${process.env.BACKEND_URL}/api/dataset/${context.params?.id}/deals`;
    if (context.query.dataCid) {
        url += `?dataCid=${context.query.dataCid}`;
    }
    if (context.query.page) {
        if (url.indexOf('?') > 0) {
            url += '&';
        } else {
            url += '?';
        }
        url += `page=${context.query.page}`;
    }

    let res = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    let dealsObj = await res.json();

    return {
        props: { dealsObj },
    };
}
