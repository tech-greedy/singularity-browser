import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../lib/mongodb";

/**
 * List of datasets
 */
export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const client = await clientPromise;
        const db = client.db();

        const datasets = await db
            .collection("scanningrequests")
            .find({})
            .project({ name: 1, scanned: 1 })
            .sort({ name: 1 })
            .toArray();

        res.json(datasets);
    } catch (e) {
        console.error(e);
    }
};