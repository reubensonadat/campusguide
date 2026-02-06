import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { CAMPUSES } from '../data/campuses';

const CampusContext = createContext();

export const CampusProvider = ({ children }) => {
    // Key for localStorage
    const LS_CAMPUS_KEY = 'campus_guide_selected_campus';

    // Use custom hook or standard useState with lazy initialization
    // We prefer useLocalStorage if available, but for simplicity here's the logic:
    const [selectedCampusId, setSelectedCampusId] = useLocalStorage(LS_CAMPUS_KEY, null);
    const [selectedCampus, setSelectedCampus] = useState(null);

    useEffect(() => {
        if (selectedCampusId) {
            const campus = CAMPUSES.find(c => c.id === selectedCampusId);
            if (campus) {
                setSelectedCampus(campus);
            } else {
                // If ID invalid/deprecated, reset
                setSelectedCampus(null);
            }
        } else {
            setSelectedCampus(null);
        }
    }, [selectedCampusId]);

    const setCampus = (campusId) => {
        if (CAMPUSES.find(c => c.id === campusId)) {
            setSelectedCampusId(campusId);
        }
    };

    const value = {
        selectedCampus,
        selectedCampusId,
        setCampus,
        campuses: CAMPUSES,
        isLoading: false // In case we need async later
    };

    return (
        <CampusContext.Provider value={value}>
            {children}
        </CampusContext.Provider>
    );
};

export const useCampus = () => {
    const context = useContext(CampusContext);
    if (!context) {
        throw new Error('useCampus must be used within a CampusProvider');
    }
    return context;
};
