import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    output: "standalone",   // щоб Next зробив статичний білд у /out
    distDir: "out",     // куди класти згенеровані файли
    reactCompiler: true // якщо використовуєш React Compiler (можеш і вимкнути)
};

export default nextConfig;
