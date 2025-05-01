'use client'
import { useEffect, useRef, useState } from 'react'

export default function Canvas({
  currentColor,
  currentSize,
  isEraser,
  setDrawnArray,
  canvasClear,
}) {
  const canvasRef = useRef(null)
  const [isMouseDown, setIsMouseDown] = useState(false)
  const [lastPosition, setLastPosition] = useState(null)

  const clearCanvas = () => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    context.clearRect(0, 0, canvas.width, canvas.height)
    context.fillStyle = '#f5f5f5'
    context.fillRect(0, 0, canvas.width, canvas.height)
    setDrawnArray([])
  }

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    context.fillStyle = '#f5f5f5'
    context.fillRect(0, 0, canvas.width, canvas.height)
  }, [])

  useEffect(() => {
    if (canvasClear) {
      clearCanvas()
    }
  }, [canvasClear])

  const getMousePosition = (event) => {
    const boundaries = canvasRef.current.getBoundingClientRect()
    return {
      x: event.clientX - boundaries.left,
      y: event.clientY - boundaries.top,
    }
  }

  const handleMouseDown = (event) => {
    setIsMouseDown(true)
    const currentPosition = getMousePosition(event)
    setLastPosition(currentPosition)

    const context = canvasRef.current.getContext('2d')
    context.beginPath()
    context.moveTo(currentPosition.x, currentPosition.y)
    context.lineWidth = currentSize
    context.lineCap = 'round'
    context.strokeStyle = isEraser ? '#f5f5f5' : currentColor
  }

  const handleMouseMove = (event) => {
    if (!isMouseDown || !lastPosition) return

    const currentPosition = getMousePosition(event)
    const context = canvasRef.current.getContext('2d')

    const midPointX = (lastPosition.x + currentPosition.x) / 2
    const midPointY = (lastPosition.y + currentPosition.y) / 2

    context.quadraticCurveTo(lastPosition.x, lastPosition.y, midPointX, midPointY)
    context.stroke()

    storeDrawn(currentPosition.x, currentPosition.y)
    setLastPosition(currentPosition)
  }

  const handleMouseUp = () => {
    setIsMouseDown(false)
    setLastPosition(null)
  }

  const storeDrawn = (x, y) => {
    setDrawnArray((prev) => [
      ...prev,
      { x, y, size: currentSize, color: currentColor, eraser: isEraser },
    ])
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#f5f5f5]">
      <canvas
        ref={canvasRef}
        width={1200}
        height={600}
        className="cursor-crosshair border-4 border-purple-400 rounded-xl shadow-lg"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      />
    </div>
  )
}
