import { useState, useRef, useEffect } from 'react';

export default function ResponsiveDropdown({selectedValue,onValueChange}) {
 const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const options = [
    { value: 5, label: '5' },
    { value: 10, label: '10' },
    { value: 25, label: '25' },
    { value: 50, label: '50' }
  ];

 useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  const handleSelect = (value) => {
    onValueChange(value); // Call parent's function
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const selectedOption = options.find(option => option.value === selectedValue);


  return (
         
      
      <div className="dropdown" ref={dropdownRef}>
        <button 
          className={`dropdown-btn ${isOpen ? 'active' : ''}`}
          onClick={toggleDropdown}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              toggleDropdown();
            }
          }}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
        >
          {selectedOption.label}
          <span className="dropdown-arrow"></span>
        </button>
        
        <div className={`dropdown-content ${isOpen ? 'show' : ''}`}>
          {options.map((option) => (
            <div
              key={option.value}
              className={`dropdown-item ${selectedValue === option.value ? 'selected' : ''}`}
              onClick={() => handleSelect(option.value)}
              onKeyDown={(e) => handleKeyDown(e, option.value)}
              tabIndex={0}
              role="option"
              aria-selected={selectedValue === option.value}
            >
              {option.label}
            </div>
          ))}
        </div>
        <style jsx>{`
        
        
        .dropdown {
          position: relative;
          width: fit-content;
        }
        
        .dropdown-btn {
          width: fit-content;
          padding: 14px 20px;
          background-color: #f8f9fa;
          border: 2px solid #e1e5eb;
          border-radius: 8px;
          font-size: clamp(16px, 4vw, 18px);
          font-weight: 500;
          color: #333;
          cursor: pointer;
          display: flex;
          gap:8px;
          justify-content: space-between;
          align-items: center;
          transition: all 0.3s ease;
        }
        
        .dropdown-btn:hover {
          background-color: #e9ecef;
          border-color: #6c757d;
        }
        
        .dropdown-btn:focus {
          outline: none;
          border-color: #4dabf7;
          box-shadow: 0 0 0 3px rgba(77, 171, 247, 0.2);
        }
        
        .dropdown-arrow {
          display: inline-block;
          width: 10px;
          height: 10px;
          border-right: 2px solid #495057;
          border-bottom: 2px solid #495057;
          transform: rotate(45deg);
          transition: transform 0.3s ease;
        }
        
        .dropdown-btn.active .dropdown-arrow {
          transform: rotate(-135deg);
        }
        
        .dropdown-content {
          position: absolute;
          top: 100%;
          left: 0;
          width: 100%;
          background-color: white;
          border-radius: 8px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
          z-index: 10;
          opacity: 0;
          visibility: hidden;
          transform: translateY(-10px);
          transition: all 0.3s ease;
          max-height: 0;
          overflow: hidden;
        }
        
        .dropdown-content.show {
          opacity: 1;
          visibility: visible;
          transform: translateY(5px);
          max-height: 300px;
        }
        
        .dropdown-item {
          padding: 14px 20px;
          cursor: pointer;
          color:#495057;
          transition: background-color 0.2s ease;
          border-bottom: 1px solid #f1f3f4;
          font-size: clamp(16px, 4vw, 18px);
        }
        
        .dropdown-item:last-child {
          border-bottom: none;
        }
        
        .dropdown-item:hover {
          background-color: #f1f3f4;
        }
        
        .dropdown-item.selected {
          background-color: #e7f5ff;
          color: #1971c2;
          font-weight: 500;
        }
        
        .selected-value {
          margin-top: 20px;
          padding: 15px;
          background-color: #f8f9fa;
          border-radius: 8px;
          text-align: center;
          font-weight: 500;
          color: #495057;
          font-size: clamp(16px, 4vw, 18px);
        }
        
        .selected-value span {
          color: #1971c2;
          font-weight: 600;
        }
        
        .instructions {
          margin-top: 15px;
          font-size: clamp(14px, 3vw, 16px);
          color: #6c757d;
          text-align: center;
          line-height: 1.5;
        }
        
        /* Tablet styles */
        @media (max-width: 768px) {
          .container {
            padding: 25px;
            max-width: 350px;
          }
          
          .dropdown-btn {
            padding: 12px 18px;
          }
          
          .dropdown-item {
            padding: 12px 18px;
          }
        }
        
        /* Mobile styles */
        @media (max-width: 480px) {
          .container {
            padding: 20px;
            max-width: 100%;
          }
          
          .dropdown-btn {
            padding: 12px 16px;
          }
          
          .dropdown-item {
            padding: 12px 16px;
          }
          
          .selected-value {
            padding: 12px;
          }
        }
        
        /* Small mobile styles */
        @media (max-width: 360px) {
          .container {
            padding: 15px;
          }
          
          .dropdown-btn {
            padding: 10px 14px;
          }
          
          .dropdown-item {
            padding: 10px 14px;
          }
        }
        
        /* Large screen styles */
        @media (min-width: 1200px) {
          .container {
            max-width: 450px;
            padding: 40px;
          }
        }
        
        /* Touch device optimizations */
        @media (hover: none) {
          .dropdown-btn:hover {
            background-color: #f8f9fa;
            border-color: #e1e5eb;
          }
          
          .dropdown-item:hover {
            background-color: transparent;
          }
          
          .dropdown-item:active {
            background-color: #f1f3f4;
          }
        }
      `}</style>
      </div>
      

      
    
  );
}