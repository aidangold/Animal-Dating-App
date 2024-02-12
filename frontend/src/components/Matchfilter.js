import Button from '@mui/material/Button';
import TuneRoundedIcon from '@mui/icons-material/TuneRounded';

export default function Matchfilter() {
    return (
        <Button variant="text" startIcon={<TuneRoundedIcon />} size="large">
            Filter
        </Button>
    )
}