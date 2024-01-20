import React, { useState, useRef, useCallback, useEffect } from 'react';

export interface BlockProps extends React.HTMLAttributes<HTMLDivElement> {
    children: JSX.Element | JSX.Element[];
    _draggable?: Boolean;
    _style?: React.CSSProperties;
    type?: string;
}

export function Block(props: BlockProps) {
    const { children, _draggable, _style } = props;


    const padding = 10;
    const [position, setPosition] = useState({ x: padding, y: padding });

    const [blockStyle, setBlockStyle] = React.useState<React.CSSProperties>({
        position: _draggable ? 'absolute' : 'relative',
        borderRadius: '25px',
        border: '1px solid black',
        boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.25)',
        padding: '10px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    })


    const dragStartPos = useRef({ x: 0, y: 0 });
    const startPos = useRef({ x: 0, y: 0 });
    const ref = useRef<HTMLDivElement>(null);


    useEffect(() => {
        setBlockStyle(blockStyle => ({
            ...blockStyle,
            ..._style,
            top: _draggable ? position.y : blockStyle.top,
            left: _draggable ? position.x : blockStyle.left,
        }))
        if (_draggable) {
            // console.log(`\n${children.props.children}: ${position.x} | ${position.y}`)
            if (position.x < padding) {
                setPosition({ x: padding, y: position.y })
            }
            if (position.y < padding) {
                setPosition({ x: position.x, y: padding })
            }
            // now do the same for the max values, refferint to parent div, consider padding
            if (ref.current) {
                const parentWidth = ref.current.parentElement?.clientWidth || 0;
                const parentHeight = ref.current.parentElement?.clientHeight || 0;
                const childWidth = ref.current.clientWidth;
                const childHeight = ref.current.clientHeight;
                if (position.x + childWidth > parentWidth - padding) {
                    setPosition({ x: parentWidth - padding - childWidth, y: position.y })
                }
                if (position.y + childHeight > parentHeight - padding) {
                    setPosition({ x: position.x, y: parentHeight - padding - childHeight })
                }
            }

        }

    }, [position, _style, _draggable])


    const elementDrag = useCallback((e: MouseEvent) => {
        if (_draggable) {
            const dx = e.clientX - dragStartPos.current.x;
            const dy = e.clientY - dragStartPos.current.y;
            setPosition({ x: startPos.current.x + dx, y: startPos.current.y + dy, })
        }
    }, [_draggable, dragStartPos, startPos]);

    const closeDragElement = useCallback((e: MouseEvent) => {
        document.removeEventListener('mousemove', elementDrag);
        document.removeEventListener('mouseup', closeDragElement);
    }, [elementDrag]);

    const dragStart = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        if (_draggable && ref.current) {
            dragStartPos.current = {
                x: e.clientX,
                y: e.clientY
            };
            startPos.current = { ...position };
            document.addEventListener('mousemove', elementDrag);
            document.addEventListener('mouseup', closeDragElement);
        }
    }, [_draggable, position, dragStartPos, startPos, elementDrag, closeDragElement]);




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
        <div style={blockStyle} ref={ref} {...props}>
            {
                _draggable && <div style={headerStyle} onMouseDown={dragStart}></div>
            }

            {children}
        </div>
    );
}