"use client";
import { Avatar, Box, IconButton, Menu, MenuItem, Tooltip, Typography } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import Link from "next/link";
import { useState } from "react";

const settings = ['Profile', 'Account', 'Dashboard'];

const UserMenu = () => {
    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleSignOut = () => {
        localStorage.removeItem('userId');
    }
    return (
        <div className="flex flex-row justify-center items-center">
            <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        onClick={handleOpenUserMenu}
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                </Tooltip>
                <Menu
                    sx={{ mt: '45px' }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                >
                    {settings.map((setting) => (
                        <MenuItem key={setting} onClick={handleCloseUserMenu}>
                            <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
                        </MenuItem>
                    ))}
                    <MenuItem>
                        <Link
                            href="/api/auth/signout"
                            onClick={handleSignOut}
                            className="hover:text-black transition-colors duration-300"
                        >
                            Cerrar Sesión
                        </Link>
                    </MenuItem>
                </Menu>
            </Box>
        </div>
    )

}


export default UserMenu;