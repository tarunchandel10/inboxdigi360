import Image from 'next/image';

const CustomButton = ({ href, text, iconSrc }) => (
  <a href={href}>
    <button
      type="button"
      className="btn btn-outline-success"
    >
      {text}
      {iconSrc && (
        <Image
          src={iconSrc}
          alt="Icon"
          width={20}
          height={20}
          style={{ width: '20px', height: '20px', marginLeft: '5px' }}
        />
      )}
    </button>
  </a>
);

export default CustomButton;
