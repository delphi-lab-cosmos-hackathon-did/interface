// Fork from https://github.com/marcusmolchany/react-jazzicon

import { Box, BoxProps } from '@mui/material'
import Color from 'color'
import keccak256 from 'keccak256'
import MersenneTwister from 'mersenne-twister'
import React from 'react'

const colors = [
  '#01888C', // teal
  '#FC7500', // bright orange
  '#034F5D', // dark teal
  '#F73F01', // orangered
  '#FC1960', // magenta
  '#C7144C', // raspberry
  '#F3C100', // goldenrod
  '#1598F2', // lightning blue
  '#2465E1', // sail blueCon
  '#F19E02', // gold
]

const shapeCount = 3
const svgns = 'http://www.w3.org/2000/svg'
const wobble = 30

type Props = BoxProps & {
  address: string
  diameter?: number
}

export const JazzIcon = React.memo((props: Props) => {
  const { address, diameter = 30, ...restProps } = props

  const genColor = (colors: string[]) => {
    generator.random()
    const index = Math.floor(colors.length * generator.random())
    return colors.splice(index, 1)[0]
  }

  const hueShift = (colors: string[]) => {
    const amount = generator.random() * 30 - wobble / 2
    return colors.map(function (hex) {
      const color = Color(hex)
      color.rotate(amount)
      return color.hex()
    })
  }

  const genShape = (
    remainingColors: string[],
    diameter: number,
    index: number,
    total: number,
  ) => {
    const center = diameter / 2
    const firstRot = generator.random()
    const angle = Math.PI * 2 * firstRot
    const velocity =
      (diameter / total) * generator.random() + (index * diameter) / total
    const tx = Math.cos(angle) * velocity
    const ty = Math.sin(angle) * velocity
    const translate = 'translate(' + tx + ' ' + ty + ')'

    // Third random is a shape rotation on top of all of that.
    const secondRot = generator.random()
    const rot = firstRot * 360 + secondRot * 180
    const rotate =
      'rotate(' + rot.toFixed(1) + ' ' + center + ' ' + center + ')'
    const transform = translate + ' ' + rotate
    const fill = genColor(remainingColors)

    return (
      <rect
        key={index}
        x="0"
        y="0"
        rx="0"
        ry="0"
        height={diameter}
        width={diameter}
        transform={transform}
        fill={fill}
      />
    )
  }

  const seed = parseInt(keccak256(address).toString('hex').slice(2, 16), 16)
  const generator = new MersenneTwister(seed)
  const remainingColors = hueShift(colors.slice())
  const backgroundColor = genColor(remainingColors)
  const shapesArr = Array(shapeCount).fill(0)

  return (
    <Box
      overflow="hidden"
      borderRadius="500px"
      width={diameter}
      height={diameter}
      bgcolor={backgroundColor}
      flexShrink={0}
      {...restProps}
    >
      <svg xmlns={svgns} x="0" y="0" height={diameter} width={diameter}>
        {shapesArr.map((_, index) =>
          genShape(remainingColors, diameter, index, shapeCount),
        )}
      </svg>
    </Box>
  )
})
