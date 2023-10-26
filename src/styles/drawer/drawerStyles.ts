type DrawerSize = 'small' | 'medium' | 'large' | 'xlarge' | string

export function getDrawerStyles(
	type: DrawerSize,
	position: any = 'right',
	options: { blurBackground: boolean } = {
		blurBackground: true,
	}
) {
	const sizes: Record<DrawerSize, string> = {
		small: 'md',
		medium: 'lg',
		large: 'xl',
		xlarge: '70%',
	}
	return {
		size: sizes[type] || type,
		position,
		overlayProps: options.blurBackground
			? { backgroundOpacity: 0.6, blur: 0 }
			: undefined,
	}
}
