
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Header from "./Header.tsx";
import MenuItem from "@mui/material/MenuItem";
import  { countries } from "countries-list";
import {Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Radio, RadioGroup} from "@mui/material";
import {useEffect, useState} from "react";
import {
    createAncientSite,
    fetchAncientSiteById,
    updateAncientSite
} from "../services/AncientSiteService.ts";
import {useNavigate, useParams} from "react-router-dom";
import {ancientSite} from "../types/ancientSite.ts";

const regions = Object.entries(countries).map(([code, {name}]) => ({
    code,
    name,
}));

const siteTypes = [
    {
        id: 1, value: 'Temple'
    },
    {
        id: 2, value: 'City'
    },
    {
        id: 3, value: 'Astronomical Site'
    },
    {
        id: 4, value: 'Burial Site'
    },
    {
        id: 5, value: 'Monolith'
    },
    {
        id: 6, value: 'Mythical Site'
    },
]

const eras = [
    {
        value: 'Paleolithic Era',
    },
    {
        value: 'Mesolithic Era',
    },
    {
        value: 'Neolithic Era',
    },
    {
        value: 'Chalcolithic Era',
    },
    {
        value: 'Bronze Age',
    },
    {
        value: 'Iron Age',
    },
]
export default function AddDiscoveryForm() {

    const { id }= useParams();

    const navigate = useNavigate();

    const isEditing = Boolean(id);

    type FormDataState = Omit<ancientSite, 'siteType'> & {
        yearBuiltDisplay: string;
    }

    // const [value, setValue] = useState("");
    const [error, setError] = useState(false);
    const [formData, setFormData] = useState<FormDataState>({
        id: undefined,
        name: '',
        description: '',
        latitude: 0,
        longitude: 0,
        image_url: '',
        era: '',
        region: '',
        yearBuilt: 0,
        yearBuiltDisplay: '',  //
        discoveryYear: '',
        credibilityLevel: '',
        isAlternative: false,
        siteTypeId: 1,
        isUserSubmitted: true,
        isDeleted: false,
    });

    useEffect(() => {
        if (isEditing && id) {
            fetchAncientSiteById(Number(id)).then((site) => {
                console.log("Fetched Site: ", site);
                setFormData({
                    ...site,
                    yearBuiltDisplay: site.yearBuilt < 0 ? `${-site.yearBuilt} BCE` : `${site.yearBuilt} AD`,
                });
                setTimeout(() => console.log("Updated formData:", formData), 100);
            });
        }
    }, [isEditing, id]);


    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = event.target;
        const checked = type === "checkbox" ? (event.target as HTMLInputElement).checked : undefined;

        if (name === "yearBuiltDisplay") {
            setFormData(prev => ({ ...prev, yearBuiltDisplay: value }));

            const match = value.match(/^(\d{1,5})\s?(BCE|AD)$/i);
            if (match) {
                const year = parseInt(match[1], 10);
                const isBCE = match[2].toUpperCase() === "BCE";
                const parsedYear = isBCE ? -year : year;

                setError(false);
                setFormData(prev => ({
                    ...prev,
                    yearBuilt: parsedYear,
                    yearBuiltDisplay: value
                }));
            } else {
                setError(true);
            }
            return;
        }

        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox'
                ? checked
                : name === 'siteTypeId'
                    ? parseInt(value)
                    : value,
        }));
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        console.log("Submitting Form Data: ", formData)

        if (isEditing) {
            console.log("🔥 formData about to be submitted", formData);
            console.log("✅ formData.id is", formData.id);
            await updateAncientSite(formData)
        } else {
            await createAncientSite(formData)
        }
        navigate("/");

        // try {
        //     await createAncientSite(formData);
        //     navigate("/");
        // } catch (err) {
        //     console.error("Submission Failed:", err);
        // }
    };

    return (
        <div>
            <Header/>
        <Box
            component="form"
            sx={{ '& .MuiTextField-root': { m: 1, width: '50%' },marginTop: "100px", display: 'flex', flexDirection: 'column', alignItems: 'center', gap:0 }}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
        >
            <h2>{isEditing ? "Edit Ancient Site" : "New Ancient Site"}</h2>
                <TextField
                    id="discoveryName"
                    name="name"
                    label="Discovery Name"
                    placeholder="Discovery Name"
                    multiline
                    value={formData.name}
                    onChange={handleChange}
                />

                <TextField
                    select
                    label="Site Type"
                    name="siteTypeId"
                    value={formData.siteTypeId}
                    placeholder="Site Type"
                    multiline
                    onChange={handleChange}
                >
                    {siteTypes.map((option) => (
                        <MenuItem key={option.id} value={option.id}>
                            {option.value}
                        </MenuItem>
                    ))}
                </TextField>

                <TextField
                    id="latitude"
                    name="latitude"
                    label="Latitude"
                    placeholder="Latitude"
                    value={formData.latitude}
                    multiline
                    onChange={handleChange}
                />
                <TextField
                    id="longitude"
                    name="longitude"
                    label="Longitude"
                    placeholder="Longitude"
                    value={formData.longitude}
                    multiline
                    onChange={handleChange}
                />

                <TextField
                    id="imageUrl"
                    name="image_url"
                    label="Image URL"
                    placeholder="Image URL"
                    value={formData.image_url}
                    multiline
                    onChange={handleChange}
                />

                <TextField
                    id="era"
                    name='era'
                    select
                    label="Era"
                    placeholder="Era"
                    value={formData.era}
                    multiline
                    onChange={handleChange}
                    >
                    {eras.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.value}
                        </MenuItem>
                    ))}
                </TextField>

                <TextField
                    id="region"
                    name="region"
                    select
                    label="Region"
                    placeholder="Region"
                    multiline
                    value={formData.region}
                    onChange={handleChange}
                >
                    {regions.map((option) => (
                        <MenuItem key={option.name} value={option.name}>
                            {option.name}
                        </MenuItem>
                    ))}
                </TextField>

                <TextField
                    id="yearBuilt"
                    name="yearBuiltDisplay"
                    label="Year Built"
                    placeholder="Year Built"
                    value={formData.yearBuiltDisplay}
                    onChange={handleChange}
                    error={error}
                    helperText={error ? "Enter a valid year (e.g., 12000 BCE or 500 AD)" : " "}
                    multiline
                />

                <TextField
                    id="discoveryYear"
                    name="discoveryYear"
                    label="Discovery Year"
                    placeholder="Discoery Year"
                    value={formData.discoveryYear}
                    onChange={handleChange}
                    multiline
                />

                <TextField
                    id="description"
                    name="description"
                    label="Description"
                    placeholder="Description"
                    onChange={handleChange}
                    value={formData.description}
                    rows={4}
                    multiline
                />

            <FormControl component="fieldset">
                <FormLabel component="legend">Alternative Historical Theory</FormLabel>
                <FormGroup aria-label="position" row style={{marginLeft: "90px"}}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={formData.isAlternative}
                                onChange={(e) =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        isAlternative: e.target.checked,
                                    }))
                                }
                                name="isAlternative"
                            />
                        }
                        label=""
                    />
                </FormGroup>
            </FormControl>

            <FormControl style={{marginTop: "20px"}}>
                <FormLabel id="credibilityLevel">Credibility Level</FormLabel>
                <RadioGroup
                    onChange={handleChange}
                    value={formData.credibilityLevel}
                    aria-labelledby="demo-radio-buttons-group-label"
                    name="credibilityLevel"
                >
                    <FormControlLabel value="speculative" control={<Radio />} label="Speculative" />
                    <FormControlLabel value="moderate" control={<Radio />} label="Moderate" />
                    <FormControlLabel value="high" control={<Radio />} label="High" />
                </RadioGroup>
            </FormControl>

                <Button
                    type="submit"
                    variant="outlined">{isEditing ? "Update Ancient Site" : "Add New Site"}</Button>
        </Box>
        </div>
    );
}
