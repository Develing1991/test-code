import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import SignupPage from '../pages/SignupPage'
import { RouterProvider, createMemoryRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient({
    defaultOptions: {},
})
describe('회원가입 테스트', () => {
    // 두 테스트 케이스가 같은 given 값이 주어지기 때문에 beforeEach에 넣음
    beforeEach(() => {
        // given - 회원가입 페이지가 그려짐
        const routes = [
            {
                path: '/signup',
                element: <SignupPage />,
            },
        ]

        const router = createMemoryRouter(routes, {
            initialEntries: ['/signup'],
            initialIndex: 0,
        })

        render(
            <QueryClientProvider client={queryClient}>
                <RouterProvider router={router} />
            </QueryClientProvider>
        )
    })
    test('비밀번호와 비밀번호 확인 값이 일치하지 않으면 에러메시지가 표시된다', async () => {
        // given - 회원가입 페이지가 그려짐

        // when - 비밀번호와 비밀번호 확인 값이 일치하지 않음
        const passwordInput = screen.getByLabelText('비밀번호')
        const confirmPasswordInput = screen.getByLabelText('비밀번호 확인')
        fireEvent.change(passwordInput, { target: { value: 'password' } })
        fireEvent.change(confirmPasswordInput, { target: { value: 'wrongPassword' } })

        // then - 에러메시지가 표시됨
        const errorMessage = await screen.findByTestId('error-message')
        expect(errorMessage).toBeInTheDocument()
    })

    test('이메일을 입력하고, 비밀번호와 비밀번호 확인값이 일치하면 회원가입 버튼이 활성화된다', () => {
        //given - 회원가입 페이지가 그려짐
        //given - 회원가입 버튼이 비활성화
        const signupButton = screen.getByRole('button', { name: '회원가입' })
        expect(signupButton).toBeDisabled()

        //when - 이메일 입력, 비밀번호 비밀번호 확인 일치
        const emailInput = screen.getByLabelText('이메일')
        const passwordInput = screen.getByLabelText('비밀번호')
        const confirmPasswordInput = screen.getByLabelText('비밀번호 확인')
        fireEvent.change(emailInput, { target: { value: 'aaa@naver.com' } })
        fireEvent.change(passwordInput, { target: { value: 'password' } })
        fireEvent.change(confirmPasswordInput, { target: { value: 'password' } })

        //then - 회원가입 버튼 활성화
        expect(signupButton).toBeEnabled()
    })
})
