import React from 'react';
import { render } from '@testing-library/react';
import SkeletonLoader from '../SkeletonLoader';
import { expect, describe, it } from '@jest/globals';
import '@testing-library/jest-dom/jest-globals';
import '@testing-library/jest-dom';

describe('SkeletonLoader', () => {
    it('renders the skeleton loader', () => {
      const { container } = render(<SkeletonLoader />);
      
      expect(container.querySelector('div.p-4')).toBeInTheDocument();
      
      expect(container.querySelector('.animate-pulse')).toBeInTheDocument();
      
      expect(container.querySelector('.rounded-full')).toBeInTheDocument();
      expect(container.querySelector('.bg-gray-200')).toBeInTheDocument();
      expect(container.querySelector('.h-4')).toBeInTheDocument();
   
      expect(container.querySelector('.space-x-4')).toBeInTheDocument();
    });
  });