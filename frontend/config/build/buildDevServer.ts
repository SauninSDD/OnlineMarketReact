import type {Configuration as DevServerConfiguration} from "webpack-dev-server";
import {BuildOptions} from "./types/types";


export function buildDevServer(options: BuildOptions): DevServerConfiguration {
    return {
        port: options.port ?? 3000,
        open: true,
        historyApiFallback: true,
        hot: true,
        proxy: {
            '/api': {
                target: 'http://localhost:3000',
                router: () => 'http://localhost:8084',
                logLevel: 'debug' /*optional*/
            },
            '/dishes': {
                target: 'http://localhost:3000',
                router: () => 'http://localhost:8084',
                logLevel: 'debug' /*optional*/
            },
            '/cart': {
                target: 'http://localhost:3000',
                router: () => 'http://localhost:8084',
                logLevel: 'debug' /*optional*/
            },
            '/orders': {
                target: 'http://localhost:3000',
                router: () => 'http://localhost:8084',
                logLevel: 'debug' /*optional*/
            }
        }
    }
}