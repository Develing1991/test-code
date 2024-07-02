describe('주문을 테스트한다.', () => {
    it('사용자는 배달/포장 중 원하는 유형을 선택할 수 있다.', () => {
        cy.visit('/')

        cy.get('[data-cy=deliveryBtn]').should('be.visible').as('deliveryBtn')
        cy.get('[data-cy=pickupBtn]').should('be.visible').as('pickupBtn')

        cy.get('@deliveryBtn').click()
        cy.url().should('include', '/food-type')
    })

    it('사용자는 음식 종류를 선택할 수 있다.', () => {
        cy.visit('/food-type')
        cy.intercept(
            {
                method: 'GET',
                url: '/restaurant/food-type',
            },
            {
                fixture: 'food-list.json',
            }
        )

        cy.get('[data-cy=1]').should('be.visible').as('pizzaBtn')
        cy.get('@pizzaBtn').click()

        cy.url().should('include', '/food-type/1')
    })

    it('사용자는 원하는 레스토랑을 선택할 수 있다', () => {
        cy.visit('/food-type/1')
        cy.intercept(
            {
                method: 'GET',
                url: '/restaurant/food-type/1',
            },
            {
                fixture: 'restaurant-list.json',
            }
        )

        cy.fixture('restaurant-list.json').then((restaurantList) => {
            cy.get(`[data-cy=${restaurantList[0].id}]`).should('be.visible').as('restaurantBtn')
            cy.get('@restaurantBtn').click()
            cy.url().should('include', '/restaurant/1')
        })
        // cy.visit('/restaurant')
    })

    it('사용자는 원하는 메뉴를 장바구니에 담을 수 있다.', () => {
        cy.visit('/restaurant/1')
        cy.intercept(
            {
                method: 'GET',
                url: '/restaurant/1',
            },
            {
                fixture: 'menu.json',
            }
        )
        cy.fixture('menu.json').then((menu) => {
            cy.get(`[data-cy=${menu.menu_set[0].id}]`).should('be.visible').as('foodBtn')
            cy.get().click()
            cy.url().should()
        })
    })
})
