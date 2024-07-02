import '@testing-library/jest-dom'
import * as nock from 'nock'
import LoginPage from '../pages/LoginPage'
import { fireEvent, render, renderHook, screen, waitFor } from '@testing-library/react'
import { RouterProvider, createMemoryRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import useLogin from '../hooks/useLogin'

const queryClient = new QueryClient({
    defaultOptions: {},
    logger: {
        log: console.log,
        warn: console.warn,
        error: process.env.NODE_ENV === 'test' ? () => {} : console.error,
    },
})
describe('ㄹ그인 테스트', () => {
    // network + mock => nock 실제 요청을 보내지 않고 400에러 반환
    nock('http://www.example.com')
        .post('/login', { username: 'wrong@email.com', password: 'wrongPassword' })
        .reply(400, { id: 'No Search User' })

    beforeEach(() => {
        jest.spyOn(console, 'error').mockImplementation(() => {})
    })
    afterAll(() => {
        jest.restoreAllMocks()
    })
    test('로그인 실패하면 에러메시지가 나타난다', async () => {
        // given - 로그인 페이지가 그려짐
        const routes = [
            {
                path: '/login',
                element: <LoginPage />,
            },
        ]

        const router = createMemoryRouter(routes, {
            initialEntries: ['/login'],
            initialIndex: 0,
        })

        render(
            <QueryClientProvider client={queryClient}>
                <RouterProvider router={router} />
            </QueryClientProvider>
        )

        // when - 사용자가 로그인에 실패한다
        const wrapper = ({ children }) => {
            return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        }

        const emailInput = screen.getByLabelText('이메일')
        const passwordInput = screen.getByLabelText('비밀번호')

        fireEvent.change(emailInput, { target: { value: 'wrong@email.com' } })
        fireEvent.change(passwordInput, { target: { value: 'wrongPassword' } })

        const loginButton = screen.getByRole('button', { name: '로그인' })
        fireEvent.click(loginButton)

        const { result } = renderHook(() => useLogin(), { wrapper })
        // then - 에러 메시지가 나타난다
        await waitFor(() => result.current.isError)
        const errorMessage = await screen.findByTestId('error-message')
        expect(errorMessage).toBeInTheDocument()
    })
})
