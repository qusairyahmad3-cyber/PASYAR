interface PasyarLogoProps {
  className?: string;
  showTagline?: boolean;
  onClick?: () => void;
}

export default function PasyarLogo({
  className = "h-11",
  onClick,
}: PasyarLogoProps) {
  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center select-none cursor-pointer group transition-transform hover:opacity-95 duration-150 ${onClick ? 'cursor-pointer' : ''}`}
      title="PASYAR (Pasar Santri Syari'ah) - Dari Pesantren, Tumbuh untuk Umat"
    >
      <img
        src="/assets/aistudio/Pasyar_Islamic_Marketplace_Logo_862bfb5d.png"
        alt="PASYAR - Pasar Santri Syariah"
        referrerPolicy="no-referrer"
        className={`w-auto object-contain max-h-12 group-hover:scale-[1.02] transition-transform duration-200 ${className}`}
      />
    </div>
  );
}
