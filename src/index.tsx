"use client";

import {
  type MouseEventHandler,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Blurhash } from "react-blurhash";
import { useIsVisable } from "./is-visible";
import { isSafari } from "./safari";
import { cn } from "./tailwind";

// used for the safari double request bug
const emptyGif = `data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=`;

export const LazyImage = (props: {
  // Source of the image (Required)
  src?: string;
  // Source set of the image (Optional)
  srcset?: string;
  // Sizes of the image (Optional)
  sizes?: string;
  // Blur hash of the image (Optional)
  blurHash?: string;
  // Blur data URL of the image (Optional)
  blurDataURL?: string;
  // Alt text of the image (Optional)
  alt?: string;
  // Title of the image (Optional)
  title?: string;
  // ClassNames for the wrapper of the image (Optional)
  wrapperClassName?: string;
  // ClassNames for the image (Optional)
  className?: string;
  // ClassNames for the image when it's not loaded yet (Optional)
  unloadedClassName?: string;
  // Style for the wrapper of the image (Optional)
  wrapperStyle?: React.CSSProperties;
  // Style for the image (Optional)
  style?: React.CSSProperties;
  // Width of the image (Optional)
  width?: string | number;
  // Height of the image (Optional)
  height?: string | number;
  // If the image should be loaded instantly
  instantLoading?: boolean;
  // Disable overflow hidden on the wrapper
  disableOverflowHidden?: boolean;
  // Overwrites the default background color when no image / blurhash / blurDataURL is set or loaded (Default: #e4e4e7)
  overwriteBackgroundColor?: string;
  // Click event handler
  onClick?: MouseEventHandler<HTMLImageElement>;
  // Context menu event handler
  onContextMenu?: MouseEventHandler<HTMLImageElement>;
}) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const imageWrapper = useRef<HTMLDivElement>(null);
  const wasImageVisibleOnScreen = useIsVisable(imageWrapper, "0px");

  useEffect(() => {
    if (!props.src) return;
    if (!props.blurDataURL && !props.blurHash) return; // No blurhash or blurDataURL, so we can't show a placeholder anyway
    if (!wasImageVisibleOnScreen && !props.instantLoading) return;

    const img = new Image();

    if (props.srcset && isSafari()) {
      img.src = emptyGif;
    } else {
      img.src = props.src ?? "";
    }

    img.srcset = props.srcset ?? "";
    img.sizes = props.sizes ?? "";
    img.alt = props.alt ?? "";
    img.title = props.title ?? "";

    img.onload = () => {
      setIsImageLoaded(true);
    };
    return () => img.remove();
  }, [wasImageVisibleOnScreen]);

  const wrapperStyle = useMemo(() => {
    return {
      overflow: props.disableOverflowHidden ? undefined : "hidden",
      backgroundColor: props.overwriteBackgroundColor ?? "#e4e4e7", // bg-zinc-200
      ...props.wrapperStyle,
    };
  }, [
    props.disableOverflowHidden,
    props.overwriteBackgroundColor,
    props.wrapperStyle,
  ]);

  if (!props.src && !props.blurHash && !props.blurDataURL)
    return (
      <div
        ref={imageWrapper}
        className={props.wrapperClassName}
        onClick={props.onClick}
        onContextMenu={props.onContextMenu}
        style={wrapperStyle}
        data-loaded={isImageLoaded}
      >
        <div
          style={{
            width: props.width ?? "100%",
            height: props.height ?? "100%",
            ...props.style,
          }}
          className={props.className}
        />
      </div>
    );

  if (props.blurHash)
    return (
      <div
        ref={imageWrapper}
        className={cn(
          !isImageLoaded && props.unloadedClassName,
          props.wrapperClassName,
        )}
        style={wrapperStyle}
        data-loaded={isImageLoaded}
      >
        {isImageLoaded && (
          <img
            src={props.srcset && isSafari() ? emptyGif : props.src}
            alt={props.alt}
            title={props.title}
            srcSet={props.srcset}
            sizes={props.sizes}
            width={!props.sizes ? props.width ?? "100%" : undefined}
            height={!props.sizes ? props.height ?? "100%" : undefined}
            className={props.className}
            onClick={props.onClick}
            onContextMenu={props.onContextMenu}
            style={{
              width: props.width ?? "100%",
              height: props.height ?? "100%",
              ...props.style,
            }}
            data-loaded={true}
          />
        )}
        {!isImageLoaded && (
          <Blurhash
            hash={props.blurHash || ""}
            height={props.height ?? "100%"}
            width={props.width ?? "100%"}
            punch={1}
          />
        )}
      </div>
    );

  if (props.blurDataURL)
    return (
      <div
        ref={imageWrapper}
        className={cn(
          !isImageLoaded && props.unloadedClassName,
          props.wrapperClassName,
        )}
        style={wrapperStyle}
        data-loaded={isImageLoaded}
      >
        {!isImageLoaded && (
          <img
            src={props.blurDataURL}
            alt={props.alt}
            title={props.title}
            sizes={props.sizes}
            width={!props.sizes ? props.width ?? "100%" : undefined}
            height={!props.sizes ? props.height ?? "100%" : undefined}
            className={props.className}
            onClick={props.onClick}
            onContextMenu={props.onContextMenu}
            style={{
              width: props.width ?? "100%",
              height: props.height ?? "100%",
              ...props.style,
            }}
            data-loaded={false}
          />
        )}
        {isImageLoaded && (
          <img
            src={props.srcset && isSafari() ? emptyGif : props.src}
            srcSet={props.srcset}
            sizes={props.sizes}
            alt={props.alt}
            title={props.title}
            width={!props.sizes ? props.width ?? "100%" : undefined}
            height={!props.sizes ? props.height ?? "100%" : undefined}
            className={props.className}
            onClick={props.onClick}
            onContextMenu={props.onContextMenu}
            style={{
              width: props.width ?? "100%",
              height: props.height ?? "100%",
              ...props.style,
            }}
            data-loaded={true}
          />
        )}
      </div>
    );

  return (
    <div
      ref={imageWrapper}
      className={cn(
        !isImageLoaded && props.unloadedClassName,
        props.wrapperClassName,
      )}
      style={wrapperStyle}
      data-loaded={isImageLoaded}
    >
      {wasImageVisibleOnScreen && (
        <img
          src={props.srcset && isSafari() ? emptyGif : props.src}
          srcSet={props.srcset}
          sizes={props.sizes}
          alt={props.alt}
          loading="lazy"
          onLoad={() => {
            setIsImageLoaded(true);
          }}
          onClick={props.onClick}
          onContextMenu={props.onContextMenu}
          width={props.width ?? "100%"}
          height={props.height ?? "100%"}
          className={props.className}
          style={{
            width: props.width ?? "100%",
            height: props.height ?? "100%",
            ...props.style,
          }}
          data-loaded={isImageLoaded}
        />
      )}
    </div>
  );
};
