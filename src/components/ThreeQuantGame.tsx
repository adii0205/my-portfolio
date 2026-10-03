import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Volume2, VolumeX, RotateCcw, Zap, Shield, Play, Pause } from 'lucide-react';

// Web Audio API Synthesizer for instant zero-dependency sound effects
class SoundEngine {
  private ctx: AudioContext | null = null;
  public enabled: boolean = false; // Muted by default so it never disturbs visitors

  private init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playLaser() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(880, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(110, this.ctx.currentTime + 0.12);
    gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.01, this.ctx.currentTime + 0.12);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.12);
  }

  playCollect() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(523.25, now); // C5
    osc.frequency.setValueAtTime(659.25, now + 0.05); // E5
    osc.frequency.setValueAtTime(783.99, now + 0.1); // G5
    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(now + 0.22);
  }

  playExplode() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(140, now);
    osc.frequency.exponentialRampToValueAtTime(30, now + 0.25);
    gain.gain.setValueAtTime(0.25, now);
    gain.gain.linearRampToValueAtTime(0.01, now + 0.25);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(now + 0.25);
  }

  playShockwave() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(80, now);
    osc.frequency.linearRampToValueAtTime(320, now + 0.15);
    osc.frequency.linearRampToValueAtTime(60, now + 0.4);
    gain.gain.setValueAtTime(0.35, now);
    gain.gain.linearRampToValueAtTime(0.01, now + 0.4);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(now + 0.4);
  }
}

const sounds = new SoundEngine();

interface Obstacle {
  mesh: THREE.Mesh;
  type: 'alpha' | 'anomaly' | 'shield';
  speed: number;
}

interface Laser {
  mesh: THREE.Mesh;
  velocity: number;
}

interface Particle {
  mesh: THREE.Mesh;
  vx: number;
  vy: number;
  vz: number;
  life: number;
}

export function ThreeQuantGame() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // React state for HUD
  const [hasStarted, setHasStarted] = useState(false);
  const [pnl, setPnl] = useState(0);
  const [streak, setStreak] = useState(0);
  const [multiplier, setMultiplier] = useState(1);
  const [shieldActive, setShieldActive] = useState(true);
  const [soundOn, setSoundOn] = useState(false); // Muted by default so it never annoys visitors
  const [isPlaying, setIsPlaying] = useState(false); // Idle by default until Start button is clicked
  const [gameOver, setGameOver] = useState(false);
  const [shockwaveCooldown, setShockwaveCooldown] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    return parseInt(localStorage.getItem('quant_arcade_highscore') || '0', 10);
  });

  // Mutable refs for high-frequency game loop
  const gameRef = useRef({
    isPlaying: false, // Started as false
    shipX: 0,
    targetX: 0,
    shipY: 1.2,
    keys: { left: false, right: false, fire: false, shockwave: false },
    pnl: 0,
    streak: 0,
    multiplier: 1,
    shield: true,
    obstacles: [] as Obstacle[],
    lasers: [] as Laser[],
    particles: [] as Particle[],
    lastSpawn: 0,
    shockwaveRadius: 0,
    isShockwaveActive: false,
    cameraShake: 0,
  });

  useEffect(() => {
    sounds.enabled = soundOn;
  }, [soundOn]);

  useEffect(() => {
    gameRef.current.isPlaying = hasStarted && isPlaying && !gameOver;
  }, [hasStarted, isPlaying, gameOver]);

  // Main Three.js Interactive Engine
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = 480;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x05070d, 0.018);

    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.set(0, 5.5, 14);
    camera.lookAt(0, 1.2, -15);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    container.appendChild(renderer.domElement);

    // 2. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0x38bdf8, 2.0);
    dirLight.position.set(5, 15, 10);
    scene.add(dirLight);

    const underGlow = new THREE.PointLight(0x06b6d4, 3.0, 50);
    underGlow.position.set(0, 0, 5);
    scene.add(underGlow);

    // 3. Cyber Runway (Infinite Moving Order Book Grid)
    const gridHelper = new THREE.GridHelper(160, 40, 0x06b6d4, 0x1e293b);
    gridHelper.position.y = 0;
    scene.add(gridHelper);

    // Glowing Lane Dividers
    const laneGeo = new THREE.PlaneGeometry(16, 200);
    const laneMat = new THREE.MeshBasicMaterial({
      color: 0x0ea5e9,
      wireframe: true,
      transparent: true,
      opacity: 0.12,
    });
    const laneMesh = new THREE.Mesh(laneGeo, laneMat);
    laneMesh.rotation.x = -Math.PI / 2;
    laneMesh.position.y = 0.02;
    scene.add(laneMesh);

    // 4. Player: Holographic HFT Arbitrage Jet / Drone
    const shipGroup = new THREE.Group();
    shipGroup.position.set(0, 1.2, 0);
    scene.add(shipGroup);

    // Fuselage / Hull (Sleek Angular Arrowhead)
    const bodyGeo = new THREE.ConeGeometry(1.2, 3.2, 4);
    const bodyMat = new THREE.MeshStandardMaterial({
      color: 0x0369a1,
      roughness: 0.2,
      metalness: 0.85,
      emissive: 0x0284c7,
      emissiveIntensity: 0.35,
    });
    const bodyMesh = new THREE.Mesh(bodyGeo, bodyMat);
    bodyMesh.rotation.x = Math.PI / 2;
    bodyMesh.rotation.y = Math.PI / 4;
    bodyMesh.scale.set(1, 1, 0.45);
    shipGroup.add(bodyMesh);

    // Liquid Glass Cockpit Canopy
    const cockpitGeo = new THREE.SphereGeometry(0.65, 16, 16);
    const cockpitMat = new THREE.MeshPhysicalMaterial({
      color: 0x38bdf8,
      roughness: 0.05,
      transmission: 0.9,
      thickness: 1.2,
      transparent: true,
      opacity: 0.8,
    });
    const cockpit = new THREE.Mesh(cockpitGeo, cockpitMat);
    cockpit.position.set(0, 0.35, -0.2);
    cockpit.scale.set(0.8, 0.5, 1.4);
    shipGroup.add(cockpit);

    // Dual Wing Thrusters
    const thrusterMat = new THREE.MeshBasicMaterial({ color: 0x22d3ee });
    const thrusterGeo = new THREE.CylinderGeometry(0.18, 0.28, 0.8, 8);

    const leftThruster = new THREE.Mesh(thrusterGeo, thrusterMat);
    leftThruster.rotation.x = Math.PI / 2;
    leftThruster.position.set(-0.9, 0.1, 1.1);
    shipGroup.add(leftThruster);

    const rightThruster = new THREE.Mesh(thrusterGeo, thrusterMat);
    rightThruster.rotation.x = Math.PI / 2;
    rightThruster.position.set(0.9, 0.1, 1.1);
    shipGroup.add(rightThruster);

    // Liquid Glass VaR Shield Bubble
    const shieldGeo = new THREE.SphereGeometry(1.9, 32, 16);
    const shieldMat = new THREE.MeshPhysicalMaterial({
      color: 0x38bdf8,
      roughness: 0.1,
      transmission: 0.95,
      transparent: true,
      opacity: 0.4,
      wireframe: true,
    });
    const shieldMesh = new THREE.Mesh(shieldGeo, shieldMat);
    shipGroup.add(shieldMesh);

    // Expanding Liquid Glass Shockwave Ring
    const shockwaveGeo = new THREE.RingGeometry(0.5, 1.2, 64);
    const shockwaveMat = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0,
    });
    const shockwaveRing = new THREE.Mesh(shockwaveGeo, shockwaveMat);
    shockwaveRing.rotation.x = -Math.PI / 2;
    shockwaveRing.position.y = 0.5;
    scene.add(shockwaveRing);

    // 5. Shared Materials for Spawned Objects
    const alphaMat = new THREE.MeshStandardMaterial({
      color: 0x10b981,
      emissive: 0x059669,
      emissiveIntensity: 0.8,
      roughness: 0.2,
      metalness: 0.5,
    });

    const anomalyMat = new THREE.MeshStandardMaterial({
      color: 0xf43f5e,
      emissive: 0xe11d48,
      emissiveIntensity: 0.7,
      roughness: 0.3,
      metalness: 0.7,
    });

    const crystalMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x0ea5e9,
      emissiveIntensity: 0.9,
      roughness: 0.1,
      metalness: 0.9,
    });

    const laserMat = new THREE.MeshBasicMaterial({ color: 0x22d3ee });

    // Function to trigger shockwave
    const triggerShockwave = () => {
      const g = gameRef.current;
      if (g.isShockwaveActive || !g.isPlaying) return;
      g.isShockwaveActive = true;
      g.shockwaveRadius = 1;
      shockwaveRing.position.copy(shipGroup.position);
      shockwaveRing.position.y = 0.5;
      shockwaveMat.opacity = 0.85;
      sounds.playShockwave();
      setShockwaveCooldown(100);

      // Wipe out all anomalies currently on screen
      let wiped = 0;
      g.obstacles = g.obstacles.filter((obs) => {
        if (obs.type === 'anomaly') {
          // Spawn particle explosion
          createExplosion(obs.mesh.position, 0xf43f5e);
          scene.remove(obs.mesh);
          wiped++;
          return false;
        }
        return true;
      });

      if (wiped > 0) {
        g.pnl += wiped * 500;
        setPnl(g.pnl);
      }
    };

    // Particle Explosion Helper
    const createExplosion = (pos: THREE.Vector3, colorHex: number) => {
      const pMat = new THREE.MeshBasicMaterial({ color: colorHex });
      const pGeo = new THREE.BoxGeometry(0.2, 0.2, 0.2);

      for (let i = 0; i < 14; i++) {
        const p = new THREE.Mesh(pGeo, pMat);
        p.position.copy(pos);
        scene.add(p);
        gameRef.current.particles.push({
          mesh: p,
          vx: (Math.random() - 0.5) * 0.45,
          vy: Math.random() * 0.4 + 0.1,
          vz: (Math.random() - 0.5) * 0.45,
          life: 1.0,
        });
      }
    };

    // Laser Firing Helper
    const fireLaser = () => {
      const g = gameRef.current;
      if (!g.isPlaying) return;
      sounds.playLaser();

      const laserGeo = new THREE.CylinderGeometry(0.08, 0.08, 1.8, 6);
      laserGeo.rotateX(Math.PI / 2);

      // Left Cannon
      const leftL = new THREE.Mesh(laserGeo, laserMat);
      leftL.position.set(shipGroup.position.x - 0.8, 1.1, shipGroup.position.z - 1.2);
      scene.add(leftL);
      g.lasers.push({ mesh: leftL, velocity: 1.6 });

      // Right Cannon
      const rightL = new THREE.Mesh(laserGeo, laserMat);
      rightL.position.set(shipGroup.position.x + 0.8, 1.1, shipGroup.position.z - 1.2);
      scene.add(rightL);
      g.lasers.push({ mesh: rightL, velocity: 1.6 });
    };

    // Input Listeners: Keyboard
    const handleKeyDown = (e: KeyboardEvent) => {
      const g = gameRef.current;
      if (!g.isPlaying) return;
      if (e.code === 'ArrowLeft' || e.code === 'KeyA') g.keys.left = true;
      if (e.code === 'ArrowRight' || e.code === 'KeyD') g.keys.right = true;
      if (e.code === 'Space') {
        e.preventDefault();
        fireLaser();
      }
      if (e.code === 'KeyE' || e.code === 'KeyV') {
        e.preventDefault();
        triggerShockwave();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const g = gameRef.current;
      if (e.code === 'ArrowLeft' || e.code === 'KeyA') g.keys.left = false;
      if (e.code === 'ArrowRight' || e.code === 'KeyD') g.keys.right = false;
    };

    // Mouse / Touch Steering: direct glide
    const handleMouseMove = (e: MouseEvent) => {
      if (!gameRef.current.isPlaying) return;
      const rect = container.getBoundingClientRect();
      const normX = (e.clientX - rect.left) / rect.width; // 0 to 1
      gameRef.current.targetX = (normX - 0.5) * 14; // -7 to +7
    };

    const handlePointerDown = (e: PointerEvent) => {
      if ((e.target as HTMLElement).tagName === 'BUTTON') return;
      if (!gameRef.current.isPlaying) return;
      fireLaser();
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('pointerdown', handlePointerDown);

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      camera.aspect = w / height;
      camera.updateProjectionMatrix();
      renderer.setSize(w, height);
    };
    window.addEventListener('resize', handleResize);

    // 6. Animation / Physics Loop
    let lastTime = performance.now();
    let frameId: number;

    const animate = () => {
      frameId = requestAnimationFrame(animate);

      const now = performance.now();
      const delta = (now - lastTime) / 1000;
      lastTime = now;

      const g = gameRef.current;

      // Move runway grid to simulate high speed forward momentum
      if (g.isPlaying) {
        gridHelper.position.z = (gridHelper.position.z + 0.8) % 4;
        laneMesh.position.z = (laneMesh.position.z + 0.8) % 4;
      }

      // Ship Movement (smooth interpolation toward target or keys)
      if (g.keys.left) g.targetX -= 12 * delta;
      if (g.keys.right) g.targetX += 12 * delta;
      g.targetX = Math.max(-7, Math.min(7, g.targetX));

      // Ease current position to target
      g.shipX += (g.targetX - g.shipX) * 0.18;
      shipGroup.position.x = g.shipX;

      // Realistic Bank / Roll on turn
      const targetRoll = -(g.targetX - g.shipX) * 0.16;
      shipGroup.rotation.z += (targetRoll - shipGroup.rotation.z) * 0.12;

      // Thruster pulse flicker
      leftThruster.scale.z = 0.9 + Math.sin(now * 0.03) * 0.25;
      rightThruster.scale.z = 0.9 + Math.cos(now * 0.03) * 0.25;

      // VaR Shield visibility
      shieldMesh.visible = g.shield;
      if (g.shield) {
        shieldMesh.rotation.y += 0.03;
      }

      // Handle Expanding Shockwave
      if (g.isShockwaveActive) {
        g.shockwaveRadius += 35 * delta;
        shockwaveRing.scale.set(g.shockwaveRadius, g.shockwaveRadius, 1);
        shockwaveMat.opacity = Math.max(0, 1 - g.shockwaveRadius / 30);
        if (g.shockwaveRadius > 30) {
          g.isShockwaveActive = false;
        }
      }

      // Camera Shake
      if (g.cameraShake > 0) {
        camera.position.x = (Math.random() - 0.5) * g.cameraShake;
        camera.position.y = 5.5 + (Math.random() - 0.5) * g.cameraShake;
        g.cameraShake = Math.max(0, g.cameraShake - delta * 3);
      } else {
        camera.position.x = 0;
        camera.position.y = 5.5;
      }

      if (g.isPlaying) {
        // Cooldown update
        setShockwaveCooldown((prev) => Math.max(0, prev - delta * 25));

        // Spawning Obstacles & Alpha Items
        if (now - g.lastSpawn > 480) {
          g.lastSpawn = now;

          const roll = Math.random();
          let type: 'alpha' | 'anomaly' | 'shield' = 'anomaly';
          let geo: THREE.BufferGeometry;
          let mat: THREE.Material;

          if (roll < 0.55) {
            // Alpha Dividend Orb (Green Icosahedron)
            type = 'alpha';
            geo = new THREE.IcosahedronGeometry(0.85, 1);
            mat = alphaMat;
          } else if (roll < 0.92) {
            // Volatility Shock Anomaly (Spiky Red Dodecahedron)
            type = 'anomaly';
            geo = new THREE.DodecahedronGeometry(1.0, 0);
            mat = anomalyMat;
          } else {
            // VaR Shield Crystal (Blue Octahedron)
            type = 'shield';
            geo = new THREE.OctahedronGeometry(0.9, 0);
            mat = crystalMat;
          }

          const mesh = new THREE.Mesh(geo, mat);
          mesh.position.set((Math.random() - 0.5) * 13, 1.2, -65);
          scene.add(mesh);
          g.obstacles.push({
            mesh,
            type,
            speed: 38 + Math.min(30, g.pnl / 1500),
          });
        }

        // Update Lasers
        for (let i = g.lasers.length - 1; i >= 0; i--) {
          const l = g.lasers[i];
          l.mesh.position.z -= l.velocity;

          // Check laser collisions with obstacles
          let hit = false;
          for (let j = g.obstacles.length - 1; j >= 0; j--) {
            const obs = g.obstacles[j];
            const dist = l.mesh.position.distanceTo(obs.mesh.position);
            if (dist < 1.6) {
              hit = true;
              if (obs.type === 'anomaly') {
                sounds.playExplode();
                createExplosion(obs.mesh.position, 0xf43f5e);
                scene.remove(obs.mesh);
                g.obstacles.splice(j, 1);

                g.pnl += 250 * g.multiplier;
                g.streak++;
                if (g.streak % 5 === 0) {
                  g.multiplier = Math.min(8, g.multiplier + 1);
                  setMultiplier(g.multiplier);
                }
                setPnl(g.pnl);
                setStreak(g.streak);
              }
              break;
            }
          }

          // Out of bounds
          if (hit || l.mesh.position.z < -70) {
            scene.remove(l.mesh);
            g.lasers.splice(i, 1);
          }
        }

        // Update Obstacles
        for (let i = g.obstacles.length - 1; i >= 0; i--) {
          const obs = g.obstacles[i];
          obs.mesh.position.z += obs.speed * delta;
          obs.mesh.rotation.x += 0.03;
          obs.mesh.rotation.y += 0.04;

          // Collision with Ship
          const distToShip = obs.mesh.position.distanceTo(shipGroup.position);
          if (distToShip < 1.9) {
            if (obs.type === 'alpha') {
              sounds.playCollect();
              createExplosion(obs.mesh.position, 0x10b981);
              g.pnl += 500 * g.multiplier;
              g.streak++;
              if (g.streak % 4 === 0) {
                g.multiplier = Math.min(8, g.multiplier + 1);
                setMultiplier(g.multiplier);
              }
              setPnl(g.pnl);
              setStreak(g.streak);
            } else if (obs.type === 'shield') {
              sounds.playCollect();
              createExplosion(obs.mesh.position, 0x38bdf8);
              g.shield = true;
              setShieldActive(true);
            } else if (obs.type === 'anomaly') {
              // Crash hit
              g.cameraShake = 0.9;
              sounds.playExplode();
              createExplosion(shipGroup.position, 0xf43f5e);

              if (g.shield) {
                // Shield absorbed impact
                g.shield = false;
                setShieldActive(false);
              } else {
                // Game Over
                g.isPlaying = false;
                setIsPlaying(false);
                setGameOver(true);
                if (g.pnl > highScore) {
                  setHighScore(g.pnl);
                  localStorage.setItem('quant_arcade_highscore', g.pnl.toString());
                }
              }
              g.streak = 0;
              g.multiplier = 1;
              setStreak(0);
              setMultiplier(1);
            }

            scene.remove(obs.mesh);
            g.obstacles.splice(i, 1);
            continue;
          }

          // Off screen pass
          if (obs.mesh.position.z > 12) {
            scene.remove(obs.mesh);
            g.obstacles.splice(i, 1);
          }
        }

        // Update Particles
        for (let i = g.particles.length - 1; i >= 0; i--) {
          const p = g.particles[i];
          p.mesh.position.x += p.vx;
          p.mesh.position.y += p.vy;
          p.mesh.position.z += p.vz;
          p.life -= delta * 2.2;
          p.mesh.scale.setScalar(Math.max(0.01, p.life));
          if (p.life <= 0) {
            scene.remove(p.mesh);
            g.particles.splice(i, 1);
          }
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    // Reset Game Function
    (window as unknown as { __resetQuantGame: () => void }).__resetQuantGame = () => {
      const g = gameRef.current;
      // Clear obstacles and lasers
      g.obstacles.forEach((o) => scene.remove(o.mesh));
      g.lasers.forEach((l) => scene.remove(l.mesh));
      g.particles.forEach((p) => scene.remove(p.mesh));
      g.obstacles = [];
      g.lasers = [];
      g.particles = [];
      g.pnl = 0;
      g.streak = 0;
      g.multiplier = 1;
      g.shield = true;
      g.shipX = 0;
      g.targetX = 0;
      g.isPlaying = true;

      setPnl(0);
      setStreak(0);
      setMultiplier(1);
      setShieldActive(true);
      setGameOver(false);
      setHasStarted(true);
      setIsPlaying(true);
    };

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  const handleStartGame = () => {
    setHasStarted(true);
    setIsPlaying(true);
    setGameOver(false);
    const fn = (window as unknown as { __resetQuantGame?: () => void }).__resetQuantGame;
    if (fn) fn();
  };

  const handleRestart = () => {
    setHasStarted(true);
    setIsPlaying(true);
    setGameOver(false);
    const fn = (window as unknown as { __resetQuantGame?: () => void }).__resetQuantGame;
    if (fn) fn();
  };

  return (
    <section id="quant-core-3d" className="relative py-20 px-6 max-w-7xl mx-auto">
      {/* Liquid Glass Container (Apple Control Center Specular Border) */}
      <div className="liquid-glass rounded-[28px] overflow-hidden p-6 sm:p-8 relative">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span>High-Frequency Trading · Order Execution Engine</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display mt-1">
              OrderBook Runner: Sub-Millisecond Arbitrage
            </h2>
            <p className="text-xs text-slate-400 mt-1 max-w-xl">
              Steer the HFT execution drone across the order book grid. Collect green Alpha dividends, 
              blast flash-crash anomalies with hedging pulses, and protect portfolio VaR.
            </p>
          </div>

          {/* Quick HUD Metrics & Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSoundOn(!soundOn)}
              className="p-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-slate-300 hover:text-white border border-white/[0.1] transition-all"
              title={soundOn ? 'Mute Sound FX' : 'Enable Sound FX (Currently Muted)'}
            >
              {soundOn ? <Volume2 size={16} /> : <VolumeX size={16} />}
            </button>

            {hasStarted ? (
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-slate-300 hover:text-white border border-white/[0.1] transition-all"
                title={isPlaying ? 'Pause' : 'Resume'}
              >
                {isPlaying ? <Pause size={16} /> : <Play size={16} />}
              </button>
            ) : null}

            {hasStarted ? (
              <button
                onClick={handleRestart}
                className="px-3.5 py-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-cyan-300 text-xs font-mono font-semibold border border-cyan-500/30 flex items-center gap-1.5 transition-all"
              >
                <RotateCcw size={14} />
                <span>Restart</span>
              </button>
            ) : (
              <button
                onClick={handleStartGame}
                className="px-4 py-2 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-[#05070D] text-xs font-mono font-bold flex items-center gap-1.5 transition-all shadow-md shadow-cyan-400/25 active:scale-95"
              >
                <Play size={14} fill="currentColor" />
                <span>Start Simulation</span>
              </button>
            )}
          </div>
        </div>

        {/* 3D WebGL Canvas Viewport with Apple HUD Overlay */}
        <div className="relative mt-6 rounded-2xl overflow-hidden bg-[#03060d] border border-white/[0.1] shadow-2xl">
          {/* Three.js Container */}
          <div
            ref={containerRef}
            className="w-full h-[480px] cursor-crosshair touch-none select-none"
          />

          {/* Start Simulation Splash Overlay */}
          {!hasStarted && (
            <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/60 backdrop-blur-[4px] p-6 text-center animate-in fade-in duration-200">
              <div className="max-w-md p-8 rounded-3xl bg-[#090d16]/95 border border-cyan-500/30 shadow-2xl space-y-4">
                <div className="inline-flex p-3 rounded-2xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                  <Play size={28} fill="currentColor" />
                </div>
                <div>
                  <h3 className="text-2xl font-extrabold text-white font-display">
                    OrderBook Runner 3D
                  </h3>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    Interactive high-frequency algorithmic execution. Steer the drone, collect Alpha packets, 
                    and deploy hedging pulses to safeguard portfolio Value-at-Risk.
                  </p>
                </div>

                <div className="pt-2">
                  <button
                    onClick={handleStartGame}
                    className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-cyan-400 to-sky-500 hover:from-cyan-300 hover:to-sky-400 text-black font-bold font-mono text-sm tracking-wider uppercase transition-all shadow-lg shadow-cyan-500/30 active:scale-95 flex items-center justify-center gap-2"
                  >
                    <Play size={16} fill="currentColor" />
                    <span>Launch 3D Simulation</span>
                  </button>
                </div>

                <div className="text-[11px] font-mono text-slate-400">
                  Sound is muted by default · Click speaker icon anytime to enable audio
                </div>
              </div>
            </div>
          )}

          {/* Real-Time Trading Telemetry HUD */}
          <div className="absolute top-4 left-4 z-20 flex flex-wrap gap-2 pointer-events-none">
            {/* P&L Display */}
            <div className="px-3 py-1.5 rounded-xl bg-black/60 backdrop-blur-md border border-emerald-500/40 text-xs font-mono text-emerald-300 flex items-center gap-2 shadow-lg">
              <span className="text-[10px] text-slate-400">P&L:</span>
              <span className="font-bold text-sm text-emerald-400">
                +${pnl.toLocaleString()}
              </span>
            </div>

            {/* Streak & Multiplier */}
            <div className="px-3 py-1.5 rounded-xl bg-black/60 backdrop-blur-md border border-cyan-500/40 text-xs font-mono text-cyan-300 flex items-center gap-2 shadow-lg">
              <Zap size={13} className="text-amber-400" />
              <span>Streak: {streak}</span>
              <span className="px-1.5 py-0.5 rounded bg-amber-400/20 text-amber-300 text-[10px] font-bold">
                {multiplier}×
              </span>
            </div>

            {/* VaR Shield Status */}
            <div className={`px-3 py-1.5 rounded-xl backdrop-blur-md text-xs font-mono flex items-center gap-1.5 border shadow-lg ${
              shieldActive 
                ? 'bg-black/60 border-cyan-400/50 text-cyan-300' 
                : 'bg-rose-950/60 border-rose-500/50 text-rose-300'
            }`}>
              <Shield size={13} />
              <span>{shieldActive ? 'VaR Shield: ONLINE' : 'VaR Shield: BREACHED'}</span>
            </div>

            {/* High Score */}
            <div className="px-3 py-1.5 rounded-xl bg-black/60 backdrop-blur-md border border-white/[0.1] text-xs font-mono text-slate-300 flex items-center gap-2 shadow-lg">
              <span className="text-[10px] text-slate-400">BEST:</span>
              <span className="font-bold text-amber-300">${highScore.toLocaleString()}</span>
            </div>
          </div>

          {/* Interactive Keyboard & Mouse Control Hints Overlay */}
          <div className="absolute bottom-4 left-4 right-4 z-20 flex flex-col sm:flex-row items-center justify-between gap-3 pointer-events-none">
            <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono text-slate-300 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/[0.1]">
              <span className="text-cyan-400 font-semibold">Controls:</span>
              <span>Mouse / Drag to Steer</span>
              <span className="text-slate-500">·</span>
              <kbd className="px-1.5 py-0.5 rounded bg-white/[0.1] border border-white/[0.2] text-[10px]">A</kbd>
              <kbd className="px-1.5 py-0.5 rounded bg-white/[0.1] border border-white/[0.2] text-[10px]">D</kbd>
              <span>or Arrow Keys</span>
              <span className="text-slate-500">·</span>
              <kbd className="px-1.5 py-0.5 rounded bg-white/[0.1] border border-white/[0.2] text-[10px]">SPACE</kbd>
              <span>/ Click to Fire Hedge</span>
              <span className="text-slate-500">·</span>
              <kbd className="px-1.5 py-0.5 rounded bg-white/[0.1] border border-white/[0.2] text-[10px]">E</kbd>
              <span>VaR Shockwave</span>
            </div>

            {/* Action Trigger Buttons for Touch / Mouse Clickers */}
            <div className="flex items-center gap-2 pointer-events-auto">
              <button
                onClick={() => {
                  const evt = new KeyboardEvent('keydown', { code: 'Space' });
                  window.dispatchEvent(evt);
                }}
                className="px-4 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-400/40 text-xs font-mono font-bold flex items-center gap-1.5 transition-all shadow-md active:scale-95"
              >
                <Zap size={14} />
                <span>FIRE HEDGE (Space)</span>
              </button>

              <button
                onClick={() => {
                  const evt = new KeyboardEvent('keydown', { code: 'KeyE' });
                  window.dispatchEvent(evt);
                }}
                disabled={shockwaveCooldown > 0}
                className={`px-4 py-2 rounded-xl border text-xs font-mono font-bold flex items-center gap-1.5 transition-all shadow-md active:scale-95 ${
                  shockwaveCooldown > 0
                    ? 'bg-white/[0.04] text-slate-500 border-white/[0.08] cursor-not-allowed'
                    : 'bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border-emerald-400/40'
                }`}
              >
                <Shield size={14} />
                <span>SHOCKWAVE (E) {shockwaveCooldown > 0 ? `(${Math.ceil(shockwaveCooldown / 20)}s)` : ''}</span>
              </button>
            </div>
          </div>

          {/* Game Over Screen Overlay */}
          {gameOver && (
            <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/85 backdrop-blur-md p-6 text-center animate-in fade-in duration-300">
              <div className="max-w-md p-8 rounded-3xl bg-[#090d16] border border-rose-500/40 shadow-2xl space-y-4">
                <div className="inline-flex p-3 rounded-2xl bg-rose-500/20 text-rose-400 border border-rose-500/30">
                  <Shield size={28} />
                </div>
                <h3 className="text-2xl font-extrabold text-white font-display">
                  Market Risk Breach!
                </h3>
                <p className="text-xs text-slate-300">
                  A flash-crash anomaly breached your VaR limits. 
                  Trading engine automatically halted execution to preserve capital.
                </p>

                <div className="py-3 px-4 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-around font-mono text-sm">
                  <div>
                    <div className="text-[10px] text-slate-400">FINAL P&L</div>
                    <div className="text-lg font-bold text-emerald-400">+${pnl.toLocaleString()}</div>
                  </div>
                  <div className="w-[1px] h-8 bg-white/[0.1]" />
                  <div>
                    <div className="text-[10px] text-slate-400">MAX STREAK</div>
                    <div className="text-lg font-bold text-cyan-400">{streak}</div>
                  </div>
                  <div className="w-[1px] h-8 bg-white/[0.1]" />
                  <div>
                    <div className="text-[10px] text-slate-400">HIGH SCORE</div>
                    <div className="text-lg font-bold text-amber-400">${highScore.toLocaleString()}</div>
                  </div>
                </div>

                <button
                  onClick={handleRestart}
                  className="w-full py-3 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black text-xs font-bold font-mono tracking-wider uppercase transition-all shadow-lg shadow-cyan-400/25 active:scale-95"
                >
                  Deploy New Arbitrage Run
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
