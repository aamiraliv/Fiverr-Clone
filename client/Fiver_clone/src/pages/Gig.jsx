
import React, { useState } from 'react';

const Gig = () => {
  const [activeTab, setActiveTab] = useState('ACTIVE');
  const [openDropdown, setOpenDropdown] = useState(null);

  const tabs = [
    { label: 'ACTIVE', count: 2 },
    { label: 'PENDING APPROVAL', count: 0 },
    { label: 'REQUIRES MODIFICATION', count: 0 },
    { label: 'DRAFT', count: 0 },
    { label: 'DENIED', count: 0 },
    { label: 'PAUSED', count: 0 }
  ];

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setOpenDropdown(openDropdown === tab ? null : tab);
  };

  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-col">
        {/* Header Section */}
        <div className="flex flex-wrap justify-between items-center mb-4">
          <h1 className="text-2xl font-bold mb-4 md:mb-0">Gigs</h1>
          
          <div className="flex items-center">
            <label className="flex items-center mr-4">
              <span className="mr-2 text-sm">Accepting Custom Orders</span>
              <input 
                type="checkbox" 
                className="form-checkbox h-5 w-5 text-green-500"
                defaultChecked
              />
            </label>
            
            <button className="bg-green-500 text-white px-4 py-2 rounded-md text-sm hover:bg-green-600">
              CREATE A NEW GIG
            </button>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="flex flex-wrap overflow-x-auto border-b">
          {tabs.map((tab) => (
            <div 
              key={tab.label}
              className={`
                cursor-pointer 
                px-4 py-3 
                whitespace-nowrap 
                ${activeTab === tab.label 
                  ? 'border-b-2 border-green-500 text-green-500' 
                  : 'text-gray-600 hover:text-gray-800'}
              `}
              onClick={() => handleTabClick(tab.label)}
            >
              {tab.label} {tab.count > 0 && `(${tab.count})`}
            </div>
          ))}
        </div>

        {/* Dropdown Content */}
        {openDropdown && (
          <div className="bg-white shadow-lg rounded-md p-4 mt-2">
            {/* Placeholder for tab-specific content */}
            <div>
              <h3 className="font-semibold mb-2">{openDropdown} Content</h3>
              <p className="text-gray-600">
                Details and actions for {openDropdown.toLowerCase()} gigs will appear here.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Gig;

