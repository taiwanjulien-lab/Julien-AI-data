import React from "react";

interface DeityMascotProps {
  deityId: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | number;
  animated?: boolean;
  className?: string;
  showAura?: boolean;
}

export const DeityMascot: React.FC<DeityMascotProps> = ({
  deityId,
  size = "md",
  animated = true,
  className = "",
  showAura = false,
}) => {
  let dimension = 64;
  if (typeof size === "number") {
    dimension = size;
  } else {
    switch (size) {
      case "xs":
        dimension = 36;
        break;
      case "sm":
        dimension = 48;
        break;
      case "md":
        dimension = 72;
        break;
      case "lg":
        dimension = 110;
        break;
      case "xl":
        dimension = 160;
        break;
    }
  }

  // Common styles
  const animClass = animated ? "hover:scale-105 transition-transform duration-300" : "";

  // Render individual chibi figurine artwork based on deityId
  const renderArt = () => {
    switch (deityId) {
      case "jade_emperor":
        return (
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full drop-shadow-md"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Golden Divine Aura */}
            <circle cx="50" cy="50" r="44" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="2" opacity="0.6" />
            <circle cx="50" cy="50" r="40" fill="#FDE68A" opacity="0.3" />
            {/* Imperial Robe */}
            <path d="M26 84 C26 62 36 58 50 58 C64 58 74 62 74 84 Z" fill="#D97706" stroke="#92400E" strokeWidth="2" />
            <path d="M42 58 L50 84 L58 58 Z" fill="#FBBF24" />
            <circle cx="50" cy="68" r="3" fill="#DC2626" />
            {/* Jade Tablet (圭) */}
            <rect x="47" y="60" width="6" height="18" rx="2" fill="#34D399" stroke="#065F46" strokeWidth="1" />
            {/* Chibi Face */}
            <circle cx="50" cy="42" r="18" fill="#FEE2E2" stroke="#B45309" strokeWidth="1.5" />
            {/* Cute Rosy Cheeks */}
            <ellipse cx="38" cy="45" rx="3.5" ry="2" fill="#F87171" opacity="0.6" />
            <ellipse cx="62" cy="45" rx="3.5" ry="2" fill="#F87171" opacity="0.6" />
            {/* Kind Eyes & Smile */}
            <path d="M38 40 Q41 38 44 40" stroke="#78350F" strokeWidth="2" strokeLinecap="round" />
            <path d="M56 40 Q59 38 62 40" stroke="#78350F" strokeWidth="2" strokeLinecap="round" />
            <path d="M47 46 Q50 49 53 46" stroke="#B45309" strokeWidth="1.5" strokeLinecap="round" />
            {/* Imperial Five-strand Beard */}
            <path d="M46 50 Q50 62 54 50 Z" fill="#451A03" />
            {/* Imperial Crown (冕旒) */}
            <rect x="32" y="24" width="36" height="8" rx="2" fill="#78350F" stroke="#F59E0B" strokeWidth="1.5" />
            <polygon points="50,14 42,24 58,24" fill="#F59E0B" stroke="#B45309" strokeWidth="1" />
            {/* Hanging Jade Beads */}
            <line x1="36" y1="32" x2="36" y2="38" stroke="#FBBF24" strokeWidth="1.5" strokeDasharray="2 1" />
            <line x1="42" y1="32" x2="42" y2="40" stroke="#DC2626" strokeWidth="1.5" strokeDasharray="2 1" />
            <line x1="50" y1="32" x2="50" y2="41" stroke="#34D399" strokeWidth="1.5" strokeDasharray="2 1" />
            <line x1="58" y1="32" x2="58" y2="40" stroke="#DC2626" strokeWidth="1.5" strokeDasharray="2 1" />
            <line x1="64" y1="32" x2="64" y2="38" stroke="#FBBF24" strokeWidth="1.5" strokeDasharray="2 1" />
          </svg>
        );

      case "guanyin":
        return (
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full drop-shadow-md"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Divine Moonlight Halo */}
            <circle cx="50" cy="46" r="42" fill="#E0F2FE" stroke="#38BDF8" strokeWidth="2" opacity="0.6" />
            <circle cx="50" cy="42" r="32" fill="#BAE6FD" opacity="0.3" />
            {/* White Sacred Robe */}
            <path d="M28 82 C28 62 38 56 50 56 C62 56 72 62 72 82 Z" fill="#F8FAFC" stroke="#94A3B8" strokeWidth="1.5" />
            <path d="M44 56 L50 78 L56 56 Z" fill="#38BDF8" opacity="0.3" />
            {/* White Head Scarf / Veil */}
            <path d="M30 46 C30 24 70 24 70 46 C70 58 64 68 64 68 L36 68 C36 68 30 58 30 46 Z" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.5" />
            {/* Pure Face */}
            <circle cx="50" cy="42" r="15" fill="#FFF1F2" stroke="#FDA4AF" strokeWidth="1" />
            {/* Serene Eyes & Gentle Smile */}
            <path d="M42 41 Q45 44 47 41" stroke="#334155" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M53 41 Q55 44 58 41" stroke="#334155" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M47 47 Q50 49 53 47" stroke="#E11D48" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="50" cy="35" r="1.5" fill="#E11D48" /> {/* Auspicious Bindi */}
            {/* Jade Clean Water Vase with Willow Branch */}
            <path d="M60 62 Q66 60 66 68 Q66 74 61 74 Z" fill="#A7F3D0" stroke="#059669" strokeWidth="1.2" />
            <path d="M63 60 C65 54 71 52 72 50" stroke="#10B981" strokeWidth="2" strokeLinecap="round" />
            <path d="M67 53 Q70 52 69 55" stroke="#059669" strokeWidth="1.5" strokeLinecap="round" />
            {/* Lotus Throne */}
            <ellipse cx="50" cy="85" rx="28" ry="7" fill="#FBCFE8" stroke="#F43F5E" strokeWidth="1.5" />
            <path d="M28 85 Q50 92 72 85" stroke="#E11D48" strokeWidth="1.5" />
          </svg>
        );

      case "mazu":
        return (
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full drop-shadow-md"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Auspicious Sea & Cloud Aura */}
            <circle cx="50" cy="50" r="43" fill="#FFE4E6" stroke="#FB7185" strokeWidth="2" opacity="0.6" />
            {/* Royal Imperial Court Robe */}
            <path d="M26 84 C26 62 36 56 50 56 C64 56 74 62 74 84 Z" fill="#BE123C" stroke="#881337" strokeWidth="2" />
            <path d="M42 56 L50 84 L58 56 Z" fill="#FBBF24" />
            {/* Auspicious Golden Ruyi */}
            <path d="M43 70 C48 66 54 66 58 63" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />
            <circle cx="59" cy="63" r="3" fill="#DC2626" />
            {/* Majestic Phoenix Crown (鳳冠) */}
            <rect x="33" y="24" width="34" height="8" rx="2" fill="#B45309" stroke="#FBBF24" strokeWidth="2" />
            <circle cx="50" cy="20" r="4" fill="#FBBF24" />
            <circle cx="41" cy="22" r="3" fill="#DC2626" />
            <circle cx="59" cy="22" r="3" fill="#DC2626" />
            {/* Beaded Curtains */}
            <line x1="38" y1="32" x2="38" y2="39" stroke="#FDE047" strokeWidth="1.5" strokeDasharray="2 1" />
            <line x1="44" y1="32" x2="44" y2="40" stroke="#F43F5E" strokeWidth="1.5" strokeDasharray="2 1" />
            <line x1="50" y1="32" x2="50" y2="41" stroke="#FDE047" strokeWidth="1.5" strokeDasharray="2 1" />
            <line x1="56" y1="32" x2="56" y2="40" stroke="#F43F5E" strokeWidth="1.5" strokeDasharray="2 1" />
            <line x1="62" y1="32" x2="62" y2="39" stroke="#FDE047" strokeWidth="1.5" strokeDasharray="2 1" />
            {/* Chibi Face */}
            <circle cx="50" cy="43" r="16" fill="#FFF1F2" stroke="#E11D48" strokeWidth="1" />
            <ellipse cx="39" cy="46" rx="3.5" ry="2" fill="#FB7185" opacity="0.6" />
            <ellipse cx="61" cy="46" rx="3.5" ry="2" fill="#FB7185" opacity="0.6" />
            <path d="M42 41 Q45 39 47 41" stroke="#881337" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M53 41 Q55 39 58 41" stroke="#881337" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M47 47 Q50 50 53 47" stroke="#BE123C" strokeWidth="1.5" strokeLinecap="round" />
            {/* Sea Waves Base */}
            <path d="M22 88 Q35 82 50 88 Q65 94 78 88" stroke="#38BDF8" strokeWidth="3" strokeLinecap="round" />
          </svg>
        );

      case "xuantian":
        return (
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full drop-shadow-md"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Water Element & Northern Xuanwu Ripple Aura */}
            <circle cx="50" cy="50" r="43" fill="#EFF6FF" stroke="#2563EB" strokeWidth="2" opacity="0.7" />
            <circle cx="50" cy="50" r="38" fill="#DBEAFE" opacity="0.4" />
            {/* Dark Taoist Robe (Black / Navy) */}
            <path d="M26 84 C26 62 36 56 50 56 C64 56 74 62 74 84 Z" fill="#1E3A8A" stroke="#172554" strokeWidth="2" />
            <path d="M44 56 L50 84 L56 56 Z" fill="#38BDF8" />
            {/* Seven-Star Sword (七星寶劍) */}
            <line x1="22" y1="50" x2="22" y2="82" stroke="#94A3B8" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M19 60 L25 60" stroke="#F59E0B" strokeWidth="2" />
            <circle cx="22" cy="52" r="1.5" fill="#FBBF24" />
            <circle cx="22" cy="56" r="1.2" fill="#38BDF8" />
            {/* Chibi Face */}
            <circle cx="50" cy="42" r="16" fill="#FEF3C7" stroke="#1E3A8A" strokeWidth="1.5" />
            {/* Stern yet Resolute Black Eyebrows & Eyes */}
            <path d="M40 38 L46 40" stroke="#0F172A" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M54 40 L60 38" stroke="#0F172A" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="43" cy="42" r="1.8" fill="#0F172A" />
            <circle cx="57" cy="42" r="1.8" fill="#0F172A" />
            <path d="M47 47 Q50 49 53 47" stroke="#1E3A8A" strokeWidth="1.5" strokeLinecap="round" />
            {/* Majestic Beard */}
            <path d="M45 50 Q50 64 55 50 Z" fill="#0F172A" />
            {/* Taoist Headcap with Seven Stars */}
            <rect x="36" y="24" width="28" height="8" rx="2" fill="#0F172A" stroke="#38BDF8" strokeWidth="1.5" />
            <polygon points="50,16 44,24 56,24" fill="#2563EB" />
            <circle cx="50" cy="20" r="2" fill="#FDE047" />
            {/* Cute Turtle & Snake Generals at feet */}
            {/* Turtle (龜將) */}
            <ellipse cx="68" cy="80" rx="9" ry="6" fill="#15803D" stroke="#14532D" strokeWidth="1" />
            <circle cx="76" cy="78" r="2" fill="#166534" />
            {/* Snake (蛇將) coiled */}
            <path d="M60 84 Q65 76 72 82 Q76 86 80 82" stroke="#EAB308" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        );

      case "guan_gong":
        return (
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full drop-shadow-md"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Valiant Crimson Fire Aura */}
            <circle cx="50" cy="50" r="43" fill="#FEF2F2" stroke="#EF4444" strokeWidth="2" opacity="0.6" />
            {/* Green Combat Dragon Robe */}
            <path d="M26 84 C26 62 36 56 50 56 C64 56 74 62 74 84 Z" fill="#15803D" stroke="#14532D" strokeWidth="2" />
            <path d="M44 56 L50 84 L56 56 Z" fill="#DC2626" />
            {/* Blue Dragon Crescent Blade */}
            <line x1="78" y1="42" x2="78" y2="86" stroke="#78716C" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M78 42 Q86 34 84 26 Q76 34 78 42 Z" fill="#38BDF8" stroke="#0284C7" strokeWidth="1.2" />
            {/* Green Hero Hood */}
            <path d="M34 26 C34 18 66 18 66 26 L66 36 L34 36 Z" fill="#166534" stroke="#14532D" strokeWidth="1.5" />
            <circle cx="50" cy="24" r="3" fill="#FBBF24" />
            {/* Red Loyal Face */}
            <circle cx="50" cy="42" r="16" fill="#DC2626" stroke="#991B1B" strokeWidth="1.5" />
            {/* Gallant Eyes & Phoenix Brows */}
            <path d="M39 38 Q43 36 46 39" stroke="#FEF08A" strokeWidth="2" strokeLinecap="round" />
            <path d="M54 39 Q57 36 61 38" stroke="#FEF08A" strokeWidth="2" strokeLinecap="round" />
            <ellipse cx="44" cy="41" rx="1.5" ry="2" fill="#000000" />
            <ellipse cx="56" cy="41" rx="1.5" ry="2" fill="#000000" />
            {/* Long Beautiful Black Beard (美髯) */}
            <path d="M43 47 C43 68 47 72 50 72 C53 72 57 68 57 47 Z" fill="#171717" />
          </svg>
        );

      case "wenchang":
        return (
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full drop-shadow-md"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Wisdom Wood Aura */}
            <circle cx="50" cy="50" r="43" fill="#ECFDF5" stroke="#10B981" strokeWidth="2" opacity="0.6" />
            {/* Scholar Official Robe */}
            <path d="M26 84 C26 62 36 56 50 56 C64 56 74 62 74 84 Z" fill="#047857" stroke="#064E3B" strokeWidth="2" />
            <path d="M44 56 L50 84 L56 56 Z" fill="#F59E0B" />
            {/* Golden Brush (魁星硃砂筆) */}
            <line x1="72" y1="52" x2="80" y2="76" stroke="#B45309" strokeWidth="2.5" strokeLinecap="round" />
            <polygon points="72,52 69,48 74,48" fill="#DC2626" />
            {/* Scholar Official Hat with Wings */}
            <rect x="36" y="24" width="28" height="9" rx="2" fill="#0F172A" />
            <line x1="24" y1="28" x2="36" y2="28" stroke="#0F172A" strokeWidth="3" strokeLinecap="round" />
            <line x1="64" y1="28" x2="76" y2="28" stroke="#0F172A" strokeWidth="3" strokeLinecap="round" />
            {/* Cultured Face */}
            <circle cx="50" cy="42" r="16" fill="#FFFBEB" stroke="#B45309" strokeWidth="1" />
            <ellipse cx="40" cy="45" rx="3" ry="1.5" fill="#FBBF24" opacity="0.6" />
            <ellipse cx="60" cy="45" rx="3" ry="1.5" fill="#FBBF24" opacity="0.6" />
            <path d="M41 40 Q44 38 46 40" stroke="#064E3B" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M54 40 Q56 38 59 40" stroke="#064E3B" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M47 47 Q50 49 53 47" stroke="#B45309" strokeWidth="1.5" strokeLinecap="round" />
            {/* Cultured Small Beard */}
            <path d="M47 50 Q50 58 53 50 Z" fill="#1E293B" />
          </svg>
        );

      case "tudigong":
        return (
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full drop-shadow-md"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Earthy Wealth Aura */}
            <circle cx="50" cy="50" r="43" fill="#FFFBEB" stroke="#F59E0B" strokeWidth="2" opacity="0.6" />
            {/* Earth God Robe */}
            <path d="M26 84 C26 62 36 56 50 56 C64 56 74 62 74 84 Z" fill="#B45309" stroke="#78350F" strokeWidth="2" />
            {/* Huge Shiny Gold Ingot (元寶) */}
            <path d="M38 72 C38 66 62 66 62 72 C62 78 38 78 38 72 Z" fill="#FBBF24" stroke="#D97706" strokeWidth="1.5" />
            <ellipse cx="50" cy="69" rx="6" ry="3" fill="#FEF08A" />
            {/* Friendly Cap */}
            <path d="M32 26 C32 20 68 20 68 26 L68 34 L32 34 Z" fill="#991B1B" stroke="#7F1D1D" strokeWidth="1.5" />
            <circle cx="50" cy="24" r="3" fill="#FBBF24" />
            {/* Chubby Jolly Face */}
            <circle cx="50" cy="42" r="17" fill="#FEF3C7" stroke="#B45309" strokeWidth="1.2" />
            <ellipse cx="38" cy="46" rx="4" ry="2.5" fill="#F87171" opacity="0.6" />
            <ellipse cx="62" cy="46" rx="4" ry="2.5" fill="#F87171" opacity="0.6" />
            {/* Happy Crescent Eyes */}
            <path d="M40 40 Q43 43 46 40" stroke="#78350F" strokeWidth="2.2" strokeLinecap="round" />
            <path d="M54 40 Q57 43 60 40" stroke="#78350F" strokeWidth="2.2" strokeLinecap="round" />
            {/* Big Fluffy White Beard */}
            <path d="M36 48 Q50 68 64 48 Q50 56 36 48 Z" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />
            <circle cx="50" cy="45" r="2" fill="#F87171" />
          </svg>
        );

      case "zhusheng":
        return (
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full drop-shadow-md"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Motherly Floral Aura */}
            <circle cx="50" cy="50" r="43" fill="#FDF4FF" stroke="#E879F9" strokeWidth="2" opacity="0.6" />
            {/* Pink / Fuchsia Robe */}
            <path d="M26 84 C26 62 36 56 50 56 C64 56 74 62 74 84 Z" fill="#C026D3" stroke="#86198F" strokeWidth="2" />
            <path d="M44 56 L50 84 L56 56 Z" fill="#FDE047" />
            {/* Baby Book / Child in arms */}
            <rect x="42" y="64" width="16" height="14" rx="2" fill="#FCE7F3" stroke="#BE185D" strokeWidth="1.2" />
            <path d="M50 64 L50 78" stroke="#DB2777" strokeWidth="1" />
            {/* Pearl Hairpin Crown */}
            <path d="M36 28 C36 18 64 18 64 28 Z" fill="#4A044E" />
            <circle cx="50" cy="22" r="3.5" fill="#F472B6" />
            <circle cx="41" cy="26" r="2.5" fill="#FDE047" />
            <circle cx="59" cy="26" r="2.5" fill="#FDE047" />
            {/* Kind Mother Face */}
            <circle cx="50" cy="42" r="16" fill="#FFF1F2" stroke="#DB2777" strokeWidth="1.2" />
            <ellipse cx="39" cy="46" rx="3.5" ry="2" fill="#F472B6" opacity="0.6" />
            <ellipse cx="61" cy="46" rx="3.5" ry="2" fill="#F472B6" opacity="0.6" />
            <path d="M41 41 Q44 39 47 41" stroke="#831843" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M53 41 Q56 39 59 41" stroke="#831843" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M47 48 Q50 51 53 48" stroke="#E11D48" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        );

      case "buddha":
        return (
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full drop-shadow-md"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Radiating Dharma Light Halo */}
            <circle cx="50" cy="44" r="42" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="2" opacity="0.6" />
            <circle cx="50" cy="44" r="34" fill="#FDE68A" opacity="0.4" />
            {/* Kasaya Golden Robe */}
            <path d="M26 84 C26 64 36 60 50 60 C64 60 74 64 74 84 Z" fill="#D97706" stroke="#92400E" strokeWidth="2" />
            <path d="M34 62 L66 84" stroke="#F59E0B" strokeWidth="3" />
            {/* Snail Curls Hair (肉髻螺髮) */}
            <circle cx="50" cy="22" r="6" fill="#1E1B4B" />
            <circle cx="43" cy="26" r="4.5" fill="#1E1B4B" />
            <circle cx="57" cy="26" r="4.5" fill="#1E1B4B" />
            <circle cx="50" cy="28" r="5" fill="#1E1B4B" />
            {/* Golden Serene Face */}
            <circle cx="50" cy="42" r="17" fill="#FEF08A" stroke="#CA8A04" strokeWidth="1.5" />
            <circle cx="50" cy="35" r="1.5" fill="#DC2626" /> {/* White Curl Dot */}
            {/* Long Earlobe */}
            <path d="M32 40 Q30 48 33 50" stroke="#CA8A04" strokeWidth="2" strokeLinecap="round" />
            <path d="M68 40 Q70 48 67 50" stroke="#CA8A04" strokeWidth="2" strokeLinecap="round" />
            {/* Meditative Crescent Eyes & Subtle Smile */}
            <path d="M41 41 Q45 44 48 41" stroke="#713F12" strokeWidth="2" strokeLinecap="round" />
            <path d="M52 41 Q55 44 59 41" stroke="#713F12" strokeWidth="2" strokeLinecap="round" />
            <path d="M47 48 Q50 51 53 48" stroke="#B45309" strokeWidth="1.8" strokeLinecap="round" />
            {/* Pink Lotus Throne */}
            <ellipse cx="50" cy="86" rx="28" ry="7" fill="#FBCFE8" stroke="#DB2777" strokeWidth="1.5" />
          </svg>
        );

      case "jesus":
        return (
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full drop-shadow-md"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Golden Radiant Cruciform Halo */}
            <circle cx="50" cy="42" r="42" fill="#FEF2F2" stroke="#F87171" strokeWidth="2" opacity="0.6" />
            <line x1="50" y1="6" x2="50" y2="78" stroke="#FCA5A5" strokeWidth="1.5" strokeDasharray="3 2" />
            <line x1="14" y1="42" x2="86" y2="42" stroke="#FCA5A5" strokeWidth="1.5" strokeDasharray="3 2" />
            {/* White Tunic with Red Sash */}
            <path d="M26 84 C26 62 36 56 50 56 C64 56 74 62 74 84 Z" fill="#F8FAFC" stroke="#94A3B8" strokeWidth="1.5" />
            <path d="M34 58 Q50 68 66 84" stroke="#DC2626" strokeWidth="4" strokeLinecap="round" />
            {/* Sacred Heart in Center */}
            <circle cx="50" cy="68" r="4" fill="#EF4444" />
            <line x1="50" y1="62" x2="50" y2="65" stroke="#F59E0B" strokeWidth="1.5" />
            {/* Flowing Chestnut Hair */}
            <path d="M30 36 C30 22 70 22 70 36 C70 52 64 62 64 62 L36 62 C36 62 30 52 30 36 Z" fill="#78350F" />
            {/* Loving Face */}
            <circle cx="50" cy="42" r="16" fill="#FFFBEB" stroke="#B45309" strokeWidth="1" />
            {/* Friendly Warm Beard */}
            <path d="M43 47 Q50 60 57 47 Z" fill="#78350F" />
            {/* Gentle Eyes & Smile */}
            <path d="M41 40 Q44 38 47 40" stroke="#451A03" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M53 40 Q56 38 59 40" stroke="#451A03" strokeWidth="1.8" strokeLinecap="round" />
            <circle cx="44" cy="42" r="1.5" fill="#451A03" />
            <circle cx="56" cy="42" r="1.5" fill="#451A03" />
            <path d="M47 47 Q50 49 53 47" stroke="#DC2626" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        );

      case "allah":
        return (
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full drop-shadow-md"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Respecting Islamic tradition: Pure Sacred Emblem of Divine Light & Peace */}
            {/* Outer Sacred Emerald & Gold Mandala */}
            <circle cx="50" cy="50" r="44" fill="#ECFDF5" stroke="#10B981" strokeWidth="2.5" />
            {/* Eight-Pointed Star (Rub el Hizb) */}
            <rect x="22" y="22" width="56" height="56" rx="4" fill="#047857" stroke="#F59E0B" strokeWidth="1.5" />
            <rect
              x="22"
              y="22"
              width="56"
              height="56"
              rx="4"
              transform="rotate(45 50 50)"
              fill="#065F46"
              stroke="#F59E0B"
              strokeWidth="1.5"
            />
            {/* Inner Golden Medallion */}
            <circle cx="50" cy="50" r="28" fill="#064E3B" stroke="#FBBF24" strokeWidth="1.5" />
            {/* Shining Radiant Golden Crescent Moon */}
            <path
              d="M48 30 C56 34 58 46 52 56 C46 66 34 68 28 62 C38 68 50 64 56 52 C60 42 56 32 48 30 Z"
              fill="#FBBF24"
            />
            {/* Divine Five-Pointed Star */}
            <polygon
              points="60,34 63,40 70,40 64,44 67,50 60,46 53,50 56,44 50,40 57,40"
              fill="#FEF08A"
            />
            {/* Calligraphic Peace Motif (Light of Mercy) */}
            <circle cx="50" cy="50" r="8" fill="#FBBF24" opacity="0.3" />
            <text x="50" y="54" textAnchor="middle" fill="#FEF08A" fontSize="10" fontWeight="bold" fontFamily="serif">
              سلام
            </text>
          </svg>
        );

      case "laozi":
        return (
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full drop-shadow-md"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Purple Cloud Aura (紫氣東來) */}
            <circle cx="50" cy="50" r="43" fill="#EEF2FF" stroke="#6366F1" strokeWidth="2" opacity="0.6" />
            {/* Taoist Taiji Robe */}
            <path d="M26 84 C26 62 36 56 50 56 C64 56 74 62 74 84 Z" fill="#4338CA" stroke="#312E81" strokeWidth="2" />
            {/* Taiji Yin-Yang on Robe */}
            <circle cx="50" cy="70" r="6" fill="#FFFFFF" stroke="#000000" strokeWidth="1" />
            <path d="M50 64 A 3 3 0 0 1 50 70 A 3 3 0 0 0 50 76 A 6 6 0 0 1 50 64" fill="#000000" />
            <circle cx="50" cy="67" r="1" fill="#FFFFFF" />
            <circle cx="50" cy="73" r="1" fill="#000000" />
            {/* Horsehair Duster (拂塵) */}
            <line x1="72" y1="50" x2="78" y2="76" stroke="#92400E" strokeWidth="2" strokeLinecap="round" />
            <path d="M72 50 Q78 40 82 44" stroke="#F8FAFC" strokeWidth="3" strokeLinecap="round" />
            {/* White Sage Bun */}
            <circle cx="50" cy="24" r="7" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.5" />
            {/* Kind Aged Sage Face */}
            <circle cx="50" cy="42" r="17" fill="#FEF3C7" stroke="#B45309" strokeWidth="1" />
            {/* Long Silver Eyebrows */}
            <path d="M38 38 Q33 46 32 48" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M62 38 Q67 46 68 48" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
            {/* Peaceful Squinty Eyes */}
            <path d="M41 41 Q44 43 47 41" stroke="#451A03" strokeWidth="2" strokeLinecap="round" />
            <path d="M53 41 Q56 43 59 41" stroke="#451A03" strokeWidth="2" strokeLinecap="round" />
            {/* Long Flowing Silver Beard */}
            <path d="M42 48 Q50 74 58 48 Q50 56 42 48 Z" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />
          </svg>
        );

      case "confucius":
        return (
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full drop-shadow-md"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Confucian Golden-Brown Aura */}
            <circle cx="50" cy="50" r="43" fill="#FFFBEB" stroke="#B45309" strokeWidth="2" opacity="0.6" />
            {/* Traditional Scholar Gown */}
            <path d="M26 84 C26 62 36 56 50 56 C64 56 74 62 74 84 Z" fill="#78350F" stroke="#451A03" strokeWidth="2" />
            {/* Reverence Salute (作揖 Hands Folded) */}
            <rect x="42" y="64" width="16" height="10" rx="3" fill="#D97706" stroke="#92400E" strokeWidth="1.2" />
            {/* Han Dynasty Scholar Hat */}
            <path d="M34 22 L66 22 L62 32 L38 32 Z" fill="#1C1917" stroke="#44403C" strokeWidth="1.2" />
            <rect x="47" y="16" width="6" height="8" fill="#F59E0B" />
            {/* Venerable Sage Face */}
            <circle cx="50" cy="42" r="16" fill="#FEF3C7" stroke="#B45309" strokeWidth="1" />
            <ellipse cx="40" cy="45" rx="3" ry="1.5" fill="#F59E0B" opacity="0.5" />
            <ellipse cx="60" cy="45" rx="3" ry="1.5" fill="#F59E0B" opacity="0.5" />
            {/* Dignified Wise Eyes & Smile */}
            <path d="M41 40 Q44 38 47 40" stroke="#451A03" strokeWidth="2" strokeLinecap="round" />
            <path d="M53 40 Q56 38 59 40" stroke="#451A03" strokeWidth="2" strokeLinecap="round" />
            <path d="M47 47 Q50 49 53 47" stroke="#78350F" strokeWidth="1.5" strokeLinecap="round" />
            {/* Neat Scholarly Beard */}
            <path d="M44 49 Q50 62 56 49 Z" fill="#292524" />
          </svg>
        );

      default:
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
            <circle cx="50" cy="50" r="40" fill="#F59E0B" opacity="0.2" />
            <circle cx="50" cy="50" r="30" fill="#F59E0B" />
            <text x="50" y="55" textAnchor="middle" fill="#FFFFFF" fontSize="16" fontWeight="bold">
              神
            </text>
          </svg>
        );
    }
  };

  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 ${animClass} ${className}`}
      style={{ width: dimension, height: dimension }}
    >
      {showAura && (
        <div className="absolute inset-0 rounded-full bg-amber-400/20 blur-md animate-pulse pointer-events-none" />
      )}
      {renderArt()}
    </div>
  );
};
