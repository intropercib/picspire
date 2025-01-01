export function initAnimation(canvas) {
    let c = canvas.getContext("2d"),
        w = (canvas.width = canvas.clientWidth),
        h = (canvas.height = canvas.clientHeight),
        mouse = { x: null, y: null },
        last_mouse = { x: w / 2, y: h / 2 },
        t = 0;

    let target = { x: w / 2, y: h / 2, velx: 0, vely: 0 };

    function dist(p1x, p1y, p2x, p2y) {
        return Math.sqrt(Math.pow(p2x - p1x, 2) + Math.pow(p2y - p1y, 2));
    }

    class segment {
        constructor(parent, l, a, first) {
            this.first = first;
            if (first) {
                this.pos = {
                    x: parent.x,
                    y: parent.y
                };
            } else {
                this.pos = {
                    x: parent.nextPos.x,
                    y: parent.nextPos.y
                };
            }
            this.l = l;
            this.ang = a;
            this.nextPos = {
                x: this.pos.x + this.l * Math.cos(this.ang),
                y: this.pos.y + this.l * Math.sin(this.ang)
            };
        }
        update(t) {
            this.ang = Math.atan2(t.y - this.pos.y, t.x - this.pos.x);
            this.pos.x = t.x + this.l * Math.cos(this.ang - Math.PI);
            this.pos.y = t.y + this.l * Math.sin(this.ang - Math.PI);
            this.nextPos.x = this.pos.x + this.l * Math.cos(this.ang);
            this.nextPos.y = this.pos.y + this.l * Math.sin(this.ang);
        }
        fallback(t) {
            this.pos.x = t.x;
            this.pos.y = t.y;
            this.nextPos.x = this.pos.x + this.l * Math.cos(this.ang);
            this.nextPos.y = this.pos.y + this.l * Math.sin(this.ang);
        }
        show() {
            c.lineTo(this.nextPos.x, this.nextPos.y);
        }
    }

    class tentacle {
        constructor(x, y, l, n, a) {
            this.x = x;
            this.y = y;
            this.l = l;
            this.n = n;
            this.t = {};
            this.rand = Math.random();
            this.segments = [new segment(this, this.l / this.n, 0, true)];
            for (let i = 1; i < this.n; i++) {
                this.segments.push(
                    new segment(this.segments[i - 1], this.l / this.n, 0, false)
                );
            }
        }
        move(last_target, target) {
            this.angle = Math.atan2(target.y - this.y, target.x - this.x);
            this.dt = dist(last_target.x, last_target.y, target.x, target.y) + 5;
            this.t = {
                x: target.x - 0.8 * this.dt * Math.cos(this.angle),
                y: target.y - 0.8 * this.dt * Math.sin(this.angle)
            };
            if (this.t.x) {
                this.segments[this.n - 1].update(this.t);
            } else {
                this.segments[this.n - 1].update(target);
            }
            for (let i = this.n - 2; i >= 0; i--) {
                this.segments[i].update(this.segments[i + 1].pos);
            }
            if (
                dist(this.x, this.y, target.x, target.y) <=
                this.l + dist(last_target.x, last_target.y, target.x, target.y)
            ) {
                this.segments[0].fallback({ x: this.x, y: this.y });
                for (let i = 1; i < this.n; i++) {
                    this.segments[i].fallback(this.segments[i - 1].nextPos);
                }
            }
        }
        show(target) {
            if (dist(this.x, this.y, target.x, target.y) <= this.l) {
                c.globalCompositeOperation = "lighter";
                c.beginPath();
                c.lineTo(this.x, this.y);
                for (let i = 0; i < this.n; i++) {
                    this.segments[i].show();
                }
                c.strokeStyle =
                    "hsl(" +
                    (this.rand * 60 + 180) +
                    ",100%," +
                    (this.rand * 60 + 25) +
                    "%)";
                c.lineWidth = this.rand * 2;
                c.lineCap = "round";
                c.lineJoin = "round";
                c.stroke();
                c.globalCompositeOperation = "source-over";
            }
        }
        show2(target) {
            c.beginPath();
            if (dist(this.x, this.y, target.x, target.y) <= this.l) {
                c.arc(this.x, this.y, 2 * this.rand + 1, 0, 2 * Math.PI);
                c.fillStyle = "white";
            } else {
                c.arc(this.x, this.y, this.rand * 2, 0, 2 * Math.PI);
                c.fillStyle = "darkcyan";
            }
            c.fill();
        }
    }

    let maxl = 300,
        minl = 50,
        n = 30,
        numt = 500,
        tent = [],
        clicked = false,
        last_target = { x: w / 2, y: h / 2 },
        q = 10;

    for (let i = 0; i < numt; i++) {
        tent.push(
            new tentacle(
                Math.random() * w,
                Math.random() * h,
                Math.random() * (maxl - minl) + minl,
                n,
                Math.random() * 2 * Math.PI
            )
        );
    }
    function draw() {
        if (mouse.x !== null && mouse.y !== null) {
            target.errx = mouse.x - target.x;
            target.erry = mouse.y - target.y;
            target.velx = (mouse.x - target.x) * 0.05;
            target.vely = (mouse.y - target.y) * 0.05;
        } else {
            target.velx += (Math.random() - 0.5) * 0.5;
            target.vely += (Math.random() - 0.5) * 0.5;

            const maxVelocity = 2;
            target.velx = Math.max(-maxVelocity, Math.min(maxVelocity, target.velx));
            target.vely = Math.max(-maxVelocity, Math.min(maxVelocity, target.vely));

        }

        target.x += target.velx;
        target.y += target.vely;

        if (target.x <= 0) {
            target.x = 0;
            target.velx = Math.abs(target.velx);
        } else if (target.x >= w) {
            target.x = w;
            target.velx = -Math.abs(target.velx);
        }

        if (target.y <= 0) {
            target.y = 0;
            target.vely = Math.abs(target.vely);
        } else if (target.y >= h) {
            target.y = h;
            target.vely = -Math.abs(target.vely);
        }

        t += 0.01;

        c.beginPath();
        c.arc(
            target.x,
            target.y,
            dist(last_target.x, last_target.y, target.x, target.y) + 5,
            0,
            2 * Math.PI
        );
        c.fillStyle = "hsl(210,100%,80%)";
        c.fill();

        for (let i = 0; i < numt; i++) {
            tent[i].move(last_target, target);
            tent[i].show2(target);
        }
        for (let i = 0; i < numt; i++) {
            tent[i].show(target);
        }
        last_target.x = target.x;
        last_target.y = target.y;
    }

    const handleResize = () => {
        w = canvas.width = canvas.clientWidth;
        h = canvas.height = canvas.clientHeight;
    };
    window.addEventListener("resize", handleResize);

    const handleMouseMove = (e) => {
        const rect = canvas.getBoundingClientRect();
        last_mouse.x = mouse.x;
        last_mouse.y = mouse.y;
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
    };

    const handleMouseOut = (e) => {
        if (!e.relatedTarget) {
            mouse.x = null;
            mouse.y = null;
        }
    };

    const handleMouseDown = () => {
        clicked = true;
    };

    const handleMouseUp = () => {
        clicked = false;
    };


    window.addEventListener("mousemove", handleMouseMove, false);
    window.addEventListener("mouseout", handleMouseOut, false);
    window.addEventListener("mousedown", handleMouseDown, false);
    window.addEventListener("mouseup", handleMouseUp, false);

    let animationFrameId;

    function loop() {
        animationFrameId = window.requestAnimationFrame(loop);
        c.clearRect(0, 0, w, h);
        draw();
    }

    animationFrameId = window.requestAnimationFrame(loop);

    return () => {
        window.cancelAnimationFrame(animationFrameId);
        window.removeEventListener("resize", handleResize);
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseout", handleMouseOut);
        window.removeEventListener("mousedown", handleMouseDown);
        window.removeEventListener("mouseup", handleMouseUp);
    };
}
