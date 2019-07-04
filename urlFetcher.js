import { loadDB } from "./mongodb/db";
import { SenateCandidate, Senator, Fara } from "./mongodb/schemas";

export const getSenatorUrls = async () => {
    const db = await loadDB();
    const res = await Senator.find({});
    const urls = res.map((senator) => {
        senator = senator.toObject();
        return { id: senator._id, url: senator.link.url };
    });
        
    await db.disconnect();
    return urls;

};

export const getSenateCandidateUrls = async () => {
    const db = await loadDB();
    const res = await SenateCandidate.find({});
    const urls = res.map((senateCandidate) => {
        senateCandidate = senateCandidate.toObject();
        return { id: senateCandidate._id, url: senateCandidate.link.url };
    });
        
    await db.disconnect();
    return urls;

};

getSenateCandidateUrls()
    .then(res => console.log(res))
    .catch(err => console.log(err));