// Audio synthesis using Web Audio API (No external sound files required)

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    audioCtx = new AudioContextClass();
  }
  if (audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  return audioCtx;
}

// 1. Temple Bell / Singing Bowl (磬聲、廟宇銅鐘)
export function playTempleBell(freq = 440, duration = 2.5) {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, now);

    osc2.type = "sine";
    osc2.frequency.setValueAtTime(freq * 1.503, now); // subtle metallic overtone

    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.35, now + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    osc.connect(gain);
    osc2.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc2.start(now);
    osc.stop(now + duration);
    osc2.stop(now + duration);
  } catch (e) {
    // Audio might be blocked by user gesture policy on initial load
  }
}

// 2. Wooden Fish (木魚聲)
export function playWoodenFish() {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(580, now);
    osc.frequency.exponentialRampToValueAtTime(320, now + 0.08);

    gain.gain.setValueAtTime(0.4, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.12);
  } catch (e) {}
}

// 3. Bamboo Sticks Rustling in Cylinder (搖籤筒晃竹籤聲)
export function playBambooSticks() {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    for (let i = 0; i < 4; i++) {
      const clickTime = now + i * 0.06 + Math.random() * 0.02;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "square";
      osc.frequency.setValueAtTime(800 + Math.random() * 600, clickTime);
      osc.frequency.exponentialRampToValueAtTime(200, clickTime + 0.03);

      gain.gain.setValueAtTime(0.15, clickTime);
      gain.gain.exponentialRampToValueAtTime(0.001, clickTime + 0.04);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(clickTime);
      osc.stop(clickTime + 0.04);
    }
  } catch (e) {}
}

// 4. Jiao Wooden Blocks Dropping and Bouncing on Floor (擲筊落地木碰聲)
export function playJiaoDrop(isShengJiao: boolean) {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    // Two wooden pieces hitting floor with slight delay and small bounces
    const hits = [0, 0.05, 0.14, 0.22];
    hits.forEach((offset, idx) => {
      const hitTime = now + offset;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      const baseFreq = idx % 2 === 0 ? 320 : 410;
      osc.frequency.setValueAtTime(baseFreq + Math.random() * 40, hitTime);
      osc.frequency.exponentialRampToValueAtTime(140, hitTime + 0.06);

      const hitVolume = Math.max(0.04, 0.35 * Math.pow(0.5, idx));
      gain.gain.setValueAtTime(hitVolume, hitTime);
      gain.gain.exponentialRampToValueAtTime(0.001, hitTime + 0.07);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(hitTime);
      osc.stop(hitTime + 0.07);
    });

    // If sheng jiao (blessed affirmative), follow up with a gentle golden tone chime
    if (isShengJiao) {
      setTimeout(() => {
        playTempleBell(587.33, 1.8); // D5 note auspicious bell
      }, 300);
    }
  } catch (e) {}
}
