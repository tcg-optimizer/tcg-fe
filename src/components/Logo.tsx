import Image from 'next/image';

interface LogoProps {
  className?: string;
}

const Logo = ({ className }: LogoProps) => {
  return (
    <div className={`${className}`}>
      <Image
        src="/tcgscanner-logo.svg"
        alt="logo"
        width={500}
        height={500}
        className="w-full h-full object-contain"
      />
    </div>
  );
};

export default Logo;
