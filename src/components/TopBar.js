import { useState } from 'react';
import { FaBrush, FaEraser, FaUndoAlt } from 'react-icons/fa';

export default function TopBar({
  setActiveTool,
  setCurrentColor,
  setCurrentSize,
  setBucketColor,
  setIsEraser,
  setDrawnArray,
  setCanvasClear,
  activeTool
}) {
  const [brushSize, setBrushSize] = useState(10);

  const handleBrushSizeChange = (e) => {
    setBrushSize(e.target.value);
    setCurrentSize(e.target.value);
  };

  const handleToolChange = (tool) => {
    setIsEraser(tool === 'Eraser');
    setActiveTool(tool);
  };

  const handleClearCanvas = () => {
    setCanvasClear(true);
    setTimeout(() => setCanvasClear(false), 100);
  };

  return (
    <div className="fixed top-0 left-0 w-full py-8 px-10 bg-yellow-400 flex justify-between items-center z-50 shadow-xl border-b-4 border-pink-500 flex-wrap gap-y-8 h-[65px]">
      
      <div className="text-[50px] font-extrabold text-white drop-shadow-md tracking-widest rainbow-text animate-pulse">
  🎨 Paint Clone
</div>
  
      
      <div className="flex flex-wrap items-center gap-16">
        
        <button
          className={`text-6xl px-12 py-6 rounded-full font-bold shadow-lg transition-all duration-300 transform ${
            activeTool === 'Brush'
              ? 'bg-orange-500 text-white scale-110'
              : 'bg-orange-300 text-white hover:bg-orange-400 hover:scale-110'
          }`}
          onClick={() => handleToolChange('Brush')}
        >
          <FaBrush size={40} className="mr-8" /> 
        </button>
  
      
        <button
          className={`text-6xl px-12 py-6 rounded-full font-bold shadow-lg transition-all duration-300 transform ${
            activeTool === 'Eraser'
              ? 'bg-green-500 text-white scale-110'
              : 'bg-green-300 text-white hover:bg-green-400 hover:scale-110'
          }`}
          onClick={() => handleToolChange('Eraser')}
        >
          <FaEraser size={40} className="mr-8" />
        </button>
  
  
<div className="flex items-center gap-16 text-pink-800 font-semibold text-5xl">
  <input
    type="range"
    min="1"
    max="50"
    value={brushSize}
    onChange={handleBrushSizeChange}
    className="w-[32rem] h-14 accent-pink-600 cursor-pointer" 
  />
  <span className="text-5xl">{brushSize}px</span>
</div>

  
      
        <input
          type="color"
          onChange={(e) => setCurrentColor(e.target.value)}
          className="text-xl w-24 h-24 border-4 border-white rounded-full cursor-pointer shadow-md hover:scale-110 transition-transform"
        />
  
      
        <button
          onClick={handleClearCanvas}
          className="text-6xl bg-red-500 hover:bg-red-600 text-white px-12 py-6 rounded-full font-bold shadow-lg transition-all hover:scale-110 flex items-center gap-8"
        >
          <FaUndoAlt size={40} className="ml-80"/>
        </button>
      </div>
    </div>
  );
}
