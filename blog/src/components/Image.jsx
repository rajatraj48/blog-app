import { IKImage } from "imagekitio-react";
import React from "react";

const Image = ({ src, className,w,h }) => {
  return (
    <IKImage
      urlEndpoint={import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT}
      path={src}
      className={className}
      loading='lazy'
      lqip={{ active: true, quality: 20 }}
      width ={w}
      height = {h}
    ></IKImage>
  );
};

export default Image;
