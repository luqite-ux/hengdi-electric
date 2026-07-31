export type MobileMenuState = { pathname: string; open: boolean }

export function isMobileMenuOpen(state: MobileMenuState, currentPathname: string): boolean {
  return state.pathname === currentPathname && state.open
}
