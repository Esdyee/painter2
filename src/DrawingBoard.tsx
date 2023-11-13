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

	useEffect(() => {
		const shapesJson = localStorage.getItem("shapes");
		if (shapesJson) {
			const shapes = JSON.parse(shapesJson);
			setShapes(shapes);
		}
	}, []);

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

	const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
		console.log("handleMouseDown")
		setStartPosition({ x: e.clientX, y: e.clientY });
		setIsDrawing(true);
	};

	const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
		if (!isDrawing) return;
		updateCurrentShape(e.clientX, e.clientY);
	};

	const handleMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
		if (!isDrawing || !startPosition) return;
		if (currentShape === null) {
			setIsDrawing(false);
			return;
		}

		setShapes([...shapes, currentShape as ShapeData]);
		setIsDrawing(false);
		setStartPosition(null);
		setCurrentShape(null);

		// local storage에 저장
		const shapesJson = JSON.stringify([...shapes, currentShape as ShapeData]);
		localStorage.setItem("shapes", shapesJson);
	};

	const handleShapeClick = (key: number) => {
		console.log("handleShapeClick", key);
		setSelectedShape(key);
	};

	function shapeAllClear() {
		setShapes([]);
		localStorage.removeItem("shapes");
	}

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
