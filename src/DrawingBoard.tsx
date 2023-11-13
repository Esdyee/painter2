import React, { useState } from 'react';
import Shape from './Shape';
import "./DrawingBoard.css";

function DrawingBoard() {
	// 상태 관리 및 이벤트 핸들러 구현
	function clickAddShape() {
		// 도형 추가 로직


		// 만들어진 도형을 drawing-board에 추가

	}
	return (
		<div className="drawing-board">
			<button onClick={clickAddShape}>도형 추가</button>
			<div className="border">
				abcabc abc
			</div>
			{/* 도형을 렌더링하는 로직 */}
		</div>
	);
}

export default DrawingBoard;
