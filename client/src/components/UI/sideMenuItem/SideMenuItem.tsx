import React from 'react';

const SideMenuItem: React.FC<any> = ({ img, description, opacity }) => {
    return (
        <div>
            {opacity ?
                <div className='flex flex-col items-center justify-center opacity-[0.3] hover:opacity-[1]'>
                    <img src={img} className="w-[32px]" alt="..." />
                    <p className='text-[14px]'>{description}</p>
                </div>
                :
                <div className='flex flex-col items-center justify-center opacity-1 hover:opacity-[1]'>
                    <img src={img} className="w-[32px]" alt="..." />
                    <p className='text-[14px]'>{description}</p>
                </div>}
        </div>

    );
};

export default SideMenuItem;