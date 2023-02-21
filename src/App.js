import React, { useRef, useState, useEffect } from 'react';
import './App.css';

function App() {
    const block1Ref = useRef(null);
    const block2Ref = useRef(null);
    const circleRef = useRef(null);
    const [position, setPosition] = useState('block1');

    const handleMoveClick = () => {
        setPosition(position === 'block1' ? 'block2' : 'block1');
    };

    const getPosition = () => {
        const block1Rect = block1Ref.current
            ? block1Ref.current.getBoundingClientRect()
            : { top: 0, left: 0 };
        const block2Rect = block2Ref.current
            ? block2Ref.current.getBoundingClientRect()
            : { top: 0, left: 0 };
        const circleRect = circleRef.current
            ? circleRef.current.getBoundingClientRect()
            : { height: 0, width: 0 };

        if (position === 'block1') {
            return {
                top: block1Rect.top + circleRect.height / 2,
                left: block1Rect.left + circleRect.width / 2,
            };
        } else {
            const top = block1Rect.top + (block2Rect.top - block1Rect.top) / 2;
            const left = block2Rect.left + circleRect.width / 2;
            return { top, left };
        }
    };

    const [circleStyle, setCircleStyle] = useState({
        position: 'absolute',
        top: getPosition().top,
        left: getPosition().left,
    });

    useEffect(() => {
        const interval = setInterval(() => {
            setCircleStyle((prevStyle) => {
                const position = getPosition();
                const dx = position.left - prevStyle.left;
                const dy = position.top - prevStyle.top;
                const step = 5;

                if (Math.abs(dx) < step && Math.abs(dy) < step) {
                    return { ...prevStyle, top: position.top, left: position.left };
                }

                const x = prevStyle.left + (dx > 0 ? step : -step);
                const y = prevStyle.top + (dy > 0 ? step : -step);
                return { ...prevStyle, top: y, left: x };
            });
        }, 20);

        return () => clearInterval(interval);
    }, [position]);

    return (
        <div className="App">
            <div className="block1" ref={block1Ref} />
            <div className="block2" ref={block2Ref} />
            <div className="circle" ref={circleRef} style={circleStyle} />
            <button onClick={handleMoveClick}>Move</button>
        </div>
    );
}

export default App;
