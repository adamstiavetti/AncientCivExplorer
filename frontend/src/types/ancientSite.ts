import { SiteType } from "./siteType.ts";

export type ancientSite = {
    id?: number;
    name: string;

    teaserDescription: string;
    fullDescription: string;
    infoUrl: string;

    latitude: number;
    longitude: number;
    imageUrl: string;
    era: string;
    region: string;

    yearBuilt: number;
    discoveryYear: string;
    credibilityLevel: string;

    isAlternative: boolean;
    isUserSubmitted: boolean;
    isDeleted: boolean;

    siteType?: SiteType;
    siteTypeId: number;

    createdAt?: string;
}
