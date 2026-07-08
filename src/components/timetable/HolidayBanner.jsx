import React from 'react';
import { PartyPopper } from 'lucide-react';
import { CustomEyes } from '../common/CustomIcons';

const HolidayBanner = ({ holiday }) => (
  <div className="mb-6 mt-6 p-4 bg-primary-50 border border-primary-100 rounded-2xl flex items-center justify-between shadow-sm">
    <div>
      <h3 className="font-bold text-primary-900 text-lg flex items-center gap-2">
        <PartyPopper className="w-5 h-5 text-primary-600" /> Public Holiday: {holiday.name}
      </h3>
      <p className="text-sm text-primary-700 font-medium mt-1 flex items-center">
        No classes today unless your lecturer said so <CustomEyes size={16} className="inline ml-1" />
      </p>
    </div>
  </div>
);

export default HolidayBanner;
