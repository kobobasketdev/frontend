export default function GrommetWishListSvg({ $isFilled } : { $isFilled?: boolean }) {
	return (
		<svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M1.83325 7C1.83325 3.33333 4.74992 2.5 6.41658 2.5C8.49992 2.5 10.1666 4.16667 10.9999 5.41667C11.8333 4.16667 13.4999 2.5 15.5833 2.5C17.2499 2.5 20.1666 3.33333 20.1666 7C20.1666 12.5 10.9999 17.5 10.9999 17.5C10.9999 17.5 1.83325 12.5 1.83325 7Z" fill={$isFilled ? 'url(#paint0_linear_716_7707)' : "white"} fillOpacity={$isFilled ? "1" : "0.5"} stroke={$isFilled ? "white":"#222222"} strokeWidth="2"/>
			<defs>
				<linearGradient id="paint0_linear_716_7707" x1="12.4783" y1="4.56522" x2="12.4783" y2="32.7391" gradientUnits="userSpaceOnUse">
					<stop stopColor="#F74C25"/>
					<stop offset="1" stopColor="#FFF700"/>
				</linearGradient>
			</defs>
		</svg>
	);
}
