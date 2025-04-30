/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: process.env.NODE_ENV === 'production' ? '/pokedex-v1' : '',
  
  // Configurações de erro
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // Configurações de imagens
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        pathname: '/PokeAPI/**', // Padrão para imagens da PokéAPI
      },
    ],
  },
  
  // Configurações de roteamento
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  
  // Otimizações de performance
  swcMinify: true,
  reactStrictMode: false, // Desativado para evitar conflitos com React 19
  
  // Tratamento especial para pacotes problemáticos
  transpilePackages: [
    'lucide-react',
    '@radix-ui/react-slot',
    'class-variance-authority',
    'date-fns',
    'react-day-picker'
  ],
  
  // Otimização para Radix UI
  modularizeImports: {
    '@radix-ui/react-?([a-zA-Z-]+)': {
      transform: '@radix-ui/react-{{ matches.[1] }}/{{member}}'
    },
    'lucide-react': {
      transform: 'lucide-react/dist/esm/icons/{{ kebabCase member }}',
      skipDefaultConversion: true
    }
  },
  
  // Configuração para export estático
  experimental: {
    optimizePackageImports: [
      '@radix-ui/react-*',
      'lucide-react'
    ]
  }
};

module.exports = nextConfig;