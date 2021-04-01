import React, { useCallback, useEffect, useRef, useState } from "react";

// 可调参数
var BACKGROUND_COLOR = "rgba(0,43,54,1)"; // 背景颜色
var POINT_NUM = 150; // 星星数目
var POINT_COLOR = "rgba(255,255,255,0.7)"; // 点的颜色
var LINE_LENGTH = 10000; // 点之间连线长度(的平方)

const Particle = (props) => {
  const canvasRef = useRef(null);
  const [points, setPoints] = useState([]);

  const initPoints = (nums) => {
    setPoints([]);
    let cvs = canvasRef.current;
    for (var i = 0; i < nums; i++) {
      setPoints((e) => [...e, new Point(cvs.width, cvs.height)]);
    }
  };

  const initCursor = () => {
    p0.dx = p0.dy = 0;
    var degree = 2.5;
    document.onmousemove = (ev) => {
      p0.x = ev.clientX;
      p0.y = ev.clientY;
    };
    document.onmousedown = (ev) => {
      degree = 5.0;
      p0.x = ev.clientX;
      p0.y = ev.clientY;
    };
    document.onmouseup = (ev) => {
      degree = 2.5;
      p0.x = ev.clientX;
      p0.y = ev.clientY;
    };
    window.onmouseout = function () {
      p0.x = null;
      p0.y = null;
    };
  };

  const drawLine = (p1, p2, deg) => {
    var ctx = canvasRef.current.getContext("2d");

    var dx = p1.x - p2.x;
    var dy = p1.y - p2.y;
    var dis2 = dx * dx + dy * dy;
    if (dis2 < 2 * LINE_LENGTH) {
      if (dis2 > LINE_LENGTH) {
        if (p1 === p0) {
          p2.x += dx * 0.03;
          p2.y += dy * 0.03;
        } else return;
      }
      var t = (1.05 - dis2 / LINE_LENGTH) * 0.2 * deg;
      ctx.strokeStyle = "rgba(255,255,255," + t + ")";
      ctx.beginPath();
      ctx.lineWidth = 1.5;
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.closePath();
      ctx.stroke();
    }
    return;
  };

  const drawFrame = () => {
    if (!canvasRef.current) return;

    var ctx = canvasRef.current.getContext("2d");
    let cvs = canvasRef.current;

    cvs.width = window.innerWidth;
    cvs.height = window.innerHeight;
    ctx.fillStyle = BACKGROUND_COLOR;
    ctx.fillRect(0, 0, cvs.width, cvs.height);

    var arr = p0.x == null ? points : [p0].concat(points);
    for (var i = 0; i < arr.length; ++i) {
      for (var j = i + 1; j < arr.length; ++j) {
        drawLine(arr[i], arr[j], 1.0);
      }
      arr[i].draw(ctx);
      arr[i].move(cvs.width, cvs.height);
    }

    window.requestAnimationFrame(drawFrame);
  };

  useEffect(() => {
    initCursor();
    initPoints(POINT_NUM);
  }, []);
  drawFrame();

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "fixed", top: 0, left: 0, zIndex: -1, opacity: 1.0 }}
    ></canvas>
  );
};

//构造点类
class Point {
  constructor(width = 0, height = 0) {
    this.x = randomFloat(0, width);
    this.y = randomFloat(0, height);

    var speed = randomFloat(0.3, 1.4);
    var angle = randomFloat(0, 2 * Math.PI);

    this.dx = Math.sin(angle) * speed;
    this.dy = Math.cos(angle) * speed;

    this.r = 1.2;

    this.color = POINT_COLOR;
  }
  move(width, height) {
    this.x += this.dx;
    if (this.x < 0) {
      this.x = 0;
      this.dx = -this.dx;
    } else if (this.x > width) {
      this.x = width;
      this.dx = -this.dx;
    }
    this.y += this.dy;
    if (this.y < 0) {
      this.y = 0;
      this.dy = -this.dy;
    } else if (this.y > height) {
      this.y = height;
      this.dy = -this.dy;
    }
  }
  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
  }
}

const randomInt = (min, max) => {
  return Math.floor((max - min + 1) * Math.random() + min);
};

const randomFloat = (min, max) => {
  return (max - min) * Math.random() + min;
};

var p0 = new Point(); //鼠标
export default Particle;
