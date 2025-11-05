import { describe, it, expect } from 'vitest';
import { render, screen } from '../../../../test/utils';
import { ReleaseHeader } from '../components/ReleaseHeader';

describe('ReleaseHeader Component', () => {
  const mockRelease = {
    id: 1,
    code: 'test-anime',
    title: {
      ru: 'Тестовое Аниме',
      en: 'Test Anime',
      original: 'テストアニメ',
    },
    type: {
      id: 1,
      name: 'TV',
      code: 'tv',
    },
    country: {
      id: 1,
      name: 'Japan',
      code: 'JP',
    },
    release_date: 1609459200, // 2021-01-01
  };

  it('should render release title', () => {
    render(<ReleaseHeader release={mockRelease} />);
    
    expect(screen.getByText('Тестовое Аниме')).toBeInTheDocument();
  });

  it('should render original title', () => {
    render(<ReleaseHeader release={mockRelease} />);
    
    expect(screen.getByText('テストアニメ')).toBeInTheDocument();
  });

  it('should render type', () => {
    render(<ReleaseHeader release={mockRelease} />);
    
    expect(screen.getByText('TV')).toBeInTheDocument();
  });

  it('should render country info', () => {
    render(<ReleaseHeader release={mockRelease} />);
    
    expect(screen.getByText('Japan')).toBeInTheDocument();
  });

  it('should not render when release is null', () => {
    const { container } = render(<ReleaseHeader release={null} />);
    
    expect(container.querySelector('.release-header')).toBeNull();
  });

  it('should render minimal release data', () => {
    const minimalRelease = {
      id: 1,
      title: {
        ru: 'Минимальное Аниме',
      },
    };

    render(<ReleaseHeader release={minimalRelease} />);
    
    expect(screen.getByText('Минимальное Аниме')).toBeInTheDocument();
  });
});

