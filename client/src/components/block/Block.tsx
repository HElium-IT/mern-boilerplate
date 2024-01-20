import React, { useState, useRef, useCallback } from 'react';

export interface BlockProps {
    children: JSX.Element | JSX.Element[];
    draggable?: boolean;
    style?: React.CSSProperties;
    attrs?: React.HTMLAttributes<HTMLDivElement>;
}

export function Block({ children, draggable = false, style = {}, attrs = {} }: BlockProps) {
    const [position, setPosition] = useState({ x: 10, y: 10 });
    const dragStartPos = useRef({ x: 0, y: 0 });
    const startPos = useRef({ x: 0, y: 0 });
    const ref = useRef<HTMLDivElement>(null);

    const dragStart = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        if (draggable && ref.current) {
            dragStartPos.current = {
                x: e.clientX,
                y: e.clientY
            };
            startPos.current = { ...position };
            document.addEventListener('mousemove', elementDrag);
            document.addEventListener('mouseup', closeDragElement);
        }
    }, [draggable, position]);

    const elementDrag = useCallback((e: MouseEvent) => {
        if (draggable) {
            const dx = e.clientX - dragStartPos.current.x;
            const dy = e.clientY - dragStartPos.current.y;
            setPosition({
                x: startPos.current.x + dx,
                y: startPos.current.y + dy
            });
        }
    }, [draggable]);

    const closeDragElement = useCallback(() => {
        document.removeEventListener('mousemove', elementDrag);
        document.removeEventListener('mouseup', closeDragElement);
    }, []);

    // Block style
    const block_style = {
        position: draggable ? 'absolute' as 'absolute' : 'relative' as 'relative',
        borderRadius: '25px',
        border: '1px solid black',
        boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.25)',
        padding: '10px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        ...style,
        top: draggable ? position.y : undefined,
        left: draggable ? position.x : undefined,
    };

    // Header style
    const headerStyle = {
        width: '25px',
        height: '25px',
        borderRadius: '50%',
        backgroundColor: '#2196F3',
        color: '#fff',
        textAlign: 'center' as 'center',
        lineHeight: '30px',
        cursor: 'move',
        marginRight: '10px',
    };

    return (
        <div style={block_style} {...attrs} ref={ref}>
            {
                draggable && <div style={headerStyle} onMouseDown={dragStart}></div>
            }

            {children}
        </div>
    );
}