import { createTheme } from "@mui/material";

declare module '@mui/material/styles' {
	interface Palette {
		primaryBlack: Palette['primary'];
		menuBackground: Palette['primary'];
		primaryOrange: Palette['primary'];
		customBrown: Palette['primary'];
		customGrey: Palette['primary'];
		scrollNavColor: Palette['primary'],
		primaryGreen: Palette['primary'],
		primaryYellow: Palette['primary']
	}

	interface PaletteOptions {
		primaryBlack?: PaletteOptions['primary'];
		menuBackground?: PaletteOptions['primary'];
		primaryOrange?: PaletteOptions['primary'];
		customBrown?: PaletteOptions['primary'];
		customGrey?: PaletteOptions['primary'];
		scrollNavColor?: PaletteOptions['primary'],
		primaryGreen?: PaletteOptions['primary'],
		primaryYellow?: PaletteOptions['primary']
	}
}

declare module '@mui/material/styles' {
	interface PaletteColor {
		lightshade?: string;
		deeper?: string;
		moreDeeper?: string;
		disabled?: string
	}

	interface SimplePaletteColorOptions {
		lightshade?: string;
		deeper?: string;
		moreDeeper?: string;
		disabled?: string;
	}
}

// linear-gradient(180deg, #F74C25 8.7%, #FFF700 165.22%)
export const theme = createTheme({
	palette: {
		primaryGreen: {
			main: '#003D28',
			lightshade: '#F6FFEF',
			light: '#E7FFD6',
			disabled: 'rgba(91, 85, 0, 0.24)'
		},
		primaryYellow: {
			main: '#F4E832'
		},
		primaryBlack: {
			main: '#222222',
			lightshade:'#3D3D3D',
			deeper: '#6A6A6A',
			disabled: '#8A8A8A',
			moreDeeper: '#090909'
		},
		menuBackground: {
			main: '#FFF3F2'
		},
		primaryOrange: {
			main: '#F74C25',
			lightshade: '#FFA689',
			deeper: '#D24120',
			light: '#FF5D00'
		},
		customBrown: {
			main: '#5D4037',
			lightshade: '#BCAAA4',
			deeper: '#4E342E'
		},
		customGrey: {
			main: '#EFEBE9',
			lightshade: '#D0D0D0',
			deeper: '#848484',
		},
		scrollNavColor: {
			main: '#ffffff',
			lightshade: '#ffffff8a'
		}
	}
});