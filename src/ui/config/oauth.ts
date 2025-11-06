export const GOOGLE_CLIENT_ID = '';
export const VK_APP_ID = '';

// By default we redirect back to /auth on the same origin
export const OAUTH_REDIRECT_URI = typeof window !== 'undefined' ? `${window.location.origin}/auth` : '';

// Builds Google OAuth implicit flow URL returning id_token via fragment
export function buildGoogleOAuthUrl(mode: 'sign-in' | 'sign-up' = 'sign-in'): string {
	if (!GOOGLE_CLIENT_ID || !OAUTH_REDIRECT_URI) return '/auth?googleIdToken='; // graceful fallback
	const params = new URLSearchParams({
		client_id: GOOGLE_CLIENT_ID,
		redirect_uri: OAUTH_REDIRECT_URI,
		response_type: 'id_token',
		scope: 'openid email profile',
		nonce: Math.random().toString(36).slice(2),
		state: mode, // Pass mode to identify sign-in or sign-up
	});
	return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
}

// Builds VK OAuth implicit flow URL returning access_token via fragment
export function buildVkOAuthUrl(mode: 'sign-in' | 'sign-up' = 'sign-in'): string {
	if (!VK_APP_ID || !OAUTH_REDIRECT_URI) return '/auth?vkAccessToken='; // graceful fallback
	const params = new URLSearchParams({
		client_id: VK_APP_ID,
		redirect_uri: OAUTH_REDIRECT_URI,
		response_type: 'token',
		scope: 'email',
		v: '5.199',
		state: mode, // Pass mode to identify sign-in or sign-up
		display: 'page',
	});
	return `https://oauth.vk.com/authorize?${params.toString()}`;
}
