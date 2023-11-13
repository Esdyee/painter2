import React from 'react';

// 도형의 타입과 위치, 크기에 대한 인터페이스 정의
interface ShapeProps {
	type: 'rectangle' | 'circle'; // 예시로 'rectangle'과 'circle'을 사용
	position: {
		x: number;
		y: number;
	};
	size: {
		width: number;
		height: number;
	};
}

const Shape: React.FC<ShapeProps> = ({ type, position, size }) => {
	// 도형 렌더링 로직

	// 스타일 계산
	const style = {
		left: `${position.x}px`,
		top: `${position.y}px`,
		width: `${size.width}px`,
		height: `${size.height}px`,
		// 추가적인 스타일링이 필요할 수 있음
	};

	return (
		<div className={`shape ${type}`} style={style}>
			{/* 도형 내용 */}
			도형
		</div>
	);
};

export default Shape;
