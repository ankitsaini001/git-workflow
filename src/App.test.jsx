import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from './App.jsx'

describe('App', () => {
  it('renders without crashing', () => {
    const { container } = render(<App />)

    expect(container).not.toBeEmptyDOMElement()
  })

  it('shows the "Hello World" heading', () => {
    render(<App />)

    const heading = screen.getByRole('heading', { level: 1, name: 'Hello World' })
    expect(heading).toBeInTheDocument()
  })

  it('renders exactly one heading', () => {
    render(<App />)

    expect(screen.getAllByRole('heading')).toHaveLength(1)
  })

  it('places the heading inside the #center section', () => {
    const { container } = render(<App />)

    const center = container.querySelector('section#center')
    expect(center).toBeInTheDocument()
    expect(center).toContainElement(screen.getByRole('heading', { name: 'Hello World' }))
  })

  it('renders the ticks divider and the spacer section', () => {
    const { container } = render(<App />)

    expect(container.querySelector('div.ticks')).toBeInTheDocument()
    expect(container.querySelector('section#spacer')).toBeInTheDocument()
  })

  it('renders the top-level elements in order: center, ticks, spacer', () => {
    const { container } = render(<App />)

    const topLevel = Array.from(container.children).map(
      (el) => el.id || el.className,
    )
    expect(topLevel).toEqual(['center', 'ticks', 'spacer'])
  })

  it('does not render the commented-out counter button or logos', () => {
    render(<App />)

    expect(screen.queryByRole('button')).not.toBeInTheDocument()
    expect(screen.queryByRole('img')).not.toBeInTheDocument()
  })
})
