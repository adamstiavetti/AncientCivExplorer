
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import SearchIcon from '@mui/icons-material/Search';
import {ThemeProvider, createTheme} from "@mui/material";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

import {searchAncientSites} from "../services/AncientSiteService.ts";

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

const darkTheme = createTheme({
    palette: {
        primary: {
            main: '#000000',
        },
    },
});

export default function Header() {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [query, setQuery] = useState("");
    const open = Boolean(anchorEl)
    const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    }

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();

        const results = await searchAncientSites(query);

        navigate(`/search-results`, { state: { results } });

    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <ThemeProvider theme={darkTheme}>
            <AppBar position="fixed" sx={{ zIndex: 1000 }}>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleMenuClick}
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon/>
                    </IconButton>

                    <Menu

                        style={{top: '40px'}}
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                    >
                        <MenuItem onClick={() => navigate("/")}>Home</MenuItem>
                        <MenuItem onClick={() => navigate("/new")}>Add Discovery</MenuItem>
                        <MenuItem onClick={() => navigate("/about")}>About</MenuItem>
                    </Menu>
                    <Typography
                        variant="h5"
                        noWrap
                        component="div"
                        sx={{ right: "3%",
                            transform: "translateX(3%)", flexGrow: 2, display: { xs: 'none', sm: 'block' } }}
                    >
                        Ancient Earth Explorer
                    </Typography>
                    <form onSubmit={handleSearch}>
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search…"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </Search>
                    </form>
                </Toolbar>
            </AppBar>
            </ThemeProvider>
        </Box>
    );
}

