import React, { useEffect, useState } from 'react';
import { Sequence } from './sequence';
import ArrowImg from './assets/arrow.png';

export default function SortingTree({ solved, setSolved, size, sequence }: {
  solved: boolean,
  setSolved: (solved: boolean) => void,
  size: number,
  sequence: Array<Sequence>,
}) {
  const [leftSelected, setLeftSelected] = useState(-1);
  const [rightSelected, setRightSelected] = useState(-1);

  const [hasChildren, setHasChildren] = useState(false);

  const [leftSolved, setLeftSolved] = useState(false);
  const [rightSolved, setRightSolved] = useState(false);

  const [leftSequence, setLeftSequence] = useState<Array<Sequence>>([]);
  const [rightSequence, setRightSequence] = useState<Array<Sequence>>([]);

  useEffect(() => {
    setLeftSelected(-1);
    setRightSelected(-1);
    setLeftSolved(false);
    setRightSolved(false);
  }, [sequence]);

  useEffect(() => {
    if (leftSelected === -1 || rightSelected === -1 || leftSelected === rightSelected) {
      setHasChildren(false);
    }
    else {
      setHasChildren(true);
      setLeftSequence(sequence.filter(s => s.weight[leftSelected] < s.weight[rightSelected]));
      setRightSequence(sequence.filter(s => s.weight[leftSelected] > s.weight[rightSelected]));
    }
  }, [sequence, leftSelected, rightSelected]);

  useEffect(() => {
    if (sequence.length <= 1) setSolved(true);
    else setSolved(leftSelected !== -1 && rightSelected !== -1 && leftSelected !== rightSelected && leftSolved && rightSolved);
  }, [sequence, leftSelected, rightSelected, leftSolved, rightSolved]);

  return (
    <div>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: solved ? '#e5ffea' : '#9bccff',
        border: '1px solid',
        borderColor: solved ? '#00e226' : '#0080FF',
        borderRadius: '1em',
        padding: '1em',
        minWidth: '15em',
      }}>
        <div>{sequence.length > 0 ? sequence.map(s => s.repr).join(' ') : '（空）'}</div>
        {sequence.length > 1 && <div>
          <select value={leftSelected} onChange={(e) => setLeftSelected(Number(e.target.value))}>
            <option value={-1}>-</option>
            {Array.from({ length: size }, (_, i) => i).map(i => <option value={i} key={i}>{String.fromCharCode(65 + i)}</option>)}
          </select>
          と
          <select value={rightSelected} onChange={(e) => setRightSelected(Number(e.target.value))}>
            <option value={-1}>-</option>
            {Array.from({ length: size }, (_, i) => i).map(i => <option value={i} key={i}>{String.fromCharCode(65 + i)}</option>)}
          </select>
          を比較する
        </div>}
      </div>
      {hasChildren && (
        <div>
          <div></div>
          <div style={{ display: 'flex', gap: '1em' }}>
            <div style={{ flex: '1 0 0' }}>
              <div style={{ margin: '0.2em auto', width: '2em', height: '2em' }}><img src={ArrowImg} alt="arrow" style={{ height: '100%', width: '100%' }} /></div>
              <SortingTree solved={leftSolved} setSolved={setLeftSolved} size={size} sequence={leftSequence} />
            </div>
            <div style={{ flex: '1 0 0' }}>
              <div style={{ margin: '0.2em auto', width: '2em', height: '2em' }}><img src={ArrowImg} alt="arrow" style={{ height: '100%', width: '100%' }} /></div>
              <SortingTree solved={rightSolved} setSolved={setRightSolved} size={size} sequence={rightSequence} />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
