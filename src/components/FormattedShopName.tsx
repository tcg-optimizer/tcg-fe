import Image from 'next/image';

const FormattedShopName = ({ name }: { name: string }) => {
  const [brand, ...shopNames] = name.split('_');
  const shopName = shopNames.length > 0 ? shopNames.join(' ') : brand;

  if (brand === 'Naver') {
    return (
      <span className="flex items-center gap-2">
        <Image
          src="/icons/naver_icon.png"
          alt="Naver"
          width={64}
          height={64}
          className="w-4"
        />
        {shopName}
      </span>
    );
  }

  return <span>{name}</span>;
};

export default FormattedShopName;
