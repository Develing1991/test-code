describe('테스트 하고자 하는 컴포넌트', () => {
    beforeEach(() => {
        console.log('beforeEach')
    })
    beforeAll(() => {
        console.log('beforeAll')
    })
    afterEach(() => {
        console.log('afterEach')
    })
    afterAll(() => {
        console.log('afterAll')
    })
    it('should test the first case', () => {
        // 영문
        console.log('it')
    })
    test('테스트케이스 1번, 00을 테스트 한다', () => {
        // 한글
        console.log('test')
    })
    /**
     * beforeAll
     * beforeEach
     * it
     * afterEach
     * beforeEach
     * test
     * afterEach
     * afterAll
     */
})
