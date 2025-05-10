import {SiteType} from "./siteType.ts";

export type ancientSite = {
    id?: number;
    name: string;
    description: string;
    latitude: number;
    longitude: number;
    image_url: string;
    era: string;
    region: string;
    yearBuilt: number;
    discoveryYear: string;
    credibilityLevel: string;
    isAlternative: boolean;
    siteType?: SiteType;
    siteTypeId: number;
    isUserSubmitted: boolean;
    isDeleted: boolean;
    createdAt?: string;
}