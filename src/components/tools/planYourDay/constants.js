import {
    LibraryIcon, StudyIcon, FoodIcon, ExerciseIcon,
    MeetingIcon, ComputerWorkIcon, SleepIcon,
    JobIcon, PlayIcon, ShoppingIcon
} from '../../common/CustomTaskIcons';
import { MorningIcon, AfternoonIcon, EveningIcon, DowntimeIcon } from './TimeIcons';

export const TERMS = [
    '100_1', '100_2', '200_1', '200_2', '300_1', '300_2',
    '400_1', '400_2', '500_1', '500_2', '600_1', '600_2'
];

export const AVAILABLE_ICONS = [
    { id: 'library', icon: LibraryIcon, label: 'Library' },
    { id: 'study', icon: StudyIcon, label: 'Study' },
    { id: 'food', icon: FoodIcon, label: 'Food/Break' },
    { id: 'gym', icon: ExerciseIcon, label: 'Exercise' },
    { id: 'meeting', icon: MeetingIcon, label: 'Meeting' },
    { id: 'code', icon: ComputerWorkIcon, label: 'Computer Work' },
    { id: 'relax', icon: SleepIcon, label: 'Relax/Sleep' },
    { id: 'work', icon: JobIcon, label: 'Work/Gig' },
    { id: 'gaming', icon: PlayIcon, label: 'Play' },
    { id: 'shopping', icon: ShoppingIcon, label: 'Shopping' }
];

export const QUICK_FILL_GROUPS = [
    {
        label: 'Morning',
        Icon: MorningIcon,
        items: [
            { label: 'Breakfast',     icon: 'food',     title: 'Breakfast',              time: '07:00', endTime: '07:45' },
            { label: 'Study',         icon: 'study',    title: 'Morning Study Session',  time: '06:30', endTime: '08:00' },
            { label: 'Library',       icon: 'library',  title: 'Go to Library',          time: '09:00', endTime: '12:00' },
            { label: 'Exercise',      icon: 'gym',      title: 'Morning Exercise',       time: '06:00', endTime: '07:00' },
        ]
    },
    {
        label: 'Afternoon',
        Icon: AfternoonIcon,
        items: [
            { label: 'Lunch',         icon: 'food',     title: 'Lunch Break',            time: '12:30', endTime: '13:30' },
            { label: 'Laptop Work',   icon: 'code',     title: 'Work on Laptop',         time: '14:00', endTime: '16:00' },
            { label: 'Job / Gig',     icon: 'work',     title: 'Part-time Job',          time: '14:00', endTime: '18:00' },
            { label: 'Shopping',      icon: 'shopping', title: 'Run Errands / Shopping', time: '15:00', endTime: '16:00' },
        ]
    },
    {
        label: 'Evening',
        Icon: EveningIcon,
        items: [
            { label: 'Meetup',        icon: 'meeting',  title: 'Meet up with Friends',   time: '17:00', endTime: '18:30' },
            { label: 'Dinner',        icon: 'food',     title: 'Dinner',                 time: '18:30', endTime: '19:30' },
            { label: 'Revision',      icon: 'study',    title: 'Evening Revision',       time: '19:00', endTime: '21:00' },
            { label: 'Night Library', icon: 'library',  title: 'Night Library Session',  time: '18:00', endTime: '21:00' },
        ]
    },
    {
        label: 'Downtime',
        Icon: DowntimeIcon,
        items: [
            { label: 'Rest / Nap',    icon: 'relax',    title: 'Rest / Nap',             time: '14:00', endTime: '15:00' },
            { label: 'Gaming',        icon: 'gaming',   title: 'Play Games',             time: '20:00', endTime: '22:00' },
            { label: 'Chill',         icon: 'relax',    title: 'Chill / Relax',          time: '21:00', endTime: '22:30' },
        ]
    }
];
