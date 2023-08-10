import { render, fireEvent, act } from '@testing-library/react';
import React from 'react';
import { TestBrowser } from '@@/testBrowser';

// @ts-ignore
import { startMock } from '@@/requestRecordMock';

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

let server: {
  close: () => void;
};

describe('Login Page', () => {
  beforeAll(async () => {
    server = await startMock({
      port: 8000,
      scene: 'login',
    });
  });

  afterAll(() => {
    server?.close();
  });

  it('should show login form', async () => {
    const historyRef = React.createRef<any>();
    const rootContainer = render(
      <TestBrowser
        historyRef={historyRef}
        location={{
          pathname: '/user/login',
        }}
      />,
    );

    await rootContainer.findAllByText('Agile Ship');

    act(() => {
      historyRef.current?.push('/user/login');
    });

    // expect(rootContainer.baseElement?.querySelector('.ant-pro-form-login-desc')?.textContent).toBe(
    //   '',
    // );

    expect(rootContainer.asFragment()).toMatchSnapshot();

    rootContainer.unmount();
  });

  it('should login success', async () => {
    const historyRef = React.createRef<any>();
    const rootContainer = render(
      <TestBrowser
        historyRef={historyRef}
        location={{
          pathname: '/user/login',
        }}
      />,
    );

    await rootContainer.findAllByText('Agile Ship');

    const userNameInput = await rootContainer.findByPlaceholderText('邮箱: ');

    act(() => {
      fireEvent.change(userNameInput, { target: { value: 'lsdvincent@gmail.com' } });
    });

    const passwordInput = await rootContainer.findByPlaceholderText('密码: ');

    act(() => {
      fireEvent.change(passwordInput, { target: { value: 'D3r8LkW2WALvFdX8' } });
    });

    await (await rootContainer.findByText('Login')).click();

    // 等待接口返回结果
    await waitTime(5000);

    await rootContainer.findAllByText('Agile Ship');

    expect(rootContainer.asFragment()).toMatchSnapshot();

    await waitTime(2000);

    rootContainer.unmount();
  });
});
