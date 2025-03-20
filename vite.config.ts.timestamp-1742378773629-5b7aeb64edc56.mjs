// vite.config.ts
import { fileURLToPath, URL } from "node:url";
import { defineConfig, loadEnv } from "file:///D:/ht-work/xc/we-services-h5-ui/node_modules/.pnpm/vite@5.4.10_@types+node@22.8.7_less@4.2.0_terser@5.36.0/node_modules/vite/dist/node/index.js";
import vue from "file:///D:/ht-work/xc/we-services-h5-ui/node_modules/.pnpm/@vitejs+plugin-vue@5.1.4_vi_e29f75774ce123cfd4e990f01aa88497/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import vueJsx from "file:///D:/ht-work/xc/we-services-h5-ui/node_modules/.pnpm/@vitejs+plugin-vue-jsx@4.0._a16cd9993d2f072cd66e92715e67de7a/node_modules/@vitejs/plugin-vue-jsx/dist/index.mjs";
import Components from "file:///D:/ht-work/xc/we-services-h5-ui/node_modules/.pnpm/unplugin-vue-components@0.2_001adeedc03a8b5b5f5332feb66520ba/node_modules/unplugin-vue-components/dist/vite.js";
import { VantResolver } from "file:///D:/ht-work/xc/we-services-h5-ui/node_modules/.pnpm/unplugin-vue-components@0.2_001adeedc03a8b5b5f5332feb66520ba/node_modules/unplugin-vue-components/dist/resolvers.js";
import { createSvgIconsPlugin } from "file:///D:/ht-work/xc/we-services-h5-ui/node_modules/.pnpm/vite-plugin-svg-icons@2.0.1_b30b448fc4c721f8d81049756f3bb0ba/node_modules/vite-plugin-svg-icons/dist/index.mjs";
import path from "path";
import mockDevServerPlugin from "file:///D:/ht-work/xc/we-services-h5-ui/node_modules/.pnpm/vite-plugin-mock-dev-server_87bf831a0af4f43f6c33ab396deeb9a3/node_modules/vite-plugin-mock-dev-server/dist/index.js";
import viteCompression from "file:///D:/ht-work/xc/we-services-h5-ui/node_modules/.pnpm/vite-plugin-compression@0.5_d9da1c743ad82a0305f2af428d9737a6/node_modules/vite-plugin-compression/dist/index.mjs";
import { createHtmlPlugin } from "file:///D:/ht-work/xc/we-services-h5-ui/node_modules/.pnpm/vite-plugin-html@3.2.2_vite_8b38a582aec70142b8b5cb4c570632df/node_modules/vite-plugin-html/dist/index.mjs";

// build/cdn.ts
import { cdn } from "file:///D:/ht-work/xc/we-services-h5-ui/node_modules/.pnpm/vite-plugin-cdn2@1.1.0_rollup@4.24.3/node_modules/vite-plugin-cdn2/dist/index.mjs";
import { unpkg } from "file:///D:/ht-work/xc/we-services-h5-ui/node_modules/.pnpm/vite-plugin-cdn2@1.1.0_rollup@4.24.3/node_modules/vite-plugin-cdn2/dist/resolver/unpkg.mjs";
function enableCDN(isEnabled) {
  if (isEnabled === "true") {
    return cdn({
      resolve: unpkg(),
      modules: ["vue", "vue-demi", "pinia", "axios", "vant", "vue-router"]
    });
  }
}

// vite.config.ts
var __vite_injected_original_import_meta_url = "file:///D:/ht-work/xc/we-services-h5-ui/vite.config.ts";
var root = process.cwd();
var outerUrl = "https://welcom.wegroupltd.net/";
var vite_config_default = defineConfig(({ mode }) => {
  const env = loadEnv(mode, root, "");
  return {
    base: env.VITE_PUBLIC_PATH || "/",
    plugins: [
      vue(),
      vueJsx(),
      mockDevServerPlugin(),
      // vant 组件自动按需引入
      Components({
        dts: "src/typings/components.d.ts",
        resolvers: [VantResolver()]
      }),
      // svg icon
      createSvgIconsPlugin({
        // 指定图标文件夹
        iconDirs: [path.resolve(root, "src/icons/svg")],
        // 指定 symbolId 格式
        symbolId: "icon-[dir]-[name]"
      }),
      // 生产环境 gzip 压缩资源
      viteCompression(),
      // 注入模板数据
      createHtmlPlugin({
        inject: {
          data: {
            ENABLE_ERUDA: env.VITE_ENABLE_ERUDA || "false"
          }
        }
      }),
      // 生产环境默认不启用 CDN 加速
      enableCDN(env.VITE_CDN_DEPS)
    ],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url))
      }
    },
    server: {
      host: true,
      // 仅在 proxy 中配置的代理前缀， mock-dev-server 才会拦截并 mock
      // doc: https://github.com/pengzhanbo/vite-plugin-mock-dev-server
      proxy: {
        // "^/dev-api": {
        //   target: outerUrl
        // }
        "/admin/api": {
          target: outerUrl,
          pathRewrite: { "^/admin/api": "/api" }
          // 日志级别
        },
        "/admin": {
          changeOrigin: true,
          target: outerUrl
        }
      }
    },
    build: {
      rollupOptions: {
        output: {
          chunkFileNames: "static/js/[name]-[hash].js",
          entryFileNames: "static/js/[name]-[hash].js",
          assetFileNames: "static/[ext]/[name]-[hash].[ext]"
        }
      }
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAiYnVpbGQvY2RuLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRDpcXFxcaHQtd29ya1xcXFx4Y1xcXFx3ZS1zZXJ2aWNlcy1oNS11aVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcaHQtd29ya1xcXFx4Y1xcXFx3ZS1zZXJ2aWNlcy1oNS11aVxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovaHQtd29yay94Yy93ZS1zZXJ2aWNlcy1oNS11aS92aXRlLmNvbmZpZy50c1wiO2ltcG9ydCB7IGZpbGVVUkxUb1BhdGgsIFVSTCB9IGZyb20gXCJub2RlOnVybFwiO1xyXG5pbXBvcnQgeyBidWlsZCwgZGVmaW5lQ29uZmlnLCBsb2FkRW52IH0gZnJvbSBcInZpdGVcIjtcclxuaW1wb3J0IHZ1ZSBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tdnVlXCI7XHJcbmltcG9ydCB2dWVKc3ggZnJvbSBcIkB2aXRlanMvcGx1Z2luLXZ1ZS1qc3hcIjtcclxuaW1wb3J0IENvbXBvbmVudHMgZnJvbSBcInVucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3ZpdGVcIjtcclxuaW1wb3J0IHsgVmFudFJlc29sdmVyIH0gZnJvbSBcInVucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3Jlc29sdmVyc1wiO1xyXG5pbXBvcnQgeyBjcmVhdGVTdmdJY29uc1BsdWdpbiB9IGZyb20gXCJ2aXRlLXBsdWdpbi1zdmctaWNvbnNcIjtcclxuaW1wb3J0IHBhdGggZnJvbSBcInBhdGhcIjtcclxuaW1wb3J0IG1vY2tEZXZTZXJ2ZXJQbHVnaW4gZnJvbSBcInZpdGUtcGx1Z2luLW1vY2stZGV2LXNlcnZlclwiO1xyXG5pbXBvcnQgdml0ZUNvbXByZXNzaW9uIGZyb20gXCJ2aXRlLXBsdWdpbi1jb21wcmVzc2lvblwiO1xyXG5pbXBvcnQgeyBjcmVhdGVIdG1sUGx1Z2luIH0gZnJvbSBcInZpdGUtcGx1Z2luLWh0bWxcIjtcclxuaW1wb3J0IHsgZW5hYmxlQ0ROIH0gZnJvbSBcIi4vYnVpbGQvY2RuXCI7XHJcblxyXG4vLyBcdTVGNTNcdTUyNERcdTVERTVcdTRGNUNcdTc2RUVcdTVGNTVcdThERUZcdTVGODRcclxuY29uc3Qgcm9vdDogc3RyaW5nID0gcHJvY2Vzcy5jd2QoKTtcclxuXHJcbi8vIGNvbnN0IG91dGVyVXJsID0gXCJodHRwOi8vMTkyLjE2OC4xLjI6OTAwMVwiO1xyXG4vLyBjb25zdCBvdXRlclVybCA9IFwiaHR0cDovLzQ3LjExNi4xNzAuMVwiO1xyXG5jb25zdCBvdXRlclVybCA9IFwiaHR0cHM6Ly93ZWxjb20ud2Vncm91cGx0ZC5uZXQvXCI7XHJcblxyXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoKHsgbW9kZSB9KSA9PiB7XHJcbiAgLy8gXHU3M0FGXHU1ODgzXHU1M0Q4XHU5MUNGXHJcbiAgY29uc3QgZW52ID0gbG9hZEVudihtb2RlLCByb290LCBcIlwiKTtcclxuICByZXR1cm4ge1xyXG4gICAgYmFzZTogZW52LlZJVEVfUFVCTElDX1BBVEggfHwgXCIvXCIsXHJcbiAgICBwbHVnaW5zOiBbXHJcbiAgICAgIHZ1ZSgpLFxyXG4gICAgICB2dWVKc3goKSxcclxuICAgICAgbW9ja0RldlNlcnZlclBsdWdpbigpLFxyXG4gICAgICAvLyB2YW50IFx1N0VDNFx1NEVGNlx1ODFFQVx1NTJBOFx1NjMwOVx1OTcwMFx1NUYxNVx1NTE2NVxyXG4gICAgICBDb21wb25lbnRzKHtcclxuICAgICAgICBkdHM6IFwic3JjL3R5cGluZ3MvY29tcG9uZW50cy5kLnRzXCIsXHJcbiAgICAgICAgcmVzb2x2ZXJzOiBbVmFudFJlc29sdmVyKCldXHJcbiAgICAgIH0pLFxyXG4gICAgICAvLyBzdmcgaWNvblxyXG4gICAgICBjcmVhdGVTdmdJY29uc1BsdWdpbih7XHJcbiAgICAgICAgLy8gXHU2MzA3XHU1QjlBXHU1NkZFXHU2ODA3XHU2NTg3XHU0RUY2XHU1OTM5XHJcbiAgICAgICAgaWNvbkRpcnM6IFtwYXRoLnJlc29sdmUocm9vdCwgXCJzcmMvaWNvbnMvc3ZnXCIpXSxcclxuICAgICAgICAvLyBcdTYzMDdcdTVCOUEgc3ltYm9sSWQgXHU2ODNDXHU1RjBGXHJcbiAgICAgICAgc3ltYm9sSWQ6IFwiaWNvbi1bZGlyXS1bbmFtZV1cIlxyXG4gICAgICB9KSxcclxuICAgICAgLy8gXHU3NTFGXHU0RUE3XHU3M0FGXHU1ODgzIGd6aXAgXHU1MzhCXHU3RjI5XHU4RDQ0XHU2RTkwXHJcbiAgICAgIHZpdGVDb21wcmVzc2lvbigpLFxyXG4gICAgICAvLyBcdTZDRThcdTUxNjVcdTZBMjFcdTY3N0ZcdTY1NzBcdTYzNkVcclxuICAgICAgY3JlYXRlSHRtbFBsdWdpbih7XHJcbiAgICAgICAgaW5qZWN0OiB7XHJcbiAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgIEVOQUJMRV9FUlVEQTogZW52LlZJVEVfRU5BQkxFX0VSVURBIHx8IFwiZmFsc2VcIlxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSksXHJcbiAgICAgIC8vIFx1NzUxRlx1NEVBN1x1NzNBRlx1NTg4M1x1OUVEOFx1OEJBNFx1NEUwRFx1NTQyRlx1NzUyOCBDRE4gXHU1MkEwXHU5MDFGXHJcbiAgICAgIGVuYWJsZUNETihlbnYuVklURV9DRE5fREVQUylcclxuICAgIF0sXHJcbiAgICByZXNvbHZlOiB7XHJcbiAgICAgIGFsaWFzOiB7XHJcbiAgICAgICAgXCJAXCI6IGZpbGVVUkxUb1BhdGgobmV3IFVSTChcIi4vc3JjXCIsIGltcG9ydC5tZXRhLnVybCkpXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBzZXJ2ZXI6IHtcclxuICAgICAgaG9zdDogdHJ1ZSxcclxuICAgICAgLy8gXHU0RUM1XHU1NzI4IHByb3h5IFx1NEUyRFx1OTE0RFx1N0Y2RVx1NzY4NFx1NEVFM1x1NzQwNlx1NTI0RFx1N0YwMFx1RkYwQyBtb2NrLWRldi1zZXJ2ZXIgXHU2MjREXHU0RjFBXHU2MkU2XHU2MjJBXHU1RTc2IG1vY2tcclxuICAgICAgLy8gZG9jOiBodHRwczovL2dpdGh1Yi5jb20vcGVuZ3poYW5iby92aXRlLXBsdWdpbi1tb2NrLWRldi1zZXJ2ZXJcclxuICAgICAgcHJveHk6IHtcclxuICAgICAgICAvLyBcIl4vZGV2LWFwaVwiOiB7XHJcbiAgICAgICAgLy8gICB0YXJnZXQ6IG91dGVyVXJsXHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIFwiL2FkbWluL2FwaVwiOiB7XHJcbiAgICAgICAgICB0YXJnZXQ6IG91dGVyVXJsLFxyXG4gICAgICAgICAgcGF0aFJld3JpdGU6IHsgXCJeL2FkbWluL2FwaVwiOiBcIi9hcGlcIiB9XHJcbiAgICAgICAgICAvLyBcdTY1RTVcdTVGRDdcdTdFQTdcdTUyMkJcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwiL2FkbWluXCI6IHtcclxuICAgICAgICAgIGNoYW5nZU9yaWdpbjogdHJ1ZSxcclxuICAgICAgICAgIHRhcmdldDogb3V0ZXJVcmxcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBidWlsZDoge1xyXG4gICAgICByb2xsdXBPcHRpb25zOiB7XHJcbiAgICAgICAgb3V0cHV0OiB7XHJcbiAgICAgICAgICBjaHVua0ZpbGVOYW1lczogXCJzdGF0aWMvanMvW25hbWVdLVtoYXNoXS5qc1wiLFxyXG4gICAgICAgICAgZW50cnlGaWxlTmFtZXM6IFwic3RhdGljL2pzL1tuYW1lXS1baGFzaF0uanNcIixcclxuICAgICAgICAgIGFzc2V0RmlsZU5hbWVzOiBcInN0YXRpYy9bZXh0XS9bbmFtZV0tW2hhc2hdLltleHRdXCJcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9O1xyXG59KTtcclxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxodC13b3JrXFxcXHhjXFxcXHdlLXNlcnZpY2VzLWg1LXVpXFxcXGJ1aWxkXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxodC13b3JrXFxcXHhjXFxcXHdlLXNlcnZpY2VzLWg1LXVpXFxcXGJ1aWxkXFxcXGNkbi50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovaHQtd29yay94Yy93ZS1zZXJ2aWNlcy1oNS11aS9idWlsZC9jZG4udHNcIjtpbXBvcnQgeyBjZG4gfSBmcm9tIFwidml0ZS1wbHVnaW4tY2RuMlwiO1xyXG5pbXBvcnQgeyB1bnBrZyB9IGZyb20gXCJ2aXRlLXBsdWdpbi1jZG4yL3Jlc29sdmVyL3VucGtnXCI7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZW5hYmxlQ0ROKGlzRW5hYmxlZDogc3RyaW5nKSB7XHJcbiAgaWYgKGlzRW5hYmxlZCA9PT0gXCJ0cnVlXCIpIHtcclxuICAgIHJldHVybiBjZG4oe1xyXG4gICAgICByZXNvbHZlOiB1bnBrZygpLFxyXG4gICAgICBtb2R1bGVzOiBbXCJ2dWVcIiwgXCJ2dWUtZGVtaVwiLCBcInBpbmlhXCIsIFwiYXhpb3NcIiwgXCJ2YW50XCIsIFwidnVlLXJvdXRlclwiXVxyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBdVIsU0FBUyxlQUFlLFdBQVc7QUFDMVQsU0FBZ0IsY0FBYyxlQUFlO0FBQzdDLE9BQU8sU0FBUztBQUNoQixPQUFPLFlBQVk7QUFDbkIsT0FBTyxnQkFBZ0I7QUFDdkIsU0FBUyxvQkFBb0I7QUFDN0IsU0FBUyw0QkFBNEI7QUFDckMsT0FBTyxVQUFVO0FBQ2pCLE9BQU8seUJBQXlCO0FBQ2hDLE9BQU8scUJBQXFCO0FBQzVCLFNBQVMsd0JBQXdCOzs7QUNWMFAsU0FBUyxXQUFXO0FBQy9TLFNBQVMsYUFBYTtBQUVmLFNBQVMsVUFBVSxXQUFtQjtBQUMzQyxNQUFJLGNBQWMsUUFBUTtBQUN4QixXQUFPLElBQUk7QUFBQSxNQUNULFNBQVMsTUFBTTtBQUFBLE1BQ2YsU0FBUyxDQUFDLE9BQU8sWUFBWSxTQUFTLFNBQVMsUUFBUSxZQUFZO0FBQUEsSUFDckUsQ0FBQztBQUFBLEVBQ0g7QUFDRjs7O0FEVjZLLElBQU0sMkNBQTJDO0FBYzlOLElBQU0sT0FBZSxRQUFRLElBQUk7QUFJakMsSUFBTSxXQUFXO0FBR2pCLElBQU8sc0JBQVEsYUFBYSxDQUFDLEVBQUUsS0FBSyxNQUFNO0FBRXhDLFFBQU0sTUFBTSxRQUFRLE1BQU0sTUFBTSxFQUFFO0FBQ2xDLFNBQU87QUFBQSxJQUNMLE1BQU0sSUFBSSxvQkFBb0I7QUFBQSxJQUM5QixTQUFTO0FBQUEsTUFDUCxJQUFJO0FBQUEsTUFDSixPQUFPO0FBQUEsTUFDUCxvQkFBb0I7QUFBQTtBQUFBLE1BRXBCLFdBQVc7QUFBQSxRQUNULEtBQUs7QUFBQSxRQUNMLFdBQVcsQ0FBQyxhQUFhLENBQUM7QUFBQSxNQUM1QixDQUFDO0FBQUE7QUFBQSxNQUVELHFCQUFxQjtBQUFBO0FBQUEsUUFFbkIsVUFBVSxDQUFDLEtBQUssUUFBUSxNQUFNLGVBQWUsQ0FBQztBQUFBO0FBQUEsUUFFOUMsVUFBVTtBQUFBLE1BQ1osQ0FBQztBQUFBO0FBQUEsTUFFRCxnQkFBZ0I7QUFBQTtBQUFBLE1BRWhCLGlCQUFpQjtBQUFBLFFBQ2YsUUFBUTtBQUFBLFVBQ04sTUFBTTtBQUFBLFlBQ0osY0FBYyxJQUFJLHFCQUFxQjtBQUFBLFVBQ3pDO0FBQUEsUUFDRjtBQUFBLE1BQ0YsQ0FBQztBQUFBO0FBQUEsTUFFRCxVQUFVLElBQUksYUFBYTtBQUFBLElBQzdCO0FBQUEsSUFDQSxTQUFTO0FBQUEsTUFDUCxPQUFPO0FBQUEsUUFDTCxLQUFLLGNBQWMsSUFBSSxJQUFJLFNBQVMsd0NBQWUsQ0FBQztBQUFBLE1BQ3REO0FBQUEsSUFDRjtBQUFBLElBQ0EsUUFBUTtBQUFBLE1BQ04sTUFBTTtBQUFBO0FBQUE7QUFBQSxNQUdOLE9BQU87QUFBQTtBQUFBO0FBQUE7QUFBQSxRQUlMLGNBQWM7QUFBQSxVQUNaLFFBQVE7QUFBQSxVQUNSLGFBQWEsRUFBRSxlQUFlLE9BQU87QUFBQTtBQUFBLFFBRXZDO0FBQUEsUUFDQSxVQUFVO0FBQUEsVUFDUixjQUFjO0FBQUEsVUFDZCxRQUFRO0FBQUEsUUFDVjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsSUFDQSxPQUFPO0FBQUEsTUFDTCxlQUFlO0FBQUEsUUFDYixRQUFRO0FBQUEsVUFDTixnQkFBZ0I7QUFBQSxVQUNoQixnQkFBZ0I7QUFBQSxVQUNoQixnQkFBZ0I7QUFBQSxRQUNsQjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
