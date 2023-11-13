import React, { useState } from 'react';
import Shape from './Shape';
import './DrawingBoard.css';

interface ShapeData {
	id: number;
	type: 'rectangle' | 'circle';
	position: { x: number; y: number };
	size: { width: number; height: number };
}

function DrawingBoard() {
	// 상태 관리 및 이벤트 핸들러 구현
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const [shapes, setShapes] = useState<ShapeData[]>([]);
	const [selectedType, setSelectedType] = useState<'rectangle' | 'circle'>("rectangle");

	const clickAddShape = (e: React.MouseEvent<HTMLDivElement>) => {
		console.log("clickAddShape");
		// 만들어진 도형을 drawing-board에 추가
		const newShape: ShapeData = {
			id: shapes.length, // 간단한 예시로 id 설정
			type: selectedType, // 또는 'circle', 사용자 입력에 따라 결정 가능
			position: { x: e.clientX, y: e.clientY },
			size: { width: 100, height: 100 } // 고정 크기, 또는 사용자 정의 가능
		};
		setShapes([...shapes, newShape]);
	};

	return (
		<div className="drawing-board">
			<button className={"btn btn-blue"} onClick={() => {
				setSelectedType("rectangle");
			}}>Rectangle</button>
			<button className={"btn btn-blue ms-2"} onClick={() => {
				setSelectedType("circle");
			}}>Circle</button>

			<div className={"border-2"} onClick={clickAddShape}
			style={{ minHeight: "70vh"}} >
				{shapes.map(shape => (
					<Shape
						key={shape.id}
						type={shape.type}
						position={shape.position}
						size={shape.size}
					/>
				))}
			</div>

			{/* 도형을 렌더링하는 로직 */}
		</div>
	);
}

export default DrawingBoard;
