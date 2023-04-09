import React, { PropsWithChildren } from 'react';
import { render } from '@testing-library/react';
import type { RenderOptions } from '@testing-library/react';
import type { PreloadedState } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

import { AppStore, TestRootState, setupStore } from 'store';

// 这个 interface 扩展了 RTL 的默认 render 选项，同时允许用户指定其他选项，例如 initialState 和 store
interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<TestRootState>
  store?: AppStore
}

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {},
    // 自动创建一个 store 实例，如果没有传入 store
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {},
) {
  function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    return (
      <Provider store={store}>
        {children}
      </Provider>
    );
  }

  // 返回一个对象，其中包含 store 和所有的 RTL 查询函数
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
