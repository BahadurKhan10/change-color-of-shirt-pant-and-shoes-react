import React, { useState, useEffect, useRef } from 'react';
import iro from '@jaames/iro';
import body from '../assets/images/body.webp';
import pants from '../assets/images/pants_1.webp';
import shirt from '../assets/images/shirt_1.webp';
import shoes from '../assets/images/shoes_1.webp';

function ClothingCustomizer() {
  const [selectedColors, setSelectedColors] = useState({
    shirt: { h: 35, s: 55, l: 91 },
    pants: { h: 218, s: 37, l: 64 },
    shoes: { h: 33, s: 13, l: 72 },
  });

  // Use refs to store color picker instances
  const shirtColorPicker = useRef(null);
  const pantsColorPicker = useRef(null);
  const shoesColorPicker = useRef(null);

  const updateImageFilters = () => {
    const { shirt: shirtColor, pants: pantsColor, shoes: shoesColor } = selectedColors;

    document.getElementById('shirtImg').style.filter = `hue-rotate(${shirtColor.h - 35}deg) saturate(${100 + (shirtColor.s - 55)}%) brightness(${100 + (shirtColor.l - 91)}%)`;
    document.getElementById('pantsImg').style.filter = `hue-rotate(${pantsColor.h - 218}deg) saturate(${100 + (pantsColor.s - 37)}%) brightness(${100 + (pantsColor.l - 64)}%)`;
    document.getElementById('shoesImg').style.filter = `hue-rotate(${shoesColor.h - 33}deg) saturate(${100 + (shoesColor.s - 13)}%) brightness(${100 + (shoesColor.l - 72)}%)`;
  };

  useEffect(() => {
    updateImageFilters();
  }, [selectedColors]);

  const handleColorChange = (target, color) => {
    setSelectedColors((prevColors) => ({
      ...prevColors,
      [target]: color.hsl,
    }));
  };

  const createColorPicker = (target, initialColor) => {
    let colorPickerInstance = null;

    if (target === 'shirt') {
      if (!shirtColorPicker.current) {
        shirtColorPicker.current = new iro.ColorPicker(`#sliderPicker${target}`, {
          width: 250,
          color: initialColor,
          borderWidth: 1,
          borderColor: '#ccc',
          layout: [
            {
              component: iro.ui.Slider,
              options: {
                sliderType: 'hue',
              },
            },
            {
              component: iro.ui.Slider,
              options: {
                sliderType: 'saturation',
              },
            },
            {
              component: iro.ui.Slider,
              options: {
                sliderType: 'value',
              },
            },
          ],
        });
      }

      colorPickerInstance = shirtColorPicker.current;
    } else if (target === 'pants') {
      if (!pantsColorPicker.current) {
        pantsColorPicker.current = new iro.ColorPicker(`#sliderPicker${target}`, {
          width: 250,
          color: initialColor,
          borderWidth: 1,
          borderColor: '#ccc',
          layout: [
            {
              component: iro.ui.Slider,
              options: {
                sliderType: 'hue',
              },
            },
            {
              component: iro.ui.Slider,
              options: {
                sliderType: 'saturation',
              },
            },
            {
              component: iro.ui.Slider,
              options: {
                sliderType: 'value',
              },
            },
          ],
        });
      }

      colorPickerInstance = pantsColorPicker.current;
    } else if (target === 'shoes') {
      if (!shoesColorPicker.current) {
        shoesColorPicker.current = new iro.ColorPicker(`#sliderPicker${target}`, {
          width: 250,
          color: initialColor,
          borderWidth: 1,
          borderColor: '#ccc',
          layout: [
            {
              component: iro.ui.Slider,
              options: {
                sliderType: 'hue',
              },
            },
            {
              component: iro.ui.Slider,
              options: {
                sliderType: 'saturation',
              },
            },
            {
              component: iro.ui.Slider,
              options: {
                sliderType: 'value',
              },
            },
          ],
        });
      }

      colorPickerInstance = shoesColorPicker.current;
    }

    colorPickerInstance.on('color:change', (color) => {
      handleColorChange(target, color);
    });
  };

  useEffect(() => {
    createColorPicker('shirt', selectedColors.shirt);
    createColorPicker('pants', selectedColors.pants);
    createColorPicker('shoes', selectedColors.shoes);
  }, []);

  return (
    <div className="container">
      <div id="model">
        <img id="bodyImg" src={body} alt="Body" />
        <img id="shoesImg" src={shoes} alt="Shoes" />
        <img id="pantsImg" src={pants} alt="Pants" />
        <img id="shirtImg" src={shirt} alt="Shirt" />
      </div>
      <div id="sliderPicker">
      <h2 style={{marginLeft: '50px'}}>Choose Color</h2>

        <div id="sliderPickershirt">
          <p>Shirt Color:</p>
        </div>
        <div id="sliderPickerpants">
          <p>Pants Color:</p>
        </div>
        <div id="sliderPickershoes">
          <p>Shoes Color:</p>
        </div>
      </div>
    </div>
  );
}

export default ClothingCustomizer;
