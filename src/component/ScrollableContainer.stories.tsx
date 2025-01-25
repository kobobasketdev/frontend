import { Meta, StoryObj } from "@storybook/react";
import ScrollableContainer, { IScrollableContainer } from "./ScrollableContainer";
import { DEFAULT_VIEWPORT } from "@storybook/addon-viewport";
import { Avatar, Stack } from "@mui/material";

const meta: Meta<typeof ScrollableContainer>= {
	component: ScrollableContainer,
	parameters: {
		viewport: {
			defaultViewport: DEFAULT_VIEWPORT
		}
	},
	decorators: (Story) => (<Stack width={1} height={'300px'} border={'1px solid black'}><Story/></Stack>),
	args: {
		showNavigation: true,
		children: <>
			1.hello there<br/><hr/>
			hello there<br/><hr/>
			hello there<br/><hr/>
			hello there<br/><hr/>
			hello there<br/><hr/>
			4. hello there<br/><hr/>
			hello there<br/><hr/>
			hello there<br/><hr/>
			hello there<br/><hr/>
			hello there<br/><hr/>
			hello there<br/><hr/>
			6. hello there<br/><hr/>
			hello there<br/><hr/>
			hello there<br/><hr/>
			hello there<br/><hr/>
			hello there<br/><hr/>
			hello there<br/><hr/>
			hello there<br/><hr/>
			hello there<br/><hr/>
			hello there<br/><hr/>
			hello there<br/><hr/>
			hello there<br/><hr/>
			hello there<br/><hr/>
			hello there<br/><hr/>
			hello there<br/><hr/>
			hello there<br/><hr/>
			hello there<br/><hr/>
			hello there<br/><hr/>
			hello there<br/><hr/>
			hello there<br/><hr/>
			hello there<br/><hr/>
			hello there<br/><hr/>
			hello there<br/><hr/>
			hello there<br/><hr/>
			hello there<br/><hr/>
			hello there<br/><hr/>
			hello there<br/><hr/>
			hello there<br/><hr/>
			hello there<br/><hr/>
			hello there<br/><hr/>
			hello there<br/><hr/>
			hello there<br/><hr/>
			hello there<br/><hr/>
			hello there<br/><hr/>
			hello there<br/><hr/>
			hello there<br/><hr/>
			hello there<br/><hr/>
			hello there<br/><hr/>
			End. hello there<br/><hr/>
            
		</>
	}
};

export default meta;
type Story = StoryObj<typeof ScrollableContainer>;

export const DESKTOP_VERTICAL_NO_NAVIGATION: Story = {
	args: { showNavigation: false }
};

export const DESKTOP_VERTICAL_INLINE_NAVIGATION: Story = {
	args: { showNavigation: true }
};

export const DESKTOP_VERTICAL_FLOAT_NAVIGATION: Story = {
	args: { showNavigation: false, float: true }
};

export const TABLET_NO_NAVIGATION: Story = {
	parameters: {
		viewport:{
			defaultViewport: 'tablet'
		}
	},
	args: { showNavigation: false }
};

export const TABLET_INLINE_NAVIGATION: Story = {
	parameters: {
		viewport:{
			defaultViewport: 'tablet'
		}
	},
	args: { showNavigation: true }
};

export const TABLET_FLOAT_NAVIGATION: Story = {
	parameters: {
		viewport:{
			defaultViewport: 'tablet'
		}
	},
	args: { showNavigation: false, float: true }
};

export const LARGEMOBILE_NO_NAVIGATION: Story = {
	parameters: {
		viewport:{
			defaultViewport: 'mobile2'
		}
	},
	args: { showNavigation: false }
};

export const LARGEMOBILE_INLINE_NAVIGATION: Story = {
	parameters: {
		viewport:{
			defaultViewport: 'mobile2'
		}
	},
	args: { showNavigation: true }
};

export const LARGEMOBILE_FLOAT_NAVIGATION: Story = {
	parameters: {
		viewport:{
			defaultViewport: 'mobile2'
		}
	},
	args: { showNavigation: false, float: true }
};


export const SMALLMOBILE_NO_NAVIGATION: Story = {
	parameters: {
		viewport:{
			defaultViewport: 'mobile1'
		}
	},
	args: { showNavigation: false }
};

export const SMALLMOBILE_INLINE_NAVIGATION: Story = {
	parameters: {
		viewport:{
			defaultViewport: 'mobile1'
		}
	},
	args: { showNavigation: true }
};

export const SMALLMOBILE_FLOAT_NAVIGATION: Story = {
	parameters: {
		viewport:{
			defaultViewport: 'mobile1'
		}
	},
	args: { showNavigation: false, float: true }
};

const items = [
	<div style={{ display: 'inline-flex', backgroundColor: 'pink', border: '1px solid blue' }} key={1}>
		<button>1</button> <button>2</button> <button>3</button> 
		<button>6</button> <button>7</button>
		<button>1</button> <button>2</button> <button>3</button> <button>4</button> <button>5</button> <button>6</button> <button>7</button>
	</div>,
	<div style={{ display: 'inline-flex', backgroundColor: 'black', border: '1px solid orange' }} key={2} >
		<button>1</button> <button>2</button> <button>3</button> 
		<button>6</button> 
		<button>7</button>
		<button>1</button> <button>2</button> <button>3</button> <button>4</button> <button>5</button> <button>6</button> <button>7</button>
	</div>,
	<div style={{ display: 'inline-flex', backgroundColor: 'black', border: '1px solid orange' }} key={3} >
		<button>1</button> <button>2</button> <button>3</button> 
		<button>6</button> 
		<button>7</button>
		<button>1</button> <button>2</button> <button>3</button> <button>4</button> <button>5</button> <button>6</button> <button>7</button>
	</div>,
	<div style={{ display: 'inline-flex', backgroundColor: 'black', border: '1px solid orange' }} key={4} >
		<button>1</button> <button>2</button> <button>3</button> 
		<button>6</button> 
		<button>7</button>
		<button>1</button> <button>2</button> <button>3</button> <button>4</button> <button>5</button> <button>6</button> <button>7</button>
	</div>,
	<div style={{ display: 'inline-flex', backgroundColor: 'black', border: '1px solid pink' }} key={5} >
		<button>1</button> <button>2</button> <button>3</button> 
		<button>6</button> 
		<button>7</button>
		<button>1</button> <button>2</button> <button>3</button> <button>4</button> <button>5</button> <button>6</button> <button>7</button>
	</div>
	
]; 
// const picItems = [ 
// 	{ key: 1, src: '', alt: 'Picture 1', variant: 'rounded' }, 
// 	{ key: 2, src: '', alt: 'Picture 2', variant: 'rounded' }
// ];
const HORIZONTAL: IScrollableContainer = {
	// children: picItems.map(item => (<div key={item.key} style={{ backgroundColor: 'pink' }}>
	// 	<Avatar  src={item.src} alt={item.alt} variant={'rounded'} />
	// </div>)),
	children: items,
	orientation: 'horizontal',
	showNavigation: false
};

export const DESKTOP_HORIZONTAL_NO_NAVIGATION: Story = {
	args: { ...HORIZONTAL, showNavigation: false }
};

export const DESKTOP_HORIZONTAL_INLINE_NAVIGATION: Story = {
	args: { ...HORIZONTAL, showNavigation: true }
};

export const DESKTOP_HORIZONTAL_FLOAT_NAVIGATION: Story = {
	args: { ...HORIZONTAL, showNavigation: false, float: true }
};

export const TABLET_HORIZONTAL_NO_NAVIGATION: Story = {
	parameters: {
		viewport:{
			defaultViewport: 'tablet'
		}
	},
	args: { ...HORIZONTAL, showNavigation: false }
};

export const TABLET_HORIZONTAL_INLINE_NAVIGATION: Story = {
	parameters: {
		viewport:{
			defaultViewport: 'tablet'
		}
	},
	args: { ...HORIZONTAL, showNavigation: true }
};

export const TABLET_HORIZONTAL_FLOAT_NAVIGATION: Story = {
	parameters: {
		viewport:{
			defaultViewport: 'tablet'
		}
	},
	args: { ...HORIZONTAL, showNavigation: false, float: true }
};

export const LARGEMOBILE_HORIZONTAL_NO_NAVIGATION: Story = {
	parameters: {
		viewport:{
			defaultViewport: 'mobile2'
		}
	},
	args: { ...HORIZONTAL, showNavigation: false }
};

export const LARGEMOBILE_HORIZONTAL_INLINE_NAVIGATION: Story = {
	parameters: {
		viewport:{
			defaultViewport: 'mobile2'
		}
	},
	args: { ...HORIZONTAL, showNavigation: true }
};

export const LARGEMOBILE_HORIZONTAL_FLOAT_NAVIGATION: Story = {
	parameters: {
		viewport:{
			defaultViewport: 'mobile2'
		}
	},
	args: { ...HORIZONTAL, showNavigation: false, float: true }
};

export const SMALLMOBILE_HORIZONTAL_NO_NAVIGATION: Story = {
	parameters: {
		viewport:{
			defaultViewport: 'mobile1'
		}
	},
	args: { ...HORIZONTAL, showNavigation: false }
};

export const SMALLMOBILE_HORIZONTAL_INLINE_NAVIGATION: Story = {
	parameters: {
		viewport:{
			defaultViewport: 'mobile1'
		}
	},
	args: { ...HORIZONTAL, showNavigation: true }
};

export const SMALLMOBILE_HORIZONTAL_FLOAT_NAVIGATION: Story = {
	parameters: {
		viewport:{
			defaultViewport: 'mobile1'
		}
	},
	args: { ...HORIZONTAL, showNavigation: false, float: true }
};