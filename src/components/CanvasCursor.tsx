"use client";

import { useEffect, useRef } from "react";

interface Node {
    x: number;
    y: number;
    vx: number;
    vy: number;
}

interface LineConfig {
    spring: number;
}

class Oscillator {
    phase: number;
    offset: number;
    frequency: number;
    amplitude: number;
    value: number;

    constructor(options: { phase?: number; offset?: number; frequency?: number; amplitude?: number } = {}) {
        this.phase = options.phase || 0;
        this.offset = options.offset || 0;
        this.frequency = options.frequency || 0.001;
        this.amplitude = options.amplitude || 1;
        this.value = 0;
    }

    update(): number {
        this.phase += this.frequency;
        this.value = this.offset + Math.sin(this.phase) * this.amplitude;
        return this.value;
    }
}

class NodeObject implements Node {
    x = 0;
    y = 0;
    vx = 0;
    vy = 0;
}

class Trail {
    spring: number;
    friction: number;
    nodes: NodeObject[];
    config: { friction: number; size: number; dampening: number; tension: number };

    constructor(config: { friction: number; size: number; dampening: number; tension: number }, springConfig: LineConfig, pos: { x: number; y: number }) {
        this.config = config;
        this.spring = springConfig.spring + 0.1 * Math.random() - 0.02;
        this.friction = config.friction + 0.01 * Math.random() - 0.002;
        this.nodes = [];

        for (let i = 0; i < config.size; i++) {
            const node = new NodeObject();
            node.x = pos.x;
            node.y = pos.y;
            this.nodes.push(node);
        }
    }

    update(pos: { x: number; y: number }) {
        let spring = this.spring;
        let node = this.nodes[0];

        node.vx += (pos.x - node.x) * spring;
        node.vy += (pos.y - node.y) * spring;

        for (let i = 0; i < this.nodes.length; i++) {
            node = this.nodes[i];
            if (i > 0) {
                const prev = this.nodes[i - 1];
                node.vx += (prev.x - node.x) * spring;
                node.vy += (prev.y - node.y) * spring;
                node.vx += prev.vx * this.config.dampening;
                node.vy += prev.vy * this.config.dampening;
            }

            node.vx *= this.friction;
            node.vy *= this.friction;
            node.x += node.vx;
            node.y += node.vy;

            spring *= this.config.tension;
        }
    }

    draw(ctx: CanvasRenderingContext2D) {
        let curr: NodeObject, next: NodeObject;
        let x = this.nodes[0].x;
        let y = this.nodes[0].y;

        ctx.beginPath();
        ctx.moveTo(x, y);

        for (let i = 1; i < this.nodes.length - 2; i++) {
            curr = this.nodes[i];
            next = this.nodes[i + 1];
            const xc = 0.5 * (curr.x + next.x);
            const yc = 0.5 * (curr.y + next.y);
            ctx.quadraticCurveTo(curr.x, curr.y, xc, yc);
        }

        curr = this.nodes[this.nodes.length - 2];
        next = this.nodes[this.nodes.length - 1];
        ctx.quadraticCurveTo(curr.x, curr.y, next.x, next.y);
        ctx.stroke();
        ctx.closePath();
    }
}

export default function CanvasCursor() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let scaling = false; // logic removed/simplified as we resize manually
        let frameId: number;

        const config = {
            debug: true,
            friction: 0.5,
            trails: 20,
            size: 50,
            dampening: 0.25,
            tension: 0.98,
        };

        const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
        const trails: Trail[] = [];

        // Initialize Oscillator
        const oscillator = new Oscillator({
            phase: Math.random() * 2 * Math.PI,
            amplitude: 85,
            frequency: 0.0015,
            offset: 285,
        });

        // Initialize Trails
        for (let i = 0; i < config.trails; i++) {
            trails.push(
                new Trail(config, { spring: 0.45 + (i / config.trails) * 0.025 }, pos)
            );
        }

        const handleMouseMove = (e: MouseEvent | TouchEvent) => {
            if ('touches' in e) {
                pos.x = e.touches[0].pageX;
                pos.y = e.touches[0].pageY;
            } else {
                pos.x = (e as MouseEvent).clientX;
                pos.y = (e as MouseEvent).clientY;
            }
        };

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };


        const render = () => {
            ctx.globalCompositeOperation = "source-over";
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

            ctx.globalCompositeOperation = "lighter";
            ctx.strokeStyle = "hsla(" + Math.round(oscillator.update()) + ",60%,60%,0.8)";
            ctx.lineWidth = 2;

            for (let i = 0; i < config.trails; i++) {
                trails[i].update(pos);
                trails[i].draw(ctx);
            }

            frameId = requestAnimationFrame(render);
        };

        // Bind events
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("touchstart", handleMouseMove);
        document.addEventListener("touchmove", handleMouseMove);
        window.addEventListener("resize", handleResize);

        // Initial Setup
        handleResize();
        render();

        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("touchstart", handleMouseMove);
            document.removeEventListener("touchmove", handleMouseMove);
            window.removeEventListener("resize", handleResize);
            cancelAnimationFrame(frameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-[9999]"
            style={{ mixBlendMode: "screen" }}
        />
    );
}
