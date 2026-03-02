export const CAMPUSES = [
    {
        id: 'ucc',
        name: 'University of Cape Coast',
        shortName: 'UCC',
        colors: {
            primary: 'indigo',
            secondary: 'blue'
        },
        transactionPrefix: 'uc'
    },
    {
        id: 'knust',
        name: 'Kwame Nkrumah University of Science and Technology',
        shortName: 'KNUST',
        colors: {
            primary: 'amber', // Matches KNUST yellow/gold
            secondary: 'red'
        },
        transactionPrefix: 'kn'
    },
    {
        id: 'ug',
        name: 'University of Ghana',
        shortName: 'UG',
        colors: {
            primary: 'emerald', // Matches Legon Green (roughly) or maybe Blue? UG is typically Dark Blue/Yellow. Let's start with Blue-900.
            // Actually UG is Navy Blue and Gold. 'slate' or 'blue' might be better.
            // But Tailwind colors: 'blue' is fine.
            primary: 'blue',
            secondary: 'yellow'
        },
        transactionPrefix: 'ug'
    }
];

export const getCampusById = (id) => CAMPUSES.find(c => c.id === id);
