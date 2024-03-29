import { PageSEO } from '@/components/SEO'
import { Flex } from '@chakra-ui/react'
import Head from 'next/head'
import React, { useRef, useState, useEffect } from 'react'
import { CubeTexture } from 'three'
import { ccw, rInt } from 'utils/math'

export default function App() {
  const canvasRef = useRef(null)
  const [canvasTag, setCanvasTag] = useState([])
  const [n_points, set_n_points] = useState(20)
  const [varForTrigger, setVarForTrigger] = useState(0)
  const [nPointsInvolved, setnPointsInvolved] = useState(0)

  useEffect(() => {
    const canvas = canvasRef.current
    canvas.style.width = '100%'
    canvas.style.height = '100%'
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    const width = canvas.offsetWidth
    const height = canvas.offsetHeight

    //canvas.width = width
    //canvas.height = height

    const context = canvas.getContext('2d')

    context.strokeStyle = 'black'
    context.fillStyle = 'black'
    context.lineWidth = 5

    var points = Array(n_points)

    for (let i = 0; i < n_points; i++) {
      points[i] = [rInt(0, width), rInt(0, height)]
    }

    points.sort((p1, p2) => {
      return -p1[0] + p2[0]
    })

    var stack = [points[0]]
    var left = points.slice(1)

    left.sort((p1, p2) => {
      var slope1 = (p1[1] - points[0][1]) / (p1[0] - points[0][0])
      var slope2 = (p2[1] - points[0][1]) / (p2[0] - points[0][0])
      return slope1 - slope2
    })

    while (left.length) {
      var current = left.pop()
      var True = true
      while (True) {
        if (stack.length <= 1) {
          stack.push(current)
          break
        }
        if (ccw(...stack[stack.length - 2], ...stack[stack.length - 1], ...current) > 0) {
          stack.push(current)
          break
        } else {
          stack.pop()
        }
      }
      setnPointsInvolved(stack.length)
    }

    /*
        context.beginPath(); 
        context.moveTo(0, 0); 
        context.lineTo(100, 100); 
        context.stroke();

        context.beginPath(); 
        context.arc(100, 100, 100, 0, 2 * Math.PI, false); 
        context.fill()*/

    context.beginPath()
    context.fillStyle = '#FFa9a3'
    context.moveTo(...stack[0])
    stack.forEach((p) => {
      context.lineTo(...p)
    })
    context.closePath()
    context.fill()

    context.fillStyle = 'black'
    points.forEach((p, idx) => {
      context.beginPath()
      context.arc(p[0], p[1], 3, 0, 2 * Math.PI, false)
      context.fill()
    })

    context.fillStyle = 'blue'
    stack.forEach((p, idx) => {
      context.beginPath()
      context.arc(p[0], p[1], 3, 0, 2 * Math.PI, false)
      context.fill()
    })

    setCanvasTag(canvas)
  }, [n_points, varForTrigger])

  return (
    <>
      <PageSEO title="Convex hull generation" />

      <p className="text-3xl">Convex Hull generation</p>
      <p>
        Following js code generates convex hull, using Graham scan algorithm. The whole process
        takes O(nlogn) time complexity.
      </p>

      <div className="my-5 flex place-items-center justify-center">
        <input
          type="number"
          className="mx-3 border-0"
          defaultValue={20}
          min={3}
          onChange={(e) => {
            if (e.target.value >= 3) {
              set_n_points(e.target.value)
            }
          }}
        ></input>
        <button
          className="rounded-xl bg-gray-300 p-2"
          onClick={() => {
            setVarForTrigger(varForTrigger + 1)
          }}
        >
          Generate
        </button>
      </div>

      <Flex backgroundColor="gray.100" height="70vh" rounded="3xl" p="5">
        <canvas ref={canvasRef} className=""></canvas>
      </Flex>

      <p className="">Number of points on edge : {nPointsInvolved}</p>
    </>
  )
}
