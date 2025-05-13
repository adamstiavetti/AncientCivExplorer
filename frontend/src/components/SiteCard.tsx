
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {ancientSite} from "../types/ancientSite.ts";

type Props = {
    site: ancientSite;
    onBack: () => void;
}
export default function SiteCard({ site, onBack}: Props){
    return (
        <Card sx={{ height: 750, width: 260, position: 'absolute', top: 150, right: 20, zIndex: 1000 }}>
            <CardMedia
                component="img"
                alt={site.name}
                height="140"
                image={site.imageUrl}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {site.name}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {site.fullDescription}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Share</Button>
                <Button size="small">Learn More</Button>
                <Button onClick={onBack}>Back to Map</Button>
            </CardActions>
        </Card>
    );
}
