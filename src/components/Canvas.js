'use client';
import { useEffect, useRef, useState } from 'react';

export default function Canvas({
  currentColor,
  currentSize,
  isEraser,
  setDrawnArray,
  canvasClear,
}) {
  const canvasRef = useRef(null);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [lastPosition, setLastPosition] = useState(null);
  const [canvasDimensions, setCanvasDimensions] = useState({ width: 600, height: 600 });

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = '#f5f5f5';
    context.fillRect(0, 0, canvas.width, canvas.height);
    setDrawnArray([]);
  };

  useEffect(() => {
    const handleResize = () => {
      const topbar = document.querySelector('.topbar');
      const topbarHeight = topbar?.offsetHeight || 0;
      const padding = 40;
      const fullHeight = window.innerHeight;

      if (window.innerWidth < 768) {
        // Mobile
        setCanvasDimensions({
          width: window.innerWidth,
          height: fullHeight - topbarHeight,
        });
      } else {
        // Desktop
        setCanvasDimensions({
          width: window.innerWidth - padding * 2,
          height: fullHeight - topbarHeight - padding * 2,
        });
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (canvasClear) {
      clearCanvas();
    }
  }, [canvasClear]);

  const getPosition = (event) => {
    const boundaries = canvasRef.current.getBoundingClientRect();
    const x = event.clientX || (event.touches ? event.touches[0].clientX : 0);
    const y = event.clientY || (event.touches ? event.touches[0].clientY : 0);
    return {
      x: x - boundaries.left,
      y: y - boundaries.top,
    };
  };

  const handleMouseDown = (event) => {
    setIsMouseDown(true);
    const currentPosition = getPosition(event);
    setLastPosition(currentPosition);

    const context = canvasRef.current.getContext('2d');
    context.beginPath();
    context.moveTo(currentPosition.x, currentPosition.y);
    context.lineWidth = currentSize;
    context.lineCap = 'round';
    context.strokeStyle = isEraser ? '#f5f5f5' : currentColor;
  };

  const handleMouseMove = (event) => {
    if (!isMouseDown || !lastPosition) return;

    const currentPosition = getPosition(event);
    const context = canvasRef.current.getContext('2d');

    const midPointX = (lastPosition.x + currentPosition.x) / 2;
    const midPointY = (lastPosition.y + currentPosition.y) / 2;

    context.quadraticCurveTo(lastPosition.x, lastPosition.y, midPointX, midPointY);
    context.stroke();

    storeDrawn(currentPosition.x, currentPosition.y);
    setLastPosition(currentPosition);
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
    setLastPosition(null);
  };

  const handleTouchStart = (event) => {
    setIsMouseDown(true);
    const currentPosition = getPosition(event);
    setLastPosition(currentPosition);

    const context = canvasRef.current.getContext('2d');
    context.beginPath();
    context.moveTo(currentPosition.x, currentPosition.y);
    context.lineWidth = currentSize;
    context.lineCap = 'round';
    context.strokeStyle = isEraser ? '#f5f5f5' : currentColor;
  };

  const handleTouchMove = (event) => {
    if (!isMouseDown || !lastPosition) return;

    const currentPosition = getPosition(event);
    const context = canvasRef.current.getContext('2d');

    const midPointX = (lastPosition.x + currentPosition.x) / 2;
    const midPointY = (lastPosition.y + currentPosition.y) / 2;

    context.quadraticCurveTo(lastPosition.x, lastPosition.y, midPointX, midPointY);
    context.stroke();

    storeDrawn(currentPosition.x, currentPosition.y);
    setLastPosition(currentPosition);
  };

  const handleTouchEnd = () => {
    setIsMouseDown(false);
    setLastPosition(null);
  };

  const storeDrawn = (x, y) => {
    setDrawnArray((prev) => [
      ...prev,
      { x, y, size: currentSize, color: currentColor, eraser: isEraser },
    ]);
  };

  return (
    <div
      className="fixed top-[100px] left-0 w-full flex justify-center items-center bg-[#f5f5f5]"
      style={{ height: `calc(100vh - 100px)` }}
    >
      <canvas
        ref={canvasRef}
        width={canvasDimensions.width}
        height={canvasDimensions.height}
        className="cursor-crosshair border-4 border-purple-400 rounded-xl shadow-lg"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      />
    </div>
  );
}
