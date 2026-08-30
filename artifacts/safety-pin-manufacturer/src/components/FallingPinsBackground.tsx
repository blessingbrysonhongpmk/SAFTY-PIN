import { useEffect, useRef, useState, useCallback } from 'react';
import { Sliders, Sparkles, Wind, Eye, EyeOff, Plus, ChevronDown, ChevronUp } from 'lucide-react';

export type MetalTone = 'ALL' | 'CHROME' | 'BRASS' | 'COPPER' | 'GUNMETAL';
export type DensityLevel = 'LOW' | 'MEDIUM' | 'HIGH';

interface FallingPinsBackgroundProps {
  initialDensity?: DensityLevel;
  initialTone?: MetalTone;
  interactive?: boolean;
  showControls?: boolean;
  className?: string;
  zIndex?: number;
}

interface PinParticle {
  id: number;
  x: number;
  y: number;
  z: number; // depth: 0.1 (far) to 1.0 (near)
  baseVy: number;
  vx: number;
  vy: number;
  size: number;
  rotation: number;
  vRot: number;
  tiltX: number;
  tiltY: number;
  vTiltX: number;
  vTiltY: number;
  swayAmp: number;
  swayFreq: number;
  swayPhase: number;
  pinType: 'CLASSIC' | 'BULB' | 'HEAVY' | 'OPEN';
  metalType: 'CHROME' | 'BRASS' | 'COPPER' | 'GUNMETAL';
  opacity: number;
  glintPhase: number;
  glintSpeed: number;
}

// Color palettes for metallic finishes
const METAL_THEMES = {
  CHROME: {
    wire: '#9aa9b7',
    wireHighlight: '#ffffff',
    wireShadow: '#4d5d6c',
    claspLight: '#e4ecf3',
    claspDark: '#506373',
    glow: 'rgba(210, 230, 248, 0.4)',
    accent: '#ffffff',
  },
  BRASS: {
    wire: '#d4af37',
    wireHighlight: '#fff6c9',
    wireShadow: '#7a5a12',
    claspLight: '#f6df88',
    claspDark: '#8a6514',
    glow: 'rgba(245, 215, 110, 0.4)',
    accent: '#fff8d6',
  },
  COPPER: {
    wire: '#d96c43',
    wireHighlight: '#ffd2be',
    wireShadow: '#7c3216',
    claspLight: '#f59b75',
    claspDark: '#8e3818',
    glow: 'rgba(235, 120, 80, 0.4)',
    accent: '#ffe2d4',
  },
  GUNMETAL: {
    wire: '#5a6874',
    wireHighlight: '#9eb2c2',
    wireShadow: '#222b33',
    claspLight: '#788998',
    claspDark: '#293540',
    glow: 'rgba(140, 165, 185, 0.3)',
    accent: '#c0d4e3',
  },
};

const DENSITY_COUNTS: Record<DensityLevel, number> = {
  LOW: 18,
  MEDIUM: 36,
  HIGH: 60,
};

export function FallingPinsBackground({
  initialDensity = 'MEDIUM',
  initialTone = 'ALL',
  interactive = true,
  showControls = true,
  className = '',
  zIndex = 0,
}: FallingPinsBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const particlesRef = useRef<PinParticle[]>([]);
  const animFrameIdRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(performance.now());
  const mouseRef = useRef<{ x: number; y: number; vx: number; vy: number; lastX: number; lastY: number; active: boolean }>({
    x: -9999,
    y: -9999,
    vx: 0,
    vy: 0,
    lastX: -9999,
    lastY: -9999,
    active: false,
  });

  const [density, setDensity] = useState<DensityLevel>(initialDensity);
  const [tone, setTone] = useState<MetalTone>(initialTone);
  const [enabled, setEnabled] = useState<boolean>(true);
  const [windActive, setWindActive] = useState<boolean>(true);
  const [controlsExpanded, setControlsExpanded] = useState<boolean>(false);
  const [burstCount, setBurstCount] = useState<number>(0);

  const densityRef = useRef(density);
  densityRef.current = density;
  const toneRef = useRef(tone);
  toneRef.current = tone;
  const enabledRef = useRef(enabled);
  enabledRef.current = enabled;
  const windActiveRef = useRef(windActive);
  windActiveRef.current = windActive;

  // Create a randomized pin particle
  const createParticle = useCallback((
    canvasWidth: number,
    canvasHeight: number,
    spawnAbove = false,
    customZ?: number
  ): PinParticle => {
    const z = customZ !== undefined ? customZ : Math.random() * 0.9 + 0.1; // 0.1 to 1.0
    const availableTones: ('CHROME' | 'BRASS' | 'COPPER' | 'GUNMETAL')[] = ['CHROME', 'BRASS', 'COPPER', 'GUNMETAL'];
    const currentTone = toneRef.current;
    const selectedMetal: 'CHROME' | 'BRASS' | 'COPPER' | 'GUNMETAL' =
      currentTone === 'ALL'
        ? availableTones[Math.floor(Math.random() * availableTones.length)]
        : currentTone;

    const pinTypes: ('CLASSIC' | 'BULB' | 'HEAVY' | 'OPEN')[] = ['CLASSIC', 'CLASSIC', 'BULB', 'HEAVY', 'OPEN'];
    const pinType = pinTypes[Math.floor(Math.random() * pinTypes.length)];

    // Depth scales size and speed: closer pins are larger, faster, clearer
    const size = (20 + z * 36) * (pinType === 'HEAVY' ? 1.15 : pinType === 'BULB' ? 0.9 : 1.0);
    const baseVy = 0.45 + z * 1.55 + Math.random() * 0.35;

    return {
      id: Math.random(),
      x: Math.random() * canvasWidth,
      y: spawnAbove ? -size * 2 - Math.random() * (canvasHeight * 0.3) : Math.random() * canvasHeight,
      z,
      baseVy,
      vx: (Math.random() - 0.5) * 0.4,
      vy: baseVy,
      size,
      rotation: Math.random() * Math.PI * 2,
      vRot: (Math.random() - 0.5) * (0.012 + (1 - z) * 0.015),
      tiltX: Math.random() * Math.PI * 2,
      tiltY: Math.random() * Math.PI * 2,
      vTiltX: (Math.random() - 0.5) * 0.02,
      vTiltY: (Math.random() - 0.5) * 0.025,
      swayAmp: 0.6 + z * 1.4 + Math.random() * 0.8,
      swayFreq: 0.0012 + Math.random() * 0.0016,
      swayPhase: Math.random() * Math.PI * 2,
      pinType,
      metalType: selectedMetal,
      opacity: 0.22 + z * 0.58,
      glintPhase: Math.random() * Math.PI * 2,
      glintSpeed: 0.002 + Math.random() * 0.003,
    };
  }, []);

  // Initialize or re-adjust particle pool
  const initParticles = useCallback((canvasWidth: number, canvasHeight: number) => {
    const targetCount = DENSITY_COUNTS[densityRef.current];
    const newParticles: PinParticle[] = [];
    for (let i = 0; i < targetCount; i++) {
      newParticles.push(createParticle(canvasWidth, canvasHeight, false));
    }
    particlesRef.current = newParticles;
  }, [createParticle]);

  // Trigger interactive burst of tumbling pins
  const triggerBurst = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const count = 16;
    const burstPins: PinParticle[] = [];
    for (let i = 0; i < count; i++) {
      const p = createParticle(canvas.width, canvas.height, true, Math.random() * 0.7 + 0.3);
      p.vy = 2.5 + Math.random() * 3.5;
      p.vx = (Math.random() - 0.5) * 3.0;
      p.vRot = (Math.random() - 0.5) * 0.08;
      p.vTiltX = (Math.random() - 0.5) * 0.07;
      burstPins.push(p);
    }
    particlesRef.current = [...particlesRef.current, ...burstPins];
    setBurstCount((prev) => prev + 1);
  };

  // Draw an individual safety pin with precision engineering aesthetic
  const drawSafetyPin = (
    ctx: CanvasRenderingContext2D,
    p: PinParticle,
    now: number
  ) => {
    const theme = METAL_THEMES[p.metalType] || METAL_THEMES.CHROME;

    ctx.save();
    ctx.translate(p.x, p.y);

    // 2D rotation + 3D tumbling perspective foreshortening
    ctx.rotate(p.rotation);
    const cosX = Math.cos(p.tiltX);
    const cosY = Math.cos(p.tiltY);
    // Clamp perspective compression slightly so the pin doesn't fully collapse to zero width
    const scaleX = (cosY >= 0 ? 1 : -1) * (0.2 + 0.8 * Math.abs(cosY));
    const scaleY = (cosX >= 0 ? 1 : -1) * (0.35 + 0.65 * Math.abs(cosX));
    ctx.scale(scaleX, scaleY);

    const s = p.size;
    const L = s; // Total length
    const W = s * 0.32; // Width between arms
    const wireRadius = Math.max(1.1, s * 0.042);
    const springRadius = W * 0.58;

    // Specular glint intensity based on rotation and tumbling angle towards light source
    const lightAngle = 0.785; // 45 degrees
    const alignment = Math.cos(p.rotation - lightAngle) * Math.cos(p.tiltX);
    const glint = Math.pow(Math.max(0, alignment), 6) * Math.abs(Math.sin(now * p.glintSpeed + p.glintPhase));

    ctx.globalAlpha = p.opacity;

    // Optional subtle depth of field blur for far background particles
    if (p.z < 0.22) {
      ctx.filter = 'blur(1px)';
    } else {
      ctx.filter = 'none';
    }

    // DRAWING THE SAFETY PIN:
    // Coordinates origin (0, 0) is centered along length:
    // Top clasp: -L * 0.5
    // Bottom spring: +L * 0.42

    const topY = -L * 0.48;
    const claspH = L * 0.26;
    const spineX = W * 0.5;
    const pinArmX = -W * 0.5;
    const coilCenterY = L * 0.36;

    // 1. BACK WIRE (SPINE)
    // Runs from clasp base to bottom coil
    ctx.beginPath();
    ctx.moveTo(spineX, topY + claspH * 0.7);
    ctx.lineTo(spineX, coilCenterY - springRadius * 0.4);
    ctx.strokeStyle = theme.wireShadow;
    ctx.lineWidth = wireRadius + 1.2;
    ctx.lineCap = 'round';
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(spineX, topY + claspH * 0.7);
    ctx.lineTo(spineX, coilCenterY - springRadius * 0.4);
    ctx.strokeStyle = theme.wire;
    ctx.lineWidth = wireRadius;
    ctx.stroke();

    // Specular highlight line on spine wire
    ctx.beginPath();
    ctx.moveTo(spineX - 0.4, topY + claspH * 0.75);
    ctx.lineTo(spineX - 0.4, coilCenterY - springRadius * 0.5);
    ctx.strokeStyle = theme.wireHighlight;
    ctx.lineWidth = Math.max(0.6, wireRadius * 0.35);
    ctx.stroke();

    // 2. BOTTOM SPRING COIL
    if (p.pinType === 'BULB') {
      // Pear / Bulb pin has a smooth teardrop bulbous base instead of a helical coil
      ctx.beginPath();
      ctx.moveTo(spineX, coilCenterY - springRadius * 0.4);
      ctx.bezierCurveTo(
        spineX + W * 0.4,
        coilCenterY + springRadius * 0.8,
        pinArmX - W * 0.4,
        coilCenterY + springRadius * 0.8,
        pinArmX,
        coilCenterY - springRadius * 0.4
      );
      ctx.strokeStyle = theme.wire;
      ctx.lineWidth = wireRadius;
      ctx.stroke();
    } else {
      // Classic & Heavy safety pin helical spring coil
      const coilLoops = p.pinType === 'HEAVY' ? 2 : 1;
      for (let loop = 0; loop < coilLoops; loop++) {
        const offset = (loop - (coilLoops - 1) / 2) * (wireRadius * 0.7);
        ctx.beginPath();
        ctx.arc(0, coilCenterY + offset, springRadius, -0.2, Math.PI * 1.85, false);
        ctx.strokeStyle = theme.wireShadow;
        ctx.lineWidth = wireRadius + 1.2;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(0, coilCenterY + offset, springRadius, -0.2, Math.PI * 1.85, false);
        ctx.strokeStyle = theme.wire;
        ctx.lineWidth = wireRadius;
        ctx.stroke();

        // Inner coil opening highlight
        ctx.beginPath();
        ctx.arc(0, coilCenterY + offset, springRadius * 0.55, 0, Math.PI * 2);
        ctx.strokeStyle = theme.wireHighlight;
        ctx.lineWidth = Math.max(0.5, wireRadius * 0.25);
        ctx.stroke();
      }
    }

    // 3. FRONT NEEDLE PIN ARM (Free arm / needle)
    const isSprungOpen = p.pinType === 'OPEN';
    const openOffsetAngle = isSprungOpen ? 0.22 : 0; // ~12.6 degrees open
    const targetTipX = isSprungOpen ? pinArmX - L * 0.18 : pinArmX + W * 0.15;
    const targetTipY = isSprungOpen ? topY + claspH * 0.35 : topY + claspH * 0.5;

    ctx.beginPath();
    ctx.moveTo(pinArmX, coilCenterY - springRadius * 0.4);
    if (isSprungOpen) {
      ctx.lineTo(targetTipX, targetTipY);
    } else {
      ctx.lineTo(pinArmX, topY + claspH * 0.8);
      ctx.lineTo(targetTipX, targetTipY);
    }
    ctx.strokeStyle = theme.wireShadow;
    ctx.lineWidth = wireRadius + 1.0;
    ctx.lineCap = 'round';
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(pinArmX, coilCenterY - springRadius * 0.4);
    if (isSprungOpen) {
      ctx.lineTo(targetTipX, targetTipY);
    } else {
      ctx.lineTo(pinArmX, topY + claspH * 0.8);
      ctx.lineTo(targetTipX, targetTipY);
    }
    ctx.strokeStyle = theme.wire;
    ctx.lineWidth = wireRadius;
    ctx.stroke();

    // Specular shine along needle
    ctx.beginPath();
    ctx.moveTo(pinArmX + 0.3, coilCenterY - springRadius * 0.5);
    ctx.lineTo(isSprungOpen ? targetTipX + 0.3 : pinArmX + 0.3, topY + claspH * 0.9);
    ctx.strokeStyle = theme.wireHighlight;
    ctx.lineWidth = Math.max(0.6, wireRadius * 0.35);
    ctx.stroke();

    // Needle sharp point (if open)
    if (isSprungOpen) {
      ctx.beginPath();
      ctx.arc(targetTipX, targetTipY, wireRadius * 0.6, 0, Math.PI * 2);
      ctx.fillStyle = theme.wireHighlight;
      ctx.fill();
    }

    // 4. CLASP / HEAD HOOD (Precision stamped metallic cap)
    const claspW = W * 1.25;
    const claspX = -claspW * 0.42;
    const claspY = topY;
    const claspRadius = claspW * 0.28;

    // Clasp outer capsule
    ctx.beginPath();
    ctx.roundRect(claspX, claspY, claspW, claspH, [claspRadius, claspRadius, claspRadius * 0.5, claspRadius * 0.5]);

    // Metallic gradient fill
    const grad = ctx.createLinearGradient(claspX, claspY, claspX + claspW, claspY + claspH);
    grad.addColorStop(0, theme.claspLight);
    grad.addColorStop(0.35, theme.wireHighlight);
    grad.addColorStop(0.7, theme.claspDark);
    grad.addColorStop(1, theme.wireShadow);

    ctx.fillStyle = grad;
    ctx.fill();
    ctx.strokeStyle = theme.wireShadow;
    ctx.lineWidth = 0.8;
    ctx.stroke();

    // Clasp catch groove / notch
    ctx.beginPath();
    ctx.moveTo(claspX + claspW * 0.2, claspY + claspH * 0.45);
    ctx.lineTo(claspX + claspW * 0.65, claspY + claspH * 0.45);
    ctx.lineTo(claspX + claspW * 0.65, claspY + claspH * 0.85);
    ctx.strokeStyle = theme.wireShadow;
    ctx.lineWidth = Math.max(0.9, wireRadius * 0.6);
    ctx.stroke();

    // Clasp crimp indentation dot / rivet
    ctx.beginPath();
    ctx.arc(claspX + claspW * 0.72, claspY + claspH * 0.32, wireRadius * 0.7, 0, Math.PI * 2);
    ctx.fillStyle = theme.wireShadow;
    ctx.fill();
    ctx.beginPath();
    ctx.arc(claspX + claspW * 0.70, claspY + claspH * 0.30, wireRadius * 0.4, 0, Math.PI * 2);
    ctx.fillStyle = theme.wireHighlight;
    ctx.fill();

    // 5. METALLIC SPECULAR GLINT / STARBURST
    if (glint > 0.45 && p.z > 0.3) {
      const glintX = claspX + claspW * 0.3;
      const glintY = claspY + claspH * 0.25;
      const glintSize = (s * 0.22) * (glint - 0.45) * 2.2;

      // Glow halo
      const radialGlow = ctx.createRadialGradient(glintX, glintY, 0, glintX, glintY, glintSize * 2);
      radialGlow.addColorStop(0, theme.glow);
      radialGlow.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = radialGlow;
      ctx.beginPath();
      ctx.arc(glintX, glintY, glintSize * 2, 0, Math.PI * 2);
      ctx.fill();

      // Starburst ray 4-point
      ctx.beginPath();
      ctx.moveTo(glintX - glintSize, glintY);
      ctx.lineTo(glintX + glintSize, glintY);
      ctx.moveTo(glintX, glintY - glintSize);
      ctx.lineTo(glintX, glintY + glintSize);
      ctx.strokeStyle = theme.accent;
      ctx.lineWidth = 1.0;
      ctx.stroke();
    }

    ctx.restore();
  };

  // Main animation and physics update loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);

      // Re-seed particles if needed
      if (particlesRef.current.length === 0) {
        initParticles(width, height);
      }
    };

    handleResize();
    initParticles(width, height);
    window.addEventListener('resize', handleResize, { passive: true });

    // Mouse tracker
    const handleMouseMove = (e: MouseEvent) => {
      const mouse = mouseRef.current;
      mouse.vx = e.clientX - mouse.lastX;
      mouse.vy = e.clientY - mouse.lastY;
      mouse.lastX = e.clientX;
      mouse.lastY = e.clientY;
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
      mouseRef.current.x = -9999;
      mouseRef.current.y = -9999;
    };

    if (interactive) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
      document.addEventListener('mouseleave', handleMouseLeave, { passive: true });
    }

    // Scroll momentum tracker
    let lastScrollY = window.scrollY;
    let scrollVelocity = 0;
    const handleScroll = () => {
      const currentY = window.scrollY;
      scrollVelocity = (currentY - lastScrollY) * 0.08;
      lastScrollY = currentY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Animation frame loop
    const animate = (now: number) => {
      const dt = Math.min(32, now - lastTimeRef.current);
      lastTimeRef.current = now;

      // Clear canvas with transparent clearRect
      ctx.clearRect(0, 0, width, height);

      if (enabledRef.current) {
        const particles = particlesRef.current;
        const targetCount = DENSITY_COUNTS[densityRef.current];

        // Adjust pool count if density changed
        if (particles.length < targetCount) {
          particles.push(createParticle(width, height, true));
        } else if (particles.length > targetCount && particles.length > 10) {
          particles.pop();
        }

        const mouse = mouseRef.current;
        const mouseRadius = 150;
        const mouseRadiusSq = mouseRadius * mouseRadius;
        const isWind = windActiveRef.current;

        // Ambient wind calculation (gentle oscillating breeze)
        const windX = isWind ? Math.sin(now * 0.0006) * 0.35 + 0.15 : 0;

        // Decay scroll velocity gradually
        scrollVelocity *= 0.92;

        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];

          // 1. Natural falling & swaying physics
          const sway = Math.sin(now * p.swayFreq + p.swayPhase) * p.swayAmp;
          p.x += p.vx + sway + windX;
          p.y += p.vy + scrollVelocity;

          // Rotations & tumbling
          p.rotation += p.vRot;
          p.tiltX += p.vTiltX;
          p.tiltY += p.vTiltY;

          // 2. Interactive mouse displacement
          if (interactive && mouse.active) {
            const dx = p.x - mouse.x;
            const dy = p.y - mouse.y;
            const distSq = dx * dx + dy * dy;

            if (distSq < mouseRadiusSq && distSq > 4) {
              const dist = Math.sqrt(distSq);
              const force = (1 - dist / mouseRadius) * (0.8 + p.z * 1.2);
              const nx = dx / dist;
              const ny = dy / dist;

              // Push away
              p.vx += nx * force * 1.5;
              p.vy += ny * force * 1.2;

              // Impart energetic tumble & spin
              p.vRot += (Math.random() - 0.5) * force * 0.04;
              p.vTiltX += (Math.random() - 0.5) * force * 0.05;
              p.vTiltY += (Math.random() - 0.5) * force * 0.05;
            }
          }

          // 3. Velocity damping towards terminal velocity
          p.vx *= 0.95;
          p.vy = p.vy * 0.96 + p.baseVy * 0.04;
          p.vRot = p.vRot * 0.98 + (p.z > 0.5 ? 0.004 : 0.002) * (p.vRot >= 0 ? 1 : -1) * 0.02;
          p.vTiltX *= 0.98;
          p.vTiltY *= 0.98;

          // 4. Wrap around screen bounds
          const margin = p.size * 2 + 30;
          if (p.y > height + margin) {
            // Reset to top
            p.y = -margin - Math.random() * 40;
            p.x = Math.random() * width;
            p.vy = p.baseVy;
            p.vx = (Math.random() - 0.5) * 0.5;
          } else if (p.y < -margin * 2) {
            p.y = height + margin;
          }

          if (p.x > width + margin) {
            p.x = -margin;
          } else if (p.x < -margin) {
            p.x = width + margin;
          }

          // 5. Draw particle
          drawSafetyPin(ctx, p, now);
        }
      }

      animFrameIdRef.current = requestAnimationFrame(animate);
    };

    animFrameIdRef.current = requestAnimationFrame(animate);

    return () => {
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [createParticle, initParticles, interactive]);

  // Update tone across active particles when changed
  useEffect(() => {
    if (tone === 'ALL') return;
    particlesRef.current.forEach((p) => {
      p.metalType = tone;
    });
  }, [tone]);

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 pointer-events-none ${className}`}
      style={{ zIndex }}
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 block h-full w-full pointer-events-none"
      />

      {/* Optional Interactive Controls Badge */}
      {showControls && (
        <aside
          aria-label="Safety pin background controls"
          className="pointer-events-auto fixed bottom-5 left-5 z-50 flex flex-col items-start font-mono select-none"
        >
          {/* Collapsed Pill / Main Toggle Button */}
          <div className="flex items-center gap-1 rounded-full border border-foreground/20 bg-background/90 px-3 py-1.5 shadow-lg backdrop-blur-md transition-all hover:border-accent/80">
            <button
              type="button"
              onClick={() => setEnabled((prev) => !prev)}
              className="flex items-center gap-1.5 text-[11px] font-semibold tracking-wide text-foreground hover:text-accent transition-colors"
              title={enabled ? 'Pause falling safety pins' : 'Start falling safety pins'}
              data-testid="button-toggle-pins"
            >
              <span className="relative flex h-2 w-2">
                <span
                  className={`absolute inline-flex h-full w-full rounded-full ${
                    enabled ? 'animate-ping bg-accent opacity-75' : 'bg-muted-foreground opacity-40'
                  }`}
                />
                <span
                  className={`relative inline-flex h-2 w-2 rounded-full ${
                    enabled ? 'bg-accent' : 'bg-muted-foreground'
                  }`}
                />
              </span>
              <span>PINS {enabled ? 'ON' : 'OFF'}</span>
            </button>

            <span className="h-3 w-px bg-foreground/15 mx-1" />

            <button
              type="button"
              onClick={triggerBurst}
              className="flex items-center gap-1 text-[10px] uppercase font-bold text-accent hover:brightness-110 px-1.5 py-0.5 rounded transition-all active:scale-95"
              title="Drop a burst of safety pins!"
              data-testid="button-burst-pins"
            >
              <Plus size={12} className="stroke-[3]" />
              <span>BURST</span>
            </button>

            <span className="h-3 w-px bg-foreground/15 mx-1" />

            <button
              type="button"
              onClick={() => setControlsExpanded((prev) => !prev)}
              aria-label={controlsExpanded ? 'Hide safety pin settings' : 'Show safety pin settings'}
              className="p-0.5 text-foreground/60 hover:text-foreground transition-colors"
              data-testid="button-expand-pin-controls"
            >
              {controlsExpanded ? <ChevronDown size={14} /> : <Sliders size={13} />}
            </button>
          </div>

          {/* Expanded Settings Menu */}
          {controlsExpanded && (
            <div className="mt-2 w-64 rounded-lg border border-foreground/15 bg-background/95 p-3.5 shadow-2xl backdrop-blur-lg animate-in fade-in slide-in-from-bottom-2 duration-200">
              <div className="flex items-center justify-between border-b border-foreground/10 pb-2 mb-2.5">
                <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-foreground/70">
                  Background Pins
                </span>
                <span className="text-[9px] text-accent font-semibold">
                  {DENSITY_COUNTS[density]} PINS
                </span>
              </div>

              {/* Density selector */}
              <div className="mb-3">
                <label className="block text-[9px] uppercase tracking-wider text-muted-foreground mb-1.5">
                  Density
                </label>
                <div className="grid grid-cols-3 gap-1">
                  {(['LOW', 'MEDIUM', 'HIGH'] as DensityLevel[]).map((lvl) => (
                    <button
                      type="button"
                      key={lvl}
                      onClick={() => setDensity(lvl)}
                      className={`rounded px-2 py-1 text-[9px] font-bold uppercase transition-all ${
                        density === lvl
                          ? 'bg-foreground text-background shadow-xs'
                          : 'bg-foreground/5 text-foreground/70 hover:bg-foreground/10'
                      }`}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>

              {/* Metal Finish selector */}
              <div className="mb-3">
                <label className="block text-[9px] uppercase tracking-wider text-muted-foreground mb-1.5">
                  Finish Tone
                </label>
                <div className="grid grid-cols-3 gap-1 text-[9px]">
                  {(['ALL', 'CHROME', 'BRASS', 'COPPER', 'GUNMETAL'] as MetalTone[]).map((m) => (
                    <button
                      type="button"
                      key={m}
                      onClick={() => setTone(m)}
                      className={`rounded px-1.5 py-1 font-bold uppercase transition-all truncate ${
                        tone === m
                          ? 'bg-accent text-accent-foreground shadow-xs'
                          : 'bg-foreground/5 text-foreground/70 hover:bg-foreground/10'
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              {/* Wind Toggle */}
              <div className="flex items-center justify-between border-t border-foreground/10 pt-2 text-[10px]">
                <span className="text-muted-foreground flex items-center gap-1.5">
                  <Wind size={12} className="text-accent" />
                  <span>Ambient Breeze</span>
                </span>
                <button
                  type="button"
                  onClick={() => setWindActive((prev) => !prev)}
                  className={`text-[9px] font-bold px-2 py-0.5 rounded ${
                    windActive ? 'bg-accent/20 text-accent' : 'bg-foreground/10 text-muted-foreground'
                  }`}
                >
                  {windActive ? 'ON' : 'OFF'}
                </button>
              </div>
            </div>
          )}
        </aside>
      )}
    </div>
  );
}

export default FallingPinsBackground;
