import Header from "./Header.tsx";
import Globe from "./Globe.tsx";
import type { GlobeHandle } from "./Globe.tsx"
import {useRef} from "react";
import {SiteCardStack} from "./SiteCardStack.tsx";
import {useNavigate} from "react-router-dom";





const Home = () => {
    const navigate = useNavigate();
    const globeRef = useRef<GlobeHandle>(null)

    const handleNavigate = (lat: number, lon: number) => {
        globeRef.current?.flyToSite(lat, lon);
    }
    return (
        <div>
            <Header/>
            <Globe ref={globeRef}/>
            <SiteCardStack onNavigate={handleNavigate} ancientSite={[]} onEdit={(id) => navigate(`/edit/${id}`)}/>
        </div>
    );
};

export default Home;