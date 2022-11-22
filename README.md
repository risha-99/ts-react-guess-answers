## Commands to set up Jest with TS
1. `npm install jest ts-jest @testing-library/react @testing-library/jest-dom --dev`

2. `npx ts-jest config:init`

3. `npm i jest-environment-jsdom --save-dev`

### Do necessary changes in jest.config.js

`
module.exports = {
  preset: "ts-jest",
  setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
  testEnvironment: "jsdom",
};`
