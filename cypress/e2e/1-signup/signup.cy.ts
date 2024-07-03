describe('회원가입 테스트', () => {
    // it('사용자는 이메일과 비밀번호를 사용해서 회원가입한다.', () => {
    //     // given - 회원가입 페이지에 접근한다
    //     cy.visit('/signup')
    //     cy.get('[data-cy=signupButton]').as('signupButton')
    //     cy.get('@signupButton').should('be.disabled')
    //     // when - 이메일과 비밀번호를 입력한다, 비밀번호와 비밀번호 확인 값이 일치한다.
    //     cy.get('[data-cy=emailInput]').as('emailInput')
    //     cy.get('[data-cy=passwordInput]').as('passwordInput')
    //     cy.get('[data-cy=passwordConfirmInput]').as('passwordConfirmInput')

    //     cy.get('@emailInput').type('email@email.com')
    //     cy.get('@passwordInput').type('password')
    //     cy.get('@passwordConfirmInput').type('password')

    //     cy.get('@passwordInput')
    //         .invoke('val')
    //         .then((passwordValue) => {
    //             if (typeof passwordValue === 'string') {
    //                 expect(passwordValue.trim()).to.not.be.empty
    //                 cy.get('@passwordConfirmInput').invoke('val').should('eq', passwordValue)
    //                 cy.get('@signupButton').should('not.be.disabled')
    //             }
    //         })
    //     // then - 회원가입 버튼이 활성화 되고, 회원가입에 성공하고 로그인 페이지로 이동한다
    //     cy.intercept(
    //         {
    //             method: 'POST',
    //             url: '/user/singup',
    //         },
    //         {
    //             mgs: 'SUCCESS',
    //         }
    //     ).as('singup')
    //     cy.get('@signupButton').click()
    //     cy.url().should('contain', '/login')
    // })

    it('Should display an error message when passwords do not match', () => {
        // given - 가입 페이지로 이동
        cy.visit('/signup')

        // when - 비밀번호, 비밀번호 확인 다른 값 입력
        cy.get('[data-cy=emailInput]').type('aaa@gmail.com')
        cy.get('[data-cy=passwordInput]').type('password123')
        cy.get('[data-cy=passwordConfirmInput]').type('password1234')

        // then - 에러 메시지 확인
        cy.get('[data-testid=error-message]').should('be.visible')

        cy.get('.error-message').should('be.visible').and('contain.text', '비밀번호가 일치하지 않습니다')
        cy.contains('.error-message', '비밀번호가 일치하지 않습니다').should('be.visible')
    })
})
