import { createTheme } from "@mui/material";

declare module '@mui/material/styles' {
	interface Palette {
		primaryBlack: Palette['primary'];
		menuBackground: Palette['primary'];
		primaryOrange: Palette['primary'];
		customBrown: Palette['primary'];
		customGrey: Palette['primary'];
		scrollNavColor: Palette['primary']
	}

	interface PaletteOptions {
		primaryBlack?: PaletteOptions['primary'];
		menuBackground?: PaletteOptions['primary'];
		primaryOrange?: PaletteOptions['primary'];
		customBrown?: PaletteOptions['primary'];
		customGrey?: PaletteOptions['primary'];
		scrollNavColor?: PaletteOptions['primary']
	}
}

declare module '@mui/material/styles' {
	interface PaletteColor {
		lightshade?: string;
		deeper?: string;
	}

	interface SimplePaletteColorOptions {
		lightshade?: string;
		deeper?: string;
	}
}

export const theme = createTheme({
	palette: {
		primaryBlack: {
			main: '#222222',
			lightshade:'#3D3D3D',
			deeper: '#6A6A6A'
		},
		menuBackground: {
			main: '#FFF3F2'
		},
		primaryOrange: {
			main: '#F74C25',
			lightshade: '#FFA689',
			deeper: '#D24120'
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