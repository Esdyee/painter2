import React, { useEffect, useState } from 'react';
import Shape from './Shape';
import './DrawingBoard.css';

interface ShapeData {
	key: number;
	type: 'rectangle' | 'circle';
	position: { x: number; y: number };
	size: { width: number; height: number };
}

function DrawingBoard() {
	const [shapes, setShapes] = useState<ShapeData[]>([]);
	const [selectedType, setSelectedType] = useState<'rectangle' | 'circle'>("rectangle");
	const [isDrawing, setIsDrawing] = useState(false);
	const [startPosition, setStartPosition] = useState<{ x: number; y: number } | null>(null);
	const [currentShape, setCurrentShape] = useState<ShapeData | null>(null);

	// 선택된 도형
	const [selectedShape, setSelectedShape] = useState<number | null>(null);

	// 드래그
	const [isDragging, setIsDragging] = useState(false);
	const [dragOffset, setDragOffset] = useState<{ x: number; y: number } | null>(null);

	useEffect(() => {
		const shapesJson = localStorage.getItem("shapes");
		if (shapesJson) {
			const shapes = JSON.parse(shapesJson);
			setShapes(shapes);
		}
	}, []);

	// 초기 도형 생성
	const updateCurrentShape = (clientX: number, clientY: number) => {
		if (!startPosition) return;

		//랜덤 ID 생성
		const id = Math.floor(Math.random() * 10000000);

		const newShape: ShapeData = {
			key: id, // 임시 ID
			type: selectedType,
			position: {
				x: Math.min(clientX, startPosition.x),
				y: Math.min(clientY, startPosition.y)
			},
			size: {
				width: Math.abs(clientX - startPosition.x),
				height: Math.abs(clientY - startPosition.y)
			}
		};

		setCurrentShape(newShape);
	};

	// 마우스 다운 이벤트
	const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {

		if (selectedShape !== null) {
			e.stopPropagation();
			setIsDragging(true);
			const shape = shapes.find(shape => shape.key === selectedShape);
			if (!shape) return;
			setDragOffset({ x: e.clientX - shape.position.x, y: e.clientY - shape.position.y });
		} else {
			setStartPosition({ x: e.clientX, y: e.clientY });
			setIsDrawing(true);
		}

	};

	// 마우스 무브 이벤트(드래그)
	const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
		if (isDragging && selectedShape !== null && dragOffset) {
			const newShapes = shapes.map(shape => {
				if (shape.key === selectedShape) {
					return {
						...shape,
						position: {
							x: e.clientX - dragOffset.x,
							y: e.clientY - dragOffset.y
						}
					};
				}
				return shape;
			});
			setShapes(newShapes);
		} else if (isDrawing) {
			updateCurrentShape(e.clientX, e.clientY);
		}

	};

	// 마우스 업 이벤트
	// localStorage에 저장
	const handleMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
		if (isDrawing && startPosition && currentShape) {
			setShapes([...shapes, currentShape]);
			setCurrentShape(null);
			const shapesJson = JSON.stringify([...shapes, currentShape]);
			localStorage.setItem("shapes", shapesJson);
		}
		setIsDrawing(false);
		setIsDragging(false);
		setStartPosition(null);
	};

	const handleShapeClick = (key: number) => {
		console.log("handleShapeClick", key);
		setSelectedShape(key);
	};

	// 도형 전체 삭제
	function shapeAllClear() {
		setShapes([]);
		localStorage.removeItem("shapes");
	}

	// 도형 삭제
	function shapeRemove() {
		if (selectedShape === null) {
			return;
		}
		const newShapes = shapes.filter(shape => shape.key !== selectedShape);
		setShapes(newShapes);
		setSelectedShape(null);
		localStorage.setItem("shapes", JSON.stringify(newShapes));
	}

	return (
		<div className="drawing-board">
			<button className={"btn btn-blue"} onClick={() => setSelectedType("rectangle")}>Rectangle</button>
			<button className={"btn btn-blue ms-2"} onClick={() => setSelectedType("circle")}>Circle</button>
			<button className={"btn btn-blue ms-2"} onClick={() => shapeAllClear()}>Clear</button>
			<button className={"btn btn-blue ms-2"} onClick={() => shapeRemove()}>Remove</button>

			<pre>
				{JSON.stringify(selectedShape, null, 2)}
				{/*{shapes[selectedShape]}*/}
			</pre>
			<div className={"border-2"} onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}
			     style={{ minHeight: "70vh" }}>
				{shapes.map(shape => (
					<Shape
						onClick={() => {
							handleShapeClick(shape.key);
						}}
						key={shape.key}
						type={shape.type}
						position={shape.position}
						size={shape.size}
					/>
				))}
				{currentShape ? (
					<Shape
						onClick={handleShapeClick}
						key={currentShape.key}
						type={currentShape.type}
						position={currentShape.position}
						size={currentShape.size}
					/>
				) : <div></div>}

			</div>
		</div>
	);
}

export default DrawingBoard;
