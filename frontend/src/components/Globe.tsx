import {forwardRef, useImperativeHandle, useRef} from "react";
import { Viewer } from "resium";
import { Viewer as CesiumViewer, Cartesian3 } from "cesium"
import type { CesiumComponentRef } from "resium";

export type GlobeHandle = {
    flyToSite: (lat: number, lon: number) => void;
};

const Globe = forwardRef<GlobeHandle>((_, ref) => {
    const viewerRef = useRef<CesiumComponentRef<CesiumViewer>>(null);

    useImperativeHandle(ref, () => ({
        flyToSite: (lat,lon) => {
            const viewer = viewerRef.current?.cesiumElement;
            if (viewer) {
                viewer.camera.flyTo({
                    destination: Cartesian3.fromDegrees(lon, lat, 1000),
                    duration: 3,
                });
            }
        },
    }));

    return (
        <>
        <div style={{ height: "calc(100vh - 64px)", width: "100vw", marginTop: "64px" }}>
            <Viewer
                ref={viewerRef}
                full
                terrainProvider={undefined}
                animation={false}
                timeline={false}
                navigationHelpButton={false}
                baseLayerPicker={false}
                geocoder={false}
                sceneModePicker={false}
                homeButton={false}
                fullscreenButton={false}
            />
        </div>
        </>
    );
})

export default Globe
