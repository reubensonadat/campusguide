export const CAMPUSES = [
    {
        id: 'ucc',
        name: 'University of Cape Coast',
        shortName: 'UCC',
        location: 'Cape Coast',
        coordinates: { lat: 5.116774, lng: -1.290948 },
        logo: '/images/ucc.png',
        colors: { primary: 'indigo', secondary: 'blue' },
        transactionPrefix: 'uc'
    },
    {
        id: 'knust',
        name: 'Kwame Nkrumah University of Science and Technology',
        shortName: 'KNUST',
        location: 'Kumasi',
        coordinates: { lat: 6.6751, lng: -1.5714 },
        logo: '/images/knust.jpg',
        colors: { primary: 'indigo', secondary: 'blue' },
        transactionPrefix: 'kn'
    },
    {
        id: 'ug',
        name: 'University of Ghana',
        shortName: 'UG',
        location: 'Accra',
        coordinates: { lat: 5.6511, lng: -0.1883 },
        logo: '/images/ug.png',
        colors: { primary: 'indigo', secondary: 'blue' },
        transactionPrefix: 'ug'
    },
    {
        id: 'upsa',
        name: 'University of Professional Studies, Accra',
        shortName: 'UPSA',
        location: 'Accra',
        coordinates: { lat: 5.6121, lng: -0.2470 },
        logo: '/images/upsa.png',
        colors: { primary: 'indigo', secondary: 'blue' },
        transactionPrefix: 'up'
    },
    {
        id: 'uds',
        name: 'University for Development Studies',
        shortName: 'UDS',
        location: 'Tamale',
        coordinates: { lat: 9.4281, lng: -0.8580 },
        logo: '/images/uds.png',
        colors: { primary: 'indigo', secondary: 'blue' },
        transactionPrefix: 'ud'
    },
    {
        id: 'uhas',
        name: 'University of Health and Allied Sciences',
        shortName: 'UHAS',
        location: 'Ho',
        coordinates: { lat: 6.6115, lng: 0.4637 },
        logo: '/images/uhas.png',
        colors: { primary: 'indigo', secondary: 'blue' },
        transactionPrefix: 'uh'
    },
    {
        id: 'uenr',
        name: 'University of Energy and Natural Resources',
        shortName: 'UENR',
        location: 'Sunyani',
        coordinates: { lat: 7.3377, lng: -2.3270 },
        logo: '/images/uenr.png',
        colors: { primary: 'indigo', secondary: 'blue' },
        transactionPrefix: 'ue'
    },
    {
        id: 'gctu',
        name: 'Ghana Communication Technology University',
        shortName: 'GCTU',
        location: 'Accra',
        coordinates: { lat: 5.6067, lng: -0.1957 },
        logo: '/images/gctu.png',
        colors: { primary: 'indigo', secondary: 'blue' },
        transactionPrefix: 'gc'
    },
    {
        id: 'umat',
        name: 'University of Mines and Technology',
        shortName: 'UMaT',
        location: 'Tarkwa',
        coordinates: { lat: 5.3077, lng: -1.9916 },
        logo: '/images/umat.jpg',
        colors: { primary: 'indigo', secondary: 'blue' },
        transactionPrefix: 'um'
    }
];

export const getCampusById = (id) => CAMPUSES.find(c => c.id === id);
