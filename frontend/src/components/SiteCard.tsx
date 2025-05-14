
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {ancientSite} from "../types/ancientSite.ts";
import {useEffect, useState} from "react";
import ancientcivfallback from '../assets/ancientcivfallback.png'
import {fetchBestImage} from "../api/fetchBestImage.ts";


type Props = {
    site: ancientSite;
    onBack: () => void;
}
export default function SiteCard({ site, onBack}: Props){
    const [imageUrl, setImageUrl] = useState(ancientcivfallback);

    // useEffect(() => {
    //     fetchSiteImage(site.name).then(setImageUrl)
    // }, [site.name]);

    useEffect(() => {
        fetchBestImage(site.name).then(setImageUrl);
    }, [site.name]);

    return (
        <Card sx={{ maxHeight: 750, display: 'flex', flexDirection: 'column', width: 360, position: 'absolute', top: 100, right: 20, zIndex: 1000, margin: "0, auto", padding: "0.1em" }}>
            <CardMedia
                src={imageUrl}
                component="img"
                alt={site.name}
                height="100"
                image={imageUrl}
                sx={{
                    padding: "1em 1em 0 1em",
                    objectFit: "cover",
                    width: "100%",
                    // height: 250,
                    borderRadius: "4px",
                    overflow: "hidden",
                }}
            />
            <CardContent sx={{flexGrow: 1, paddingBottom: '1rem'}}>
                <Typography gutterBottom variant="h5" component="div">
                    {site.name}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', whiteSpace: 'normal', wordWrap: 'break-word' }}>
                    {site.fullDescription}
                </Typography>
            </CardContent>
            <CardActions>
                <Button href={site.infoUrl} target="_blank" size="small">Learn More</Button>
                <Button style={{marginLeft: 120}} onClick={onBack}>Back to Map</Button>
            </CardActions>
        </Card>
    );
}
