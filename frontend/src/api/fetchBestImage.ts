

const PEXELS_API_KEY = import.meta.env.VITE_PEXELS_API_KEY;
export const fetchBestImage = async (siteName: string): Promise<string> => {
    try {
        // First: Wikimedia
        const wikiRes = await fetch(
            `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(siteName)}&prop=pageimages&format=json&pithumbsize=600&origin=*`
        );
        const wikiData = await wikiRes.json();
        const page = Object.values(wikiData.query.pages)[0] as any;
        if (page?.thumbnail?.source) {
            return page.thumbnail.source;
        }


        const pexelsRes = await fetch(`https://api.pexels.com/v1/search?query=${encodeURIComponent(siteName)}`, {
            headers: {
                Authorization: PEXELS_API_KEY,
            },
        });
        const pexelsData = await pexelsRes.json();
        const pexelsImage = pexelsData?.photos?.[0]?.src?.medium;
        if (pexelsImage) return pexelsImage;

        // Third: fallback
        return '/assets/ancientcivfallback.png';
    } catch (err) {
        console.error('Image fetch failed', err);
        return '/assets/ancientcivfallback.png';
    }
};
