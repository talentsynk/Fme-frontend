import { ReactNode, useState } from "react";
import { Down, Up } from "./Svgs";
interface Accordion{
    title: string;
    number:number;
    children:ReactNode;
}
const AccordionItem:React.FC<Accordion> = ({ number, title, children }) => {
    const [isOpen, setIsOpen] = useState(false);
  
    return (
      <div className=" rounded-[10px] bg-[#F9F9F9]">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between p-4 focus:outline-none"
        >
          <span className="flex items-center">
            <span className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-2">
              {number}
            </span>
            <span className="text-gray-800">{title}</span>
          </span>
          <span className="text-gray-500">{isOpen ? <Down /> : <Up />}</span>
        </button>
        {isOpen && <div className="p-4 bg-gray-50">{children}</div>}
      </div>
    );
  };
  
  const Accordion = () => {
    const items = [
      { title: "What is the National Skills Information Center?", content: "This is the content for item 1." },
      { title: "What is the National Skills Information Center?", content: "This is the content for item 2." },
      { title: "What is the National Skills Information Center?", content: "This is the content for item 3." },
      { title: "What is the National Skills Information Center?", content: "This is the content for item 4." },
      { title: "What is the National Skills Information Center?", content: "This is the content for item 5." },
      { title: "What is the National Skills Information Center?", content: "This is the content for item 6." },
      { title: "What is the National Skills Information Center?", content: "This is the content for item 7." },
    ];
  
    return (
      <div className="w-full space-y-2 rounded-lg shadow-md overflow-hidden">
        {items.map((item, index) => (
          <AccordionItem
            key={index}
            number={index + 1}
            title={item.title}
          >
            {item.content}
          </AccordionItem>
        ))}
      </div>
    );
  };
  
  export default Accordion;