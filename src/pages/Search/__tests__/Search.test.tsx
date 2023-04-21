import React from 'react';
import { createServer } from 'test/server';
import { URL } from 'utils/apiURL';
import { mockSearchLocationData } from 'test/data/searchLocation';
import { renderWithProviders } from 'utils/testUtils';
import { MemoryRouter } from 'react-router-dom';
import { screen } from '@testing-library/react';
import Search from '../index';

// Mock Server
createServer([
  {
    path: URL.concat('/api/tag/location'),
    res: () => mockSearchLocationData,
  },
]);

// Test
describe('Search component', () => {
  it('Should render Tags in Search Page', async () => {
    renderWithProviders(
      <MemoryRouter>
        <Search />
      </MemoryRouter>,
    );

    const options = await Promise.all(
      mockSearchLocationData.map((data) => screen.findByRole('option', {
        name: data.text,
      })),
    );
    expect(options).toHaveLength(mockSearchLocationData.length);
  });
});
