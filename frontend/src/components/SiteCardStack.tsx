import { VariableSizeList as List } from 'react-window';
import { useEffect, useRef, useState } from 'react';
import { Accordion, AccordionActions, AccordionDetails, AccordionSummary, Button, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ancientSite } from '../types/ancientSite.ts';
import { fetchAncientSites } from '../services/AncientSiteService.ts';
const ITEM_HEIGHT = 60;
const EXPANDED_HEIGHT = 200;

type Props = {
    ancientSite: ancientSite[]
    onNavigate: (lat: number, lon: number) => void;
    onEdit: (id: number | undefined) => void;
};

export const SiteCardStack = ({ onNavigate, onEdit }: Props) => {
    const listRef = useRef<List>(null);
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
    const [sites, setSites] = useState<ancientSite[]>([]);

    useEffect(() => {
        fetchAncientSites().then(setSites);
    }, []);

    const getItemSize = (index: number) =>
        index === expandedIndex ? EXPANDED_HEIGHT : ITEM_HEIGHT;

    const handleToggle = (index: number) => {
        setExpandedIndex(prev => { const next = prev === index ? null : index;
        requestAnimationFrame(() => {
            listRef.current?.resetAfterIndex(index);
        });
        return next;
        })
    };

    const Row = ({ index, style }: { index: number; style: React.CSSProperties }) => {
        const site = sites[index];
        return (
            <div style={style} key={site.id}>
                <Accordion
                    expanded={expandedIndex === index}
                    onChange={() => handleToggle(index)}
                >
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>{site.name}</Typography>
                    </AccordionSummary>
                    <AccordionDetails style={{ whiteSpace: 'normal', overflowWrap: 'break-word' }}>
                        {site.description}
                    </AccordionDetails>
                    <AccordionActions>
                        <Button onClick={() => onEdit(site.id)} style={{marginRight: '70px'}}>Edit</Button>
                        <Button onClick={() => onNavigate(site.latitude, site.longitude)}>
                            Navigate
                        </Button>
                    </AccordionActions>
                </Accordion>
            </div>
        );
    };

    return (
        <div style={{ height: 400, width: 260, position: 'absolute', top: 150, right: 0, zIndex: 1000,  }}>

            <List
                height={600}
                width={240}
                itemCount={sites.length}
                itemSize={getItemSize}
                itemData={""}
                ref={listRef}
                style={{ color: "black", backgroundColor: "black",}}
            >
                {Row}
            </List>
        </div>
    );
};

