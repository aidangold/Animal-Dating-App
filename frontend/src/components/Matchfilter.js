import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import Chip from '@mui/material/Chip';
import TuneRoundedIcon from '@mui/icons-material/TuneRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { useState } from "react";
import './matchfilter.css';


export default function Matchfilter({ isFilter, filterClick }) {
    const [isOpen, setIsOpen] = useState(false);

    // Resizes body of content when filter menu is open
    // (!!!FIX WHEN USER CLICKS AWAY FROM PAGE WITH MENU OPEN)
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
                            { isFilter[0].length == 0 ? <Chip label='Any' onClick={() => filterClick(0, 'any')} variant='filled' /> :
                                <Chip label='Any' onClick={() => filterClick(0, 'any')} variant='outlined' /> }
                            { isFilter[0].includes('dog') ? <Chip label='Dog' onClick={() => filterClick(0, 'dog')} variant='filled' /> :
                                <Chip label='Dog' onClick={() => filterClick(0, 'dog')} variant='outlined' /> }
                            { isFilter[0].includes('cat') ? <Chip label='Cat' onClick={() => filterClick(0, 'cat')} variant='filled' /> :
                                <Chip label='Cat' onClick={() => filterClick(0, 'cat')} variant='outlined' /> }
                        </div>
                        <div className='white-space'> </div>
                        <Divider />

                        <h4>Sex</h4>
                        <div className='chips'>
                            { isFilter[1].length == 0 ? <Chip label='Any' onClick={() => filterClick(1, 'any')} variant='filled' /> :
                                <Chip label='Any' onClick={() => filterClick(1, 'any')} variant='outlined' /> }
                            { isFilter[1].includes('male') ? <Chip label='Male' onClick={() => filterClick(1, 'male')} variant='filled' /> :
                                <Chip label='Male' onClick={() => filterClick(1, 'male')} variant='outlined' /> }
                            { isFilter[1].includes('female') ? <Chip label='Female' onClick={() => filterClick(1, 'female')} variant='filled' /> :
                                <Chip label='Female' onClick={() => filterClick(1, 'female')} variant='outlined' /> }
                        </div>
                        <div className='white-space'> </div>
                        <Divider />

                        <h4>Age</h4>
                        <div className='chips'>
                            { isFilter[2].length == 0 ? <Chip label='Any' onClick={() => filterClick(2, 'any')} variant='filled' /> :
                                <Chip label='Any' onClick={() => filterClick(2, 'any')} variant='outlined' /> }
                            { isFilter[2].includes('a01') ? <Chip label='0-1 year' onClick={() => filterClick(2, 'a01')} variant='filled' /> :
                                <Chip label='0-1 year' onClick={() => filterClick(2, 'a01')} variant='outlined' /> }
                            { isFilter[2].includes('a15') ? <Chip label='1-5 years' onClick={() => filterClick(2, 'a15')} variant='filled' /> :
                                <Chip label='1-5 years' onClick={() => filterClick(2, 'a15')} variant='outlined' /> }
                            { isFilter[2].includes('a510') ? <Chip label='5-10 years' onClick={() => filterClick(2, 'a510')} variant='filled' /> :
                                <Chip label='5-10 years' onClick={() => filterClick(2, 'a510')} variant='outlined' /> }
                            { isFilter[2].includes('a10p') ? <Chip label='10+ years' onClick={() => filterClick(2, 'a10p')} variant='filled' /> :
                                <Chip label='10+ years' onClick={() => filterClick(2, 'a10p')} variant='outlined' /> }
                        </div>
                        <div className='white-space'> </div>
                        <Divider />

                        <h4>Weight</h4>
                        <div className='chips'>
                            { isFilter[3].length == 0 ? <Chip label='Any' onClick={() => filterClick(3, 'any')} variant='filled' /> :
                                <Chip label='Any' onClick={() => filterClick(3, 'any')} variant='outlined' /> }
                            { isFilter[3].includes('w010') ? <Chip label='0-10 lbs' onClick={() => filterClick(3, 'w010')} variant='filled' /> :
                                <Chip label='0-10 lbs' onClick={() => filterClick(3, 'w010')} variant='outlined' /> }
                            { isFilter[3].includes('w1025') ? <Chip label='10-25 lbs' onClick={() => filterClick(3, 'w1025')} variant='filled' /> :
                                <Chip label='10-25 lbs' onClick={() => filterClick(3, 'w1025')} variant='outlined' /> }
                            { isFilter[3].includes('w2550') ? <Chip label='25-50 lbs' onClick={() => filterClick(3, 'w2550')} variant='filled' /> :
                                <Chip label='2550 lbs' onClick={() => filterClick(3, 'w2550')} variant='outlined' /> }
                            { isFilter[3].includes('w50p') ? <Chip label='50+ lbs' onClick={() => filterClick(3, 'w50p')} variant='filled' /> :
                                <Chip label='50+ lbs' onClick={() => filterClick(3, 'w50p')} variant='outlined' /> }
                        </div>
                        <div className='white-space'> </div>
                        <Divider />
                    </div>
            </Drawer>
        </>
    )
}