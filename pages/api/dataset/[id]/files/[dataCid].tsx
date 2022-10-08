import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../../../lib/mongodb";

/**
 * Get a dataCID and the unixfs files inside
 */
export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const client = await clientPromise;
        const db = client.db();

        const { id, dataCid } = req.query;

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
            const car = await db
                .collection("generationrequests")
                .findOne({ datasetId: id, dataCid: dataCid });

            if (!car) {
                res.status(404).json({ message: `Car not found with dataCID ${dataCid}` });
            } else {
                const files: any = [];

                const unixfss: any = await db
                    .collection("outputfilelists")
                    .find({ generationId: car._id.toString() })
                    .toArray();

                if(unixfss.length>0) {
                    for (let i = 0; i < unixfss[0]['generatedFileList'].length; i++) {
                        const fs = unixfss[0]['generatedFileList'][i];
                        if (!fs['dir']) {
                            files.push({
                                path: fs['path'],
                                cid: fs['cid'],
                                size: fs['size'],
                                start: fs['start'],
                                end: fs['end']
                            })
                        }
                    }
                }

                res.json(files);
            }

        } else {
            res.status(404).json({ message: `Dataset not found with ID ${id}` });
        }
    } catch (e) {
        console.error(e);
    }
};