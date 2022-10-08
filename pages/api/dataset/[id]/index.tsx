import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../../lib/mongodb";

/**
 * Get a single dataset as well as its cars
 */
export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const client = await clientPromise;
        const db = client.db();

        const { id, page } = req.query;
        const perPage = 50;
        let pageNumber = 1;
        if (page) {
            pageNumber = Math.max(1, parseInt(Array.isArray(page) ? page[0] : page));
        }

        const dataset = await db
            .collection("scanningrequests")
            .findOne(
                { _id: new ObjectId(id + '') },
                {
                    projection:
                        { name: 1, scanned: 1 }
                }
            );

        if (dataset) {
            // get files (generationrequests)
            const total = await db
                .collection("generationrequests")
                .count({ datasetId: id, status: 'completed' })

            const cars = await db
                .collection("generationrequests")
                .find({ datasetId: id, status: 'completed' })
                .project({
                    dataCid: 1,
                    pieceCid: 1,
                    carSize: 1
                })
                .limit(perPage)
                .skip((pageNumber - 1) * perPage)
                .toArray();

            res.json({
                dataset, 
                cars, 
                pager: {
                    pageNumber: pageNumber,
                    perPage: perPage,
                    total: total
                }
            });
        } else {
            res.status(404).json({ message: `Dataset not found with ID ${id}` });
        }
    } catch (e) {
        console.error(e);
    }
};