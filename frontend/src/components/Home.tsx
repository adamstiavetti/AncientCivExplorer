import Header from "./Header.tsx";
import Globe from "./Globe.tsx";
import type { GlobeHandle } from "./Globe.tsx"
import { useRef, useState} from "react";
import {SiteCardStack} from "./SiteCardStack.tsx";
import {useNavigate} from "react-router-dom";
import {ancientSite} from "../types/ancientSite.ts";
import SiteCard from "./SiteCard.tsx";
import {deleteAncientSite} from "../services/AncientSiteService.ts";





const Home = () => {
    const navigate = useNavigate();
    const globeRef = useRef<GlobeHandle>(null)
    const [selectedSite, setSelectedSite] = useState<ancientSite | null>(null)


    const handleNavigate = (lat: number, lon: number, site: ancientSite) => {
        globeRef.current?.flyToSite(lat, lon);
        setSelectedSite(site);
    }

    const handleDelete = async (id: number) => {
        try {
            await deleteAncientSite(id);
        } catch (err){
            console.error("Could not delete site")
        }
    }



    return (
        <div>
            <Header/>
            <Globe ref={globeRef}

            />
            {
                selectedSite ? (
                    <SiteCard site={selectedSite} onBack={() => setSelectedSite(null)}/>
                ) : (
                    <SiteCardStack
                        onNavigate={(lat, lon, site) => handleNavigate(lat, lon, site)}
                        onEdit={(id) => navigate(`/edit/${id}`)}
                        site={[]}
                        onDelete={(id) => handleDelete(id)}
                        onSelectSite={setSelectedSite}
                    />
                )
            }
        </div>
    );
};

export default Home;