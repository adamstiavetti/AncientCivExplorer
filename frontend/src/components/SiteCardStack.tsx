import { VariableSizeList as List } from 'react-window';
import { useEffect, useRef, useState } from 'react';
import { Accordion, AccordionActions, AccordionDetails, AccordionSummary, Button, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ancientSite } from '../types/ancientSite.ts';
import {deleteAncientSite, fetchAncientSites} from '../services/AncientSiteService.ts';
const ITEM_HEIGHT = 60;
const EXPANDED_HEIGHT = 230;

type Props = {
    sites: ancientSite[];
    query: string;
    onNavigate: (lat: number, lon: number, site: ancientSite) => void;
    onEdit: (id: number | undefined) => void;
    onDelete: (id: number) => void;
    onSelectSite: (site: ancientSite) => void;
};

export const SiteCardStack = ({ sites, query, onNavigate, onEdit, onSelectSite }: Props) => {
    const listRef = useRef<List>(null);
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);


    const filteredSites = sites.filter(site =>
    site.name.toLowerCase().includes(query.toLowerCase()) ||
    site.siteType?.name.toLowerCase().includes(query.toLowerCase()));

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

    const handleDelete = async (id: number) => {
        try {
            await deleteAncientSite(id);
            setSites((prev) => prev.filter((p) => p.id !== id));
        } catch (err) {
            console.error("Could not delete the site")
        }
    }

    const Row = ({ index, style }: { index: number; style: React.CSSProperties }) => {
        const site = filteredSites[index];

        return (
            <div style={style}  key={site.id}>
                <Accordion
                    expanded={expandedIndex === index}
                    onChange={() => handleToggle(index)}
                >
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>{site.name}</Typography>
                    </AccordionSummary>
                    <AccordionDetails style={{ whiteSpace: 'normal', overflowWrap: 'break-word' }}>
                        {site.teaserDescription}
                    </AccordionDetails>
                    <AccordionActions>
                        <Button onClick={() => handleDelete(site.id!)}>Delete</Button>
                        <Button onClick={() => onEdit(site.id)}>Edit</Button>
                        <Button onClick={() => {
                            onNavigate(site.latitude, site.longitude, site);
                            onSelectSite(site)}}>
                            Navigate
                        </Button>
                    </AccordionActions>
                </Accordion>
            </div>
        );
    };

    return (
        <div style={{ height: 500, width: 260, position: 'absolute', top: 120, right: 40, zIndex: 1000, textAlign: 'center', gap: 0  }}>

            <List
                height={700}
                width={270}
                itemCount={filteredSites.length}
                itemSize={getItemSize}
                itemData={""}
                ref={listRef}
                // style={{ color: "black", backgroundColor: "black",}}
            >
                {Row}
            </List>
        </div>
    );
};



