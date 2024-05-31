import { useState, useEffect } from 'react'

export const useMediaQuery = query => {
	const [matches, setMatches] = useState(false)

	useEffect(() => {
		const media = window.matchMedia(query)
		if (media.matches !== matches) {
			setMatches(media.matches)
		}
		const listener = () => setMatches(media.matches)
		window.addEventListener('resize', listener)
		return () => window.removeEventListener('resize', listener)
	}, [matches, query])

	return matches
}

export const mediaQueryPoint = {
	xs: 399.98,
	sm: 575.98,
	md: 767.98,
	lg: 991.98,
	xl: 1199.98,
	xxl: 1349.98,
	xxxl: 1499.98,
	miniPc: 1560,
	withTable: 800,
}
