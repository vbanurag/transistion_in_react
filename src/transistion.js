import React from 'react'
import { LinearCopy } from 'gl-react'
import { Surface } from 'gl-react-dom'
import GLTransition from 'react-gl-transition'
import GLTransitions from 'gl-transitions'
import timeLoop from './timeloop'
import images from './images'
import Play from './play'
import Pause from './pause'

const transistionName = [
  'fade',
  'wipeleft',
  'windowslice',
  'circleopen',
  'wipeup',
  'wiperight',
  'directional',
  'kaleidoscope'
]

const allTransistion = GLTransitions.reduce((acc, curr) => {
  if (transistionName.includes(curr.name.toLowerCase())) {
    acc.push(curr)
  }
  return acc
}, [])

const Slideshow = timeLoop(({ slides, delay, duration, time }) => {
  const index = Math.floor(time / (delay + duration))
  const from = slides[index % slides.length]
  const to = slides[(index + 1) % slides.length]
  const transition = allTransistion[index % allTransistion.length]
  const total = delay + duration
  const progress = (time - index * total - delay) / duration

  return progress > 0 ? (
    <GLTransition from={from} to={to} progress={progress} transition={transition} />
  ) : (
    <LinearCopy>{from}</LinearCopy>
  )
})

export default class Transistion extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      playing: true
    }
  }

  playerHandler = (type, value) => {
    this.setState({
      playing: !this.state.playing
    })
  }

  render() {
    return (
      <React.Fragment>
        <Surface width={600} height={400}>
          {this.state.playing ? <Slideshow slides={images} delay={2000} duration={3000} /> : null}
        </Surface>
        <div style={{ height: '10px', width: '10px', margin: '0 auto' }}>
          {this.state.playing ? (
            <Pause onPlayerClick={this.playerHandler} />
          ) : (
            <Play onPlayerClick={this.playerHandler} />
          )}
        </div>
      </React.Fragment>
    )
  }
}
