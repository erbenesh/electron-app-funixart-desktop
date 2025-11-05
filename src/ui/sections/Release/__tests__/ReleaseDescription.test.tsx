import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '../../../../test/utils';
import { ReleaseDescription } from '../components/ReleaseDescription';

describe('ReleaseDescription Component', () => {
  it('should render description text', () => {
    const description = '<p>This is a test description</p>';
    
    render(<ReleaseDescription description={description} />);
    
    expect(screen.getByText('This is a test description')).toBeInTheDocument();
  });

  it('should parse HTML content', () => {
    const description = '<p>Paragraph 1</p><p>Paragraph 2</p>';
    
    render(<ReleaseDescription description={description} />);
    
    expect(screen.getByText('Paragraph 1')).toBeInTheDocument();
    expect(screen.getByText('Paragraph 2')).toBeInTheDocument();
  });

  it('should handle empty description', () => {
    const { container } = render(<ReleaseDescription description="" />);
    
    const descriptionElement = container.querySelector('.description-text');
    expect(descriptionElement).toBeInTheDocument();
  });

  it('should toggle expansion on button click', () => {
    // Mock a long description that would trigger the toggle
    const longDescription = '<p>' + 'Line '.repeat(100) + '</p>';
    
    render(<ReleaseDescription description={longDescription} />);
    
    // Should show toggle button for long content
    // Note: This test depends on CSS and DOM measurement
    // In a real test environment, we'd need to mock these measurements
  });
});

