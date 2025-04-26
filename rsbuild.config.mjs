import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import { pluginTypeCheck } from "@rsbuild/plugin-type-check";
import { pluginSass } from "@rsbuild/plugin-sass";

export default defineConfig({
  plugins: [pluginReact(), pluginTypeCheck(), pluginSass()],
  html: {
    title: "QR Gen - генерация qr кодов",
    meta: {
      charset: {
        charset: "UTF-8",
      },
      description: "Сервис для генерации qr кодов",
    },
    template: "./public/index.html",
    appIcon: {
      name: "QR Gen",
      favicon: "./public/manifest/favicon.ico",
      icons: [
        {
          src: "./public/manifest/icon-192x192.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "./public/manifest/icon-512x512.png",
          sizes: "512x512",
          type: "image/png",
        },
      ],
    },
  },
  // performance: {
  //   removeConsole: true,
  // },
});
