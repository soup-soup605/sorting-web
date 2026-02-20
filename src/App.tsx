import React, { useEffect, useState } from 'react'
import SortingTree from './SortingTree'
import { Sequence } from './sequence';

function App() {
  const [size, setSize] = useState(2);
  const [solved, setSolved] = useState(false);
  const [sequence, setSequence] = useState<Array<Sequence>>([]);

  useEffect(() => {
    const len = Array.from({ length: size }, (_, i) => i + 1).reduce((acc, curr) => acc * curr);
    setSequence(Array.from({ length: len }, (_, i) => new Sequence(len - i - 1, size)));
  }, [size]);

  return (
    <>
      <div style={{ display: 'flex', gap: '1em', marginBottom: '1em' }}>
        <div style={{ margin: 'auto 0' }}>ソートする要素数を選択</div>
        <select value={size} onChange={(e) => setSize(Number(e.target.value))}>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
        </select>
      </div>
      <SortingTree solved={solved} setSolved={setSolved} size={size} sequence={sequence} />
    </>
  )
}

export default App
