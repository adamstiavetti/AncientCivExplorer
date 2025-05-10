import {ancientSite} from "../types/ancientSite.ts";
import axios from "axios";

export async function fetchAncientSites(): Promise<ancientSite[]> {
    try {
        const r = await axios.get<ancientSite[]>('/api/sites');
        return r.data;
    } catch (error) {
        console.error("Could not get projects");
        return [];
    }
}

export function createAncientSite(site: ancientSite): Promise<ancientSite> {

    console.log("Site being sent: ", site)

    return axios.post<ancientSite>("http://localhost:8080/api/sites", site)
        .then((response) => response.data)
        .catch((error) => {
            console.error("Could not create ancient site", error);
            throw error;
        });
}

export async function fetchAncientSiteById(id: number): Promise<ancientSite> {
    return axios.get<ancientSite>(`/api/sites/${id}`)
        .then((response) => {
            console.log("Got site by ID:", response.data);
            return response.data;
        })
        .catch((error) => {
            console.error("Could not get the site by id", error);
            throw error;
        });
}


export async function updateAncientSite(site: ancientSite): Promise<ancientSite> {
    if (!site.id) {
        console.error("No Site ID");
        return Promise.reject("Missing Site ID");
    }

    try {
        const response = await axios.put<ancientSite>(`/api/sites/${site.id}`, site);
        return response.data;
    } catch (error) {
        console.error("Could not update site ", error);
        throw error;
    }
}