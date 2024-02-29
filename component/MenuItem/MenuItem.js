import Image from "next/image";
import Link from "next/link";

const MenuItem = ({ href, src, alt, text, activeLink }) => {
  const isActive = href === activeLink;

  return (
    <li >
      <Link href={href} className={isActive ? 'active' : ''}>
          <span>
            <Image
              src={src}
              width={26}
              height={20}
              alt={alt}
              style={{ width: "26px", height: "20px" }}
            />
          </span>
          <strong>{text}</strong>
      </Link>
    </li>
  );
};

export default MenuItem;
