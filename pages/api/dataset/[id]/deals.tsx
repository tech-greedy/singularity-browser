import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../../lib/mongodb";

type FindCondition = {
    datasetId: string,
    state: string,
    dataCid? : string
}

/**
 * Get paged deals by dataset (required)
 */
export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const client = await clientPromise;
        const db = client.db();

        const perPage = 50;
        const { id, page, dataCid } = req.query;
        if (!id) {
            return res.status(400).json({ message: `Dataset is empty` });
        }
        const datasetId: string = Array.isArray(id) ? id[0] : id;

        let pageNumber = 1;
        if (page) {
            pageNumber = Math.max(1, parseInt(Array.isArray(page) ? page[0] : page));
        }

        const findCondition: FindCondition = { datasetId: datasetId, state: 'active' };

        if (dataCid) {
            findCondition.dataCid = dataCid? dataCid[0]: dataCid;
        }

        const count = await db
            .collection("dealstates")
            .countDocuments(findCondition);

        const deals = await db
            .collection("dealstates")
            .find(findCondition)
            .sort({ dealId: -1 })
            .limit(perPage)
            .skip((pageNumber - 1) * perPage)
            .toArray();

        if (deals) {
            res.json({
                count,
                deals,
                perPage,
                page: pageNumber
            });
        } else {
            res.status(404).json({ message: `Deals not found with dataset ID ${datasetId}` });
        }
    } catch (e) {
        console.error(e);
    }
};