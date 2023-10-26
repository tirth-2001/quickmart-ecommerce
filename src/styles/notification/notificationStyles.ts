import { MantineTheme } from '@mantine/core'

type NotificationVariant = 'success' | 'danger' | 'warning' | 'info'

export function getNotificationStyles(
  theme: MantineTheme,
  variant: NotificationVariant = 'info',
  options: {} = {},
): Record<string, any> {
  const getNotificationColor = () => {
    switch (variant) {
      case 'success':
        return theme.colors.teal
      case 'danger':
        return theme.colors.red
      case 'warning':
        return theme.colors.orange[7]
      case 'info':
        return theme.fn.primaryColor()
      default:
        return theme.fn.primaryColor()
    }
  }

  return {
    root: {
      backgroundColor: getNotificationColor(),
      '&::before': { backgroundColor: theme.white },
    },

    title: { color: theme.white },
    description: { color: theme.white },
    closeButton: {
      color: theme.white,
      transition: 'all 100ms ease',
      '&:hover': { backgroundColor: theme.colors.gray[0], color: theme.black },
    },
  }
}
