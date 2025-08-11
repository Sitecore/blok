
import Image from 'next/image';
import Link from 'next/link';

type ComponentProps = {
  name: string;
  imageSrc: string;
  href: string;
};

const ComponentsBox = ({ name, imageSrc, href }: ComponentProps) => {
  return (
    <Link href={href}>
      <div className='bg-background h-[175px] w-[210px] rounded-lg p-4 flex flex-col justify-between cursor-pointer hover:shadow-lg transition'>
        <Image src={imageSrc} width={170} height={94} alt={name} />
        <h5 className='text-foreground text-lg font-semibold'>{name}</h5>
      </div>
    </Link>
  );
};

export default ComponentsBox;
