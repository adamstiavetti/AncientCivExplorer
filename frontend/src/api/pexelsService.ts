

const PEXELS_API_KEY = import.meta.env.VITE_PEXELS_API_KEY;

export const fetchSiteImage = async (siteName: string): Promise<string> => {
    try {
        const response = await fetch(`https://api.pexels.com/v1/search?query=${encodeURIComponent(siteName)}&per_page=1`, {
            headers: {
                Authorization: PEXELS_API_KEY,
            },
        });

        const data = await response.json();
        return data.photos?.[0]?.src?.medium || '/fallback.jpg';
    } catch (error) {
        console.error("Error fetching site image", error);
        return '/fallback.jpg'
    }
}