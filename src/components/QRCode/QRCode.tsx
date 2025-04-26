import React, { Ref, useEffect, useImperativeHandle, useRef } from "react";
import { FileWithPath } from "@mantine/dropzone";
import QRCodeStyling, { DownloadOptions, Options } from "qr-code-styling";

export type QRRef = {
  downloadQRCode: (downloadOptions?: Partial<DownloadOptions> | string) => void;
  generateQRCode: (url: string) => void;
};

type QR = Ref<QRRef>;

interface QRCodeProps {
  backgroundColor: string;
  icon: FileWithPath | null;
  qrColor: string;
  ref: QR;
  url: string;
}

const options: Options = {
  backgroundOptions: {
    color: "#ffffff",
    round: 0.2,
  },
  cornersDotOptions: {
    type: "extra-rounded",
  },
  cornersSquareOptions: {
    type: "extra-rounded",
  },
  data: "https://qr.korotkovs.ru",
  dotsOptions: {
    color: "#000000",
    type: "rounded",
  },
  height: 240,
  imageOptions: {
    crossOrigin: "anonymous",
    hideBackgroundDots: true,
    margin: 10,
  },
  margin: 10,
  type: "svg",
  width: 240,
};

export const QRCode = ({ ref, ...props }: QRCodeProps) => {
  const qrCodeRef = useRef<QRCodeStyling>(null);

  useImperativeHandle(ref, () => {
    return {
      downloadQRCode: (downloadOptions?: Partial<DownloadOptions> | string) => {
        const qr = new QRCodeStyling(options);

        qr.update({
          backgroundOptions: {
            color: props.backgroundColor,
          },
          data: props.url,
          dotsOptions: {
            color: props.qrColor,
          },
          height: 4064,

          image: props.icon ? URL.createObjectURL(props.icon) : undefined,
          imageOptions: {
            crossOrigin: "anonymous",
            hideBackgroundDots: true,
            margin: 100,
          },
          margin: 150,
          width: 4064,
        });

        qr.download(downloadOptions);
      },
      generateQRCode: (url: string) => {
        qrCodeRef.current?.update({
          data: url,
        });
      },
    };
  }, [props]);

  useEffect(() => {
    qrCodeRef.current = new QRCodeStyling(options);

    const canvas = document.getElementById("canvas");
    if (canvas) {
      qrCodeRef.current?.append(canvas);
    }
  }, []);

  useEffect(() => {
    qrCodeRef.current?.update({
      backgroundOptions: {
        color: props.backgroundColor,
      },
      dotsOptions: {
        color: props.qrColor,
      },

      image: props.icon ? URL.createObjectURL(props.icon) : undefined,
    });
  }, [props]);

  return <div id="canvas"></div>;
};
