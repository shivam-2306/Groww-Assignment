import React, { useState , useEffect} from 'react';
import './UPI.scss';

const UPI = () => {
  const [accordions, setAccordions] = useState([
    { id: 1, platform: 'GPAY', isOpen: false, upiId: '' , },
    { id: 2, platform: 'PayTM', isOpen: false, upiId: '' },
    { id: 3, platform: 'PayPal', isOpen: false, upiId: '' },
  ]);

  const toggleAccordion = (id) => {
    setAccordions((prevAccordions) =>
      prevAccordions.map((accordion) => ({
        ...accordion,
        isOpen: accordion.id === id ? !accordion.isOpen : false,
        isSelected: accordion.id === id,
      }))
    );
  };
  

  const handleInputChange = (id, upiId) => {
    setAccordions((prevAccordions) =>
      prevAccordions.map((accordion) =>
        accordion.id === id ? { ...accordion, upiId: upiId } : accordion
      )
    );
  };
  const getImagePath = async (platform) => {
    try {
      const { default: image } = await import(`./assets/${platform.toLowerCase()}.png`);
      return image;
    } catch (error) {
      console.error('Error loading image:', error);
      return null;
    }
  };
  const loadImages = async () => {
    const accordionWithImages = await Promise.all(
      accordions.map(async (accordion) => {
        const imagePath = await getImagePath(accordion.platform);
        return { ...accordion, imagePath };
      })
    );
    setAccordions(accordionWithImages);
  };

  useEffect(() => {
    loadImages();
  }, []);


  return (
    <div className="upi-container">
      <h3> Enter UPI Details</h3>
      {accordions.map((accordion) => (
        <div key={accordion.id} className={`accordion ${accordion.isOpen ? 'open' : ''} ${accordion.isSelected ? 'selected' : ''}`}>
          <div className="accordion-header" onClick={() => toggleAccordion(accordion.id)}>
            <img src = {accordion.imagePath}/>
            {accordion.platform}
          </div>
          {accordion.isOpen && (
            <div className="accordion-content">
              <input
                type="text"
                placeholder="Enter UPI ID"
                value={accordion.upiId}
                onChange={(e) => handleInputChange(accordion.id, e.target.value)}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default UPI;
