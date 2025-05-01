// src/app/page.js
'use client'

import { useState } from 'react'
import TopBar from '../components/TopBar'
import Canvas from '../components/Canvas'

export default function HomePage() {
  const [currentColor, setCurrentColor] = useState('#000000')
  const [currentSize, setCurrentSize] = useState(10)
  const [isEraser, setIsEraser] = useState(false)
  const [activeTool, setActiveTool] = useState('Brush')
  const [drawnArray, setDrawnArray] = useState([])
  const [canvasClear, setCanvasClear] = useState(false)

  return (
    <div className="relative">
      <TopBar
        setActiveTool={setActiveTool}
        setCurrentColor={setCurrentColor}
        setCurrentSize={setCurrentSize}
        setIsEraser={setIsEraser}
        setDrawnArray={setDrawnArray}
        setCanvasClear={setCanvasClear}
      />
      <Canvas
        currentColor={currentColor}
        currentSize={currentSize}
        isEraser={isEraser}
        setDrawnArray={setDrawnArray}
        canvasClear={canvasClear}
      />
    </div>
  )
}
