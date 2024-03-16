import { currently } from "../../database/base";

async function doFetch(id:string): Promise<void> {
    const sendResponse = await fetch(currently.url + id);
    const doResponse = await sendResponse.json();
    return doResponse;
}

export { doFetch };