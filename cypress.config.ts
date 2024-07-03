import { defineConfig } from 'cypress'

export default defineConfig({
    // projectId: process.env?.REACT_APP_PROJECT_ID,
    projectId: 'c6kut6',
    e2e: {
        baseUrl: 'http://localhost:5173',
        setupNodeEvents(on, config) {
            // implement node event listeners here
        },
    },
})
