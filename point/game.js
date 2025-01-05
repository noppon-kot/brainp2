// ตัวแปรสำหรับจุดและเส้น
const gridSize = 4; // 4x4 grid
const points = []; // เก็บตำแหน่งจุด
const exampleLines = []; // เส้นตัวอย่าง
const userLines = []; // เส้นที่ผู้เล่นลาก

let currentLine = null; // เส้นที่กำลังลาก

// วาดจุดบน Canvas
function drawPoints(ctx) {
  const gap = ctx.canvas.width / (gridSize + 1);
  points.length = 0; // รีเซ็ตจุด

  for (let row = 1; row <= gridSize; row++) {
    for (let col = 1; col <= gridSize; col++) {
      const x = col * gap;
      const y = row * gap;
      points.push({ x, y });
      ctx.beginPath();
      ctx.arc(x, y, 5, 0, Math.PI * 2);
      ctx.fillStyle = "black";
      ctx.fill();
    }
  }
}

// ฟังก์ชันวาดเส้นที่ผู้เล่นวาด
function drawLines(ctx, lines) {
  lines.forEach(([start, end]) => {
    ctx.beginPath();
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(end.x, end.y);
    ctx.strokeStyle = "black"; // ใช้สีดำ
    ctx.lineWidth = 2;
    ctx.stroke();
  });
}

// สุ่มเส้นตัวอย่าง
function generateExampleLines() {
  exampleLines.length = 0; // รีเซ็ตเส้น
  for (let i = 0; i < 10; i++) { // สุ่ม 5 เส้น
    const start = points[Math.floor(Math.random() * points.length)];
    const end = points[Math.floor(Math.random() * points.length)];
    if (start !== end) {
      exampleLines.push([start, end]);
    }
  }
}

// ตรวจจับการลากเส้นของผู้เล่น
function handleUserDrawing(canvas, ctx) {
  let isDrawing = false;
  let startPoint = null;

  canvas.addEventListener("mousedown", (e) => {
    const { offsetX, offsetY } = e;
    startPoint = points.find(p => 
      Math.hypot(p.x - offsetX, p.y - offsetY) < 10
    );
    if (startPoint) isDrawing = true;
  });

  canvas.addEventListener("mousemove", (e) => {
    if (!isDrawing || !startPoint) return;

    const { offsetX, offsetY } = e;
    currentLine = [startPoint, { x: offsetX, y: offsetY }];
    ctx.clearRect(0, 0, canvas.width, canvas.height); // เคลียร์ Canvas
    drawPoints(ctx); // วาดจุด
    drawLines(ctx, userLines); // วาดเส้นที่ผู้เล่นวาด
    drawLines(ctx, [currentLine]); // วาดเส้นที่กำลังลาก
  });

  canvas.addEventListener("mouseup", (e) => {
    if (!isDrawing || !startPoint) return;
    const { offsetX, offsetY } = e;
    const endPoint = points.find(p => 
      Math.hypot(p.x - offsetX, p.y - offsetY) < 10
    );

    if (endPoint && startPoint !== endPoint) {
      userLines.push([startPoint, endPoint]);
      ctx.clearRect(0, 0, canvas.width, canvas.height); // เคลียร์ Canvas
      drawPoints(ctx); // วาดจุด
      drawLines(ctx, userLines); // วาดเส้นที่ผู้เล่นวาด
    }
    isDrawing = false;
    startPoint = null;
    currentLine = null;
  });
}

// ฟังก์ชันสำหรับลบเส้นที่ผู้เล่นวาด
function handleLineDelete(canvas, ctx) {
  canvas.addEventListener("dblclick", (e) => {
    const { offsetX, offsetY } = e;
    
    // ตรวจสอบว่าเราคลิกที่เส้นใดหรือไม่
    for (let i = 0; i < userLines.length; i++) {
      if (isPointNearLine(offsetX, offsetY, userLines[i])) {
        // ลบเส้นนั้น
        userLines.splice(i, 1);
        // เคลียร์ Canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // วาดจุดและเส้นที่เหลือ
        drawPoints(ctx);
        drawLines(ctx, userLines);
        break; // ออกจากลูปหลังจากลบเส้นแล้ว
      }
    }
  });
}

// ฟังก์ชันตรวจสอบว่าเส้นใดใกล้กับจุดที่คลิกหรือไม่
function isPointNearLine(x, y, line) {
  const [start, end] = line;
  const lineLength = Math.hypot(end.x - start.x, end.y - start.y);
  const distance = Math.abs((end.y - start.y) * x - (end.x - start.x) * y + end.x * start.y - end.y * start.x) / lineLength;
  return distance < 10; // ความห่างจากเส้นที่ยอมรับได้
}

// เริ่มเกม
function init() {
  const exampleCanvas = document.getElementById("exampleCanvas");
  const exampleCtx = exampleCanvas.getContext("2d");

  const gameCanvas = document.getElementById("gameCanvas");
  const gameCtx = gameCanvas.getContext("2d");

  // วาดจุด
  drawPoints(exampleCtx);
  drawPoints(gameCtx);

  // สุ่มเส้นตัวอย่าง
  generateExampleLines();
  drawLines(exampleCtx, exampleLines);

  // จับการลากเส้น
  handleUserDrawing(gameCanvas, gameCtx);

  // เพิ่มฟังก์ชันลบเส้นเมื่อคลิกสองครั้ง
  handleLineDelete(gameCanvas, gameCtx);
}


// เรียกใช้เกมเมื่อโหลดหน้า
window.onload = init;
