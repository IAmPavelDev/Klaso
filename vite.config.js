import { unstable_vitePlugin as vitePlugin } from "@remix-run/dev";
import { defineConfig } from "vite";
import { installGlobals } from "@remix-run/node";
import tsconfigPaths from "vite-tsconfig-paths";
import babel from "vite-plugin-babel";

installGlobals();

const ReactCompilerConfig = {
  /* ... */
};

export default defineConfig({
  plugins: [
    vitePlugin({
      ignoredRouteFiles: ["**/*.css"],
    }),
    tsconfigPaths(),
    babel({
      filter: /\.[jt]sx?$/,
      babelConfig: {
        presets: ["@babel/preset-typescript"], // if you use TypeScript
        plugins: [["babel-plugin-react-compiler", ReactCompilerConfig]],
      },
    }),
  ],
  server: {
    port: 3000,
  },
  optimizeDeps: {
    exclude: ["@mapbox"],
  },
});
