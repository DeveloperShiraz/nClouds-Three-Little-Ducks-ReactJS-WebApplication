import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <p style={{ fontSize: '1.2em', opacity: 0.8, marginBottom: '2em' }}>
        Experience the power of modern web development.
      </p>
      
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          Count is {count}
        </button>
        <p style={{ marginTop: '1em' }}>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      
      <div className="card" style={{ marginTop: '1em', background: 'var(--color-bg-primary)' }}>
        <p>
          State-of-the-art aesthetics with <br/>
          <span style={{ color: 'var(--color-accent)', fontWeight: 'bold' }}>Vanilla CSS</span> & <span style={{ color: '#42d392', fontWeight: 'bold' }}>Vite</span>
        </p>
      </div>

      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
