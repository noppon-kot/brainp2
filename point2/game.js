const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// รูปทรงต่างๆ ที่จะใช้ในเกม
const shapes = [
  {
    points: [
      { x: 50, y: 50 },
      { x: 200, y: 50 },
      { x: 200, y: 150 },
      { x: 50, y: 150 },
    ],
    lines: [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 0],
    ]
  },
  {
    points: [
      { x: 100, y: 50 },
      { x: 50, y: 150 },
      { x: 150, y: 150 },
    ],
    lines: [
      [0, 1],
      [1, 2],
      [2, 0],
    ]
  },
  {
    points: [
      { x: 100, y: 30 },
      { x: 150, y: 30 },
      { x: 180, y: 70 },
      { x: 150, y: 110 },
      { x: 100, y: 110 },
      { x: 70, y: 70 },
    ],
    lines: [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4],
      [4, 5],
      [5, 0],
    ]
  },
  // เพิ่มรูปทรงอื่นๆ ตามต้องการ
  {
    points: [
      { x: 100, y: 10 },
      { x: 120, y: 50 },
      { x: 180, y: 50 },
      { x: 130, y: 80 },
      { x: 150, y: 150 },
      { x: 100, y: 110 },
      { x: 50, y: 150 },
      { x: 70, y: 80 },
      { x: 20, y: 50 },
      { x: 80, y: 50 },
    ],
    lines: [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4],
      [4, 5],
      [5, 6],
      [6, 7],
      [7, 8],
      [8, 9],
      [9, 0],
    ]
  },
  // เพิ่มรูปทรงอื่นๆ ตามต้องการ
];

// ฟังก์ชันในการสุ่มรูปทรง
function getRandomShape() {
  const randomIndex = Math.floor(Math.random() * shapes.length);
  return shapes[randomIndex];
}

// ฟังก์ชันในการวาดเส้นตามจุด
function drawShape(shape) {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // เคลียร์หน้าจอ

  ctx.beginPath();
  shape.lines.forEach(line => {
    const startPoint = shape.points[line[0]];
    const endPoint = shape.points[line[1]];
    ctx.moveTo(startPoint.x, startPoint.y);
    ctx.lineTo(endPoint.x, endPoint.y);
  });

  ctx.strokeStyle = 'black';
  ctx.lineWidth = 2;
  ctx.stroke();
}

// เริ่มเกม
function startGame() {
  const shape = getRandomShape();
  drawShape(shape);
}

// เริ่มเกมเมื่อโหลดหน้า
startGame();

// ทุกๆ 5 วินาทีสุ่มรูปใหม่
setInterval(startGame, 5000);
