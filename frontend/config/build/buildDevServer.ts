import type {Configuration as DevServerConfiguration} from "webpack-dev-server";
import {BuildOptions} from "./types/types";

export function buildDevServer(options: BuildOptions): DevServerConfiguration {
    return {
        port: options.port ?? 3000,
        https: true,
        open: true,
        historyApiFallback: true,
        hot: true,
        proxy: {
            '/Broomstick': {
                target: 'http://localhost:3000',
                router: () => 'http://localhost:8085',
                logLevel: 'debug' /*optional*/
            },
        }
    }
}