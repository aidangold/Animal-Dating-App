import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import Chip from '@mui/material/Chip';
import TuneRoundedIcon from '@mui/icons-material/TuneRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { useState } from "react";
import './matchfilter.css';

export default function Matchfilter() {
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = () => {
    }

    if (isOpen) {
        document.body.classList.add('active-filter')
    }
    else {
        document.body.classList.remove('active-filter')
    }

    return (
        <>
            <Button 
                onClick={() => setIsOpen(true)}
                variant="text" 
                startIcon={<TuneRoundedIcon />}
                size="large">
                    Filter
            </Button>

            <Drawer
                anchor='right'
                open={isOpen}
                onClose={() => setIsOpen(false)}
                variant="persistent">
                    <div className='filter-menu'>
                        <div className="filter-header">
                            <h3>Filter</h3>
                            <IconButton 
                                aria-label="close"
                                size="large"
                                onClick={() => setIsOpen(false)}>
                                    <CloseRoundedIcon />
                            </IconButton>
                        </div>

                        <h4>Pet Types</h4>
                        <div className='chips'>
                            <Chip 
                                label="Any"
                                onClick={handleClick} />
                            <Chip
                                label="Dogs"
                                onClick={handleClick} />
                            <Chip
                                label="Cats"
                                onClick={handleClick} />
                        </div>
                        <div className='white-space'> </div>
                        <Divider />

                        <h4>Gender</h4>
                        <div className='chips'>
                            <Chip 
                                label="Any"
                                onClick={handleClick} />
                            <Chip
                                label="Male"
                                onClick={handleClick} />
                            <Chip
                                label="Female"
                                onClick={handleClick} />
                        </div>
                        <div className='white-space'> </div>
                        <Divider />

                        <h4>Age</h4>
                        <div className='chips'>
                            <Chip 
                                label="Any"
                                onClick={handleClick} />

                            <Chip
                                label="0-1 year"
                                onClick={handleClick} />

                            <Chip
                                label="1-5 years"
                                onClick={handleClick} />

                            <Chip
                                label="5-10 years"
                                onClick={handleClick} />

                            <Chip
                                label="10+ years"
                                onClick={handleClick} />
                        </div>
                        <div className='white-space'> </div>
                        <Divider />

                        <h4>Weight</h4>
                        <div className='chips'>
                            <Chip 
                                label="Any"
                                onClick={handleClick} />

                            <Chip
                                label="0-5 lbs"
                                onClick={handleClick} />

                            <Chip
                                label="5-10 lbs"
                                onClick={handleClick} />

                            <Chip
                                label="10-50 lbs"
                                onClick={handleClick} />

                            <Chip
                                label="50+ lbs"
                                onClick={handleClick} />
                        </div>
                        <div className='white-space'> </div>
                        <Divider />
                    </div>
            </Drawer>
        </>
    )
}