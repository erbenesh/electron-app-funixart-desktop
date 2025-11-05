import { describe, it, expect, beforeEach } from 'vitest';
import { useAuthStore } from '../authStore';

describe('AuthStore', () => {
  beforeEach(() => {
    // Clear store before each test
    useAuthStore.getState().logout();
  });

  it('should initialize with unauthenticated state', () => {
    const state = useAuthStore.getState();
    
    expect(state.isAuthenticated).toBe(false);
    expect(state.user).toBeNull();
    expect(state.token).toBeNull();
  });

  it('should login user', () => {
    const user = { 
      id: 1, 
      username: 'testuser',
      avatar: null,
    };
    const token = 'test-token-123';
    
    useAuthStore.getState().login(user, token);
    
    const state = useAuthStore.getState();
    expect(state.isAuthenticated).toBe(true);
    expect(state.user).toEqual(user);
    expect(state.token).toBe(token);
  });

  it('should logout user', () => {
    // First login
    const user = { 
      id: 1, 
      username: 'testuser',
      avatar: null,
    };
    useAuthStore.getState().login(user, 'test-token');
    
    // Then logout
    useAuthStore.getState().logout();
    
    const state = useAuthStore.getState();
    expect(state.isAuthenticated).toBe(false);
    expect(state.user).toBeNull();
    expect(state.token).toBeNull();
  });

  it('should update user data', () => {
    const user = { 
      id: 1, 
      username: 'testuser',
      avatar: null,
    };
    useAuthStore.getState().login(user, 'test-token');
    
    // Update user
    useAuthStore.getState().updateUser({ 
      username: 'updateduser',
      avatar: 'https://example.com/avatar.jpg',
    });
    
    const state = useAuthStore.getState();
    expect(state.user?.username).toBe('updateduser');
    expect(state.user?.avatar).toBe('https://example.com/avatar.jpg');
    expect(state.user?.id).toBe(1); // Should keep other properties
  });
});

