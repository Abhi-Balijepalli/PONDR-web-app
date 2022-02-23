import React, { useState } from 'react';

const Tabs = (props) => {
  const [active, setActive] = useState(1);

  return (
    <div className='flex flex-col w-full'>
      <div className='flex justify-center h-10 text-sm'>
        {props.tabNames.map((tabName, index) => {
          if (index === active) {
            return <div key={index} className='mx-4 cursor-pointer text-blue-pondr text-xl font-medium border-b-2 border-blue-pondr' onClick={() => { setActive(index); }}>{tabName}</div>;
          } else {
            return <div key={index} className='mx-4 cursor-pointer text-gray-400 text-xl font-medium' onClick={() => { setActive(index); }}>{tabName}</div>;
          }
        })}
      </div>
      <div className='w-full'><hr /></div>
      <div className='w-full px-6'>
        {props.tabs[active]}
      </div>
    </div>
  );
};

export default Tabs;
