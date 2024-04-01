import { useState, useRef, useEffect } from 'react';
import StcModal from './StcModal';


const StcMenu = () => {
  const [isOpen, setIsOpen] = useState<Boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);


  const toggleMenu = () => {
    setIsOpen(!isOpen);
    setIsModalOpen(false);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setIsModalOpen(false);
    }
  };
  

  useEffect(() => {
    // Add event listener when the component mounts
    document.addEventListener('mousedown', handleClickOutside);

    // Remove event listener when the component unmounts
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={menuRef}>
    
      <button className="text-xl" onClick={toggleMenu}>
        ⋮
      </button>

      {/* Popup menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-60 bg-white border rounded-lg shadow-lg border-[#E0E2E7] p-2">
          <ul>
            <li onClick={toggleModal} className=" cursor-pointer w-4/5 mx-auto py-2 px-4 hover:bg-[#00932E] hover:text-white text-[#232325] font-medium rounded-[5px] ">View STC profile</li>
            <li className=" cursor-pointer w-4/5 mx-auto py-2 px-4 hover:bg-[#00932E] hover:text-white text-[#232325] font-medium rounded-[5px] ">Suspend STC</li>
            <li className=" cursor-pointer w-4/5 mx-auto py-2 px-4 hover:bg-[#00932E] hover:text-white text-[#232325] font-medium rounded-[5px] ">Delete STC</li>
            <li className=" cursor-pointer w-4/5 mx-auto py-2 px-4 text-[#F32D2D] font-medium rounded-[5px] ">Clear Selection</li>
          </ul>
        </div>
      )}
      <StcModal isOpen={isModalOpen} onClose={toggleModal} />
    </div>
  );
};

export default StcMenu;
