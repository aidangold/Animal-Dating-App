import Matchfilter from '../components/Matchfilter';
import Photocards from '../components/Photocards';
import './matching.css';

export default function Matching() {
    return (
        <>
            <div className="filter-button">
                <Matchfilter />
            </div>
            <div className="matching-main">
                <Photocards />
            </div>
        </>
    )
}