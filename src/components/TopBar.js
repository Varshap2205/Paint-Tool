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
  activeTool,
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
    <div className="topbar fixed top-0 left-0 w-full bg-yellow-400 z-50 shadow-xl border-b-4 border-pink-500 px-6 py-5">
      <div className="text-[32px] font-extrabold text-white text-center mb-6 rainbow-text animate-pulse sm:text-xl">
        🎨 Painting Tool
      </div>

      <div className="flex flex-wrap justify-center items-center gap-10">
        {/* Brush Button */}
        <button
          title="Brush"
          className={`text-2xl px-8 py-4 rounded-full font-bold shadow-lg transition-transform duration-200 cursor-pointer hover:scale-110 ${
            activeTool === 'Brush'
              ? 'bg-orange-500 text-white scale-105'
              : 'bg-orange-300 text-white hover:bg-orange-400'
          }`}
          onClick={() => handleToolChange('Brush')}
        >
          <FaBrush size={28} />
        </button>

        {/* Eraser Button */}
        <button
          title="Eraser"
          className={`text-2xl px-8 py-4 rounded-full font-bold shadow-lg transition-transform duration-200 cursor-pointer hover:scale-110 ${
            activeTool === 'Eraser'
              ? 'bg-green-500 text-white scale-105'
              : 'bg-green-300 text-white hover:bg-green-400'
          }`}
          onClick={() => handleToolChange('Eraser')}
        >
          <FaEraser size={28} />
        </button>

        {/* Brush Size */}
        <div className="flex flex-col items-center text-pink-800 font-semibold">
          <input
            type="range"
            min="1"
            max="50"
            value={brushSize}
            onChange={handleBrushSizeChange}
            className="w-44 sm:w-36 accent-pink-600"
          />
          <span className="text-lg mt-1">{brushSize}px</span>
        </div>

        {/* Color Picker */}
        <input
          title="Pick Color"
          type="color"
          onChange={(e) => setCurrentColor(e.target.value)}
          className="w-12 h-12 border-4 border-white rounded-full cursor-pointer shadow-md"
        />

        {/* Clear Button */}
        <button
          title="Clear Canvas"
          onClick={handleClearCanvas}
          className="text-2xl bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-full font-bold shadow-lg flex items-center transition-transform duration-200 cursor-pointer hover:scale-110"
        >
          <FaUndoAlt size={28} className="mr-3" />
          Clear
        </button>
      </div>
    </div>
  );
}
