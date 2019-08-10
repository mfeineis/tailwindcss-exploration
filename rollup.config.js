import nodeResolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import postcss from "rollup-plugin-postcss";

const isProduction = process.env.NODE_ENV === "production";

export default (async () => ({
    input: "src/main.js",
    output: {
        file: "dist/app.js",
        format: "iife",
        name: "App",
    },
    plugins: [
        nodeResolve(),
        commonjs(),
        postcss({
            config: {
                path: "./postcss.config.js",
            },
            extensions: [".css"],
            extract: true,
            minimize: isProduction,
            // modules: true,
        }),
        isProduction && (await import("rollup-plugin-terser")).terser(),
    ]
}))();

