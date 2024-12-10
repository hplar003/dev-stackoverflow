import Image from "next/image";
import Link from "next/link";
import React from "react";

const Metric = ({
  imgUrl,
  alt,
  value,
  title,
  href,
  imgStyles,
  isAuthor,
  textStyles,
}: Metric) => {
  const metricContent = (
    <>
      <Image
        src={imgUrl}
        alt={alt}
        width={16}
        height={16}
        className={`rounded-full object-contain ${imgStyles}`}
      />
      <p className={`${textStyles} flex items-center gap-1`}>
        {value}

        <span
          className={`small-regular line-clamp-1 ${isAuthor ? "max-sm:hidden" : ""}`}
        >
          {title}
        </span>
      </p>
    </>
  );
  return (
    <div>
      {href ? (
        <Link className="flex-center gap-1" href={href}>
          {metricContent}
        </Link>
      ) : (
        <div className="flex-center gap-1">{metricContent}</div>
      )}
    </div>
  );
};

export default Metric;
