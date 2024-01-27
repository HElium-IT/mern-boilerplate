import React, { useState, useRef, useCallback, useEffect } from 'react';

export interface BlockProps extends React.HTMLAttributes<HTMLDivElement> {
    children: JSX.Element | JSX.Element[];
    is_draggable?: Boolean;
}

export function Block(props: BlockProps) {
    const { children, is_draggable, className, style } = props;

    const padding = 10;
    const [position, setPosition] = useState({ x: (style?.left as number) ?? padding, y: (style?.top as number) ?? padding });

    const [draggable_style, setDraggableStyle] = useState<React.CSSProperties>({
        ...style,
    });



    const dragStartPos = useRef({ x: 0, y: 0 });
    const startPos = useRef({ x: 0, y: 0 });
    const ref = useRef<HTMLDivElement>(null);


    useEffect(() => {

        if (is_draggable) {
            console.log(`\n${children.props.children}: ${position.x} | ${position.y}`);
            setDraggableStyle({
                ...style,
                top: position.y,
                left: position.x,
            });
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

    }, [position, style, is_draggable])


    const elementDrag = useCallback((e: MouseEvent) => {
        if (is_draggable) {
            const dx = e.clientX - dragStartPos.current.x;
            const dy = e.clientY - dragStartPos.current.y;
            setPosition({ x: startPos.current.x + dx, y: startPos.current.y + dy, })
        }
    }, [is_draggable, dragStartPos, startPos]);

    const closeDragElement = useCallback((e: MouseEvent) => {
        document.removeEventListener('mousemove', elementDrag);
        document.removeEventListener('mouseup', closeDragElement);
    }, [elementDrag]);

    const dragStart = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        if (is_draggable && ref.current) {
            dragStartPos.current = {
                x: e.clientX,
                y: e.clientY
            };
            startPos.current = { ...position };
            document.addEventListener('mousemove', elementDrag);
            document.addEventListener('mouseup', closeDragElement);
        }
    }, [is_draggable, position, dragStartPos, startPos, elementDrag, closeDragElement]);


    return (
        <div {...props}
            ref={ref}
            className={
                'block ' +
                (is_draggable ? 'draggable ' : '') +
                (className ?? '')}

            style={
                is_draggable ? draggable_style : style
            }
        >
            {
                is_draggable && <div className='block-header' onMouseDown={dragStart}></div>
            }

            {children}
        </div>
    );
}