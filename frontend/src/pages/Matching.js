import { useState } from "react";
import Matchfilter from '../components/Matchfilter';
import Photocards from '../components/Photocards';
import './matching.css';

export default function Matching() {
    
    const [isFilter, setIsFilter] = useState({
        0: [],    // type
        1: [],    // sex
        2: [],    // age
        3: []     // weight 
    });

    function filterClick(index, selected) {
        if (selected === 'any') {
            // if any is selected, chip is displayed active if less than max num of states
            if (isFilter[index].length > 0) {
                setIsFilter({...isFilter, [index]: []});
            }
        }
        else {
            // add selected to states
            if (!isFilter[index].includes(selected)) {
                setIsFilter({
                    ...isFilter,
                    [index]: [...isFilter[index], selected]
                });
            }
            // deselect
            else {
                if (isFilter[index].length == 1) {
                    setIsFilter({
                        ...isFilter,
                        [index]: []
                    });
                }
                else {
                    setIsFilter({
                        ...isFilter,
                        [index]: isFilter[index].filter(a => a !== selected)
                    });
                }      
            }
        }
    }

    return (
        <>
            <div className="filter-button">
                <Matchfilter 
                    isFilter={isFilter}
                    filterClick={filterClick} />
            </div>
            
            <div className="matching-main">
                <Photocards />
            </div>
        </>
    )
}