
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				cyberpunk: {
					black: '#0f1923',
					blue: '#0e4fff',
					cyan: '#00ffc8',
					purple: '#7928CA',
					pink: '#FF0080',
					yellow: '#ffd900',
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'pulse-glow': {
					'0%, 100%': { 
						boxShadow: '0 0 5px 0px rgba(0, 255, 200, 0.7), 0 0 10px 3px rgba(0, 255, 200, 0.5)'
					},
					'50%': { 
						boxShadow: '0 0 10px 2px rgba(0, 255, 200, 0.9), 0 0 15px 5px rgba(0, 255, 200, 0.7)'
					}
				},
				'text-glow': {
					'0%, 100%': { 
						textShadow: '0 0 5px rgba(0, 255, 200, 0.7), 0 0 10px rgba(0, 255, 200, 0.5)'
					},
					'50%': { 
						textShadow: '0 0 10px rgba(0, 255, 200, 0.9), 0 0 15px rgba(0, 255, 200, 0.7)'
					}
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' }
				},
				'scanning': {
					'0%': { backgroundPosition: '0% 0%' },
					'100%': { backgroundPosition: '100% 100%' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'pulse-glow': 'pulse-glow 2s infinite',
				'text-glow': 'text-glow 2s infinite',
				'float': 'float 6s ease-in-out infinite',
				'scanning': 'scanning 3s linear infinite'
			},
			backgroundImage: {
				'cyberpunk-grid': "linear-gradient(rgba(14, 79, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(14, 79, 255, 0.1) 1px, transparent 1px)",
				'neon-glow': "linear-gradient(90deg, rgba(0, 255, 200, 0) 0%, rgba(0, 255, 200, 0.3) 50%, rgba(0, 255, 200, 0) 100%)",
				'scanning-line': "linear-gradient(to bottom, transparent, rgba(0, 255, 200, 0.2), transparent)"
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
