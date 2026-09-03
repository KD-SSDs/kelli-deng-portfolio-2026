import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './GridMotion.css';

const GridMotion = ({ items = [], gradientColor = 'black' }) => {
  const gridRef = useRef(null);
  const rowRefs = useRef([]);

  const defaultItems = Array.from({ length: 28 }, (_, index) => `Item ${index + 1}`);
  const sourceItems = items.length > 0 ? items : defaultItems;
  // Four different permutations keep every source visible without stacking the
  // same image in one resting column.
  const rowOffsets = [0, 1, 2, 9];
  const rowSteps = [1, 2, 4, 11];

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const rows = rowRefs.current.filter(Boolean);
    if (reduceMotion || rows.length === 0) return;

    const xSetters = rows.map(row => gsap.quickTo(row, 'x', {
      duration: 0.9,
      ease: 'power3.out'
    }));

    const handleMouseMove = e => {
      const maxMoveAmount = 300;
      xSetters.forEach((setX, index) => {
        const direction = index % 2 === 0 ? 1 : -1;
        const moveAmount = ((e.clientX / window.innerWidth) * maxMoveAmount - maxMoveAmount / 2) * direction;
        setX(moveAmount);
      });
    };

    window.addEventListener('pointermove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('pointermove', handleMouseMove);
      gsap.killTweensOf(rows);
    };
  }, []);

  return (
    <div className="grid-motion" ref={gridRef}>
      <section
        className="grid-motion-stage"
        style={{
          background: `radial-gradient(circle, ${gradientColor} 0%, transparent 100%)`
        }}
      >
        <div className="grid-motion-container">
          {[...Array(4)].map((_, rowIndex) => (
            <div key={rowIndex} className="grid-motion-row" ref={el => {
                rowRefs.current[rowIndex] = el;
              }}>
              {[...Array(7)].map((_, itemIndex) => {
                const content = sourceItems[(rowOffsets[rowIndex] + itemIndex * rowSteps[rowIndex]) % sourceItems.length];
                return (
                  <div key={itemIndex} className="grid-motion-item">
                    <div className="grid-motion-item-inner" style={{ backgroundColor: '#111' }}>
                      {typeof content === 'string' && (content.startsWith('http') || content.startsWith('/')) ? (
                        <div
                          className="grid-motion-item-img"
                          style={{
                            backgroundImage: `url(${content})`
                          }}
                        ></div>
                      ) : (
                        <div className="grid-motion-item-content">{content}</div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
        <div className="grid-motion-fullview"></div>
      </section>
    </div>
  );
};

export default GridMotion;
