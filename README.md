<p align="center">
  <a href="http://thinhhv.com/cloudmana" target="blank">
    <img style="width: 150px;" src="https://cloudmana.github.io/public/assets/images/logo.png?raw=true" alt="Cloudmana landing page" />
  </a>
</p>

<p align="center">A dashboard for manage multi-cloud resources.</p>
<p align="center">
  <a href="https://opensource.org/licenses/MIT" target="_blank"><img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="License: MIT" /></a>
  <a href="https://github.com/cloudmana/cloudmana/blob/main/LICENSE" target="_blank"><img src="https://img.shields.io/badge/price-FREE-0098f7.svg" alt="Price" /></a>
  <a href="https://github.com/cloudmana/cloudmana/" target="_blank"><img src="https://img.shields.io/github/package-json/v/cloudmana/cloudmana" alt="GitHub package version" /></a>
</p>

## Installation

```bash
yarn install
```

## Running the app

```bash
# development
yarn start:app
yarn start:api

# watch mode
yarn app start
yarn api start:dev

# build
yarn app build
yarn api build

# production mode
yarn app start:prod
yarn api start:prod
```

## Techstack

- Backend:
  - NodeJS (recommend v14 or later)
  - Yarn
  - Support databases: MongoDB, SQLite (default).
  - WebSocket supported with socket.io
  - Redis as cache
- Frontend:
  - ReactJS

## Development:

- Migration

  ```bash
  yarn api migrate:create eggs
  yarn api migrate:up
  yarn api migrate:down
  ```

## Support

Cloudmana is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers.

## Stay in touch

- Author - [ThinhHV](https://thinhhv.com)
- Website - [https://cloudmana.github.io](https://cloudmana.github.io)
- Telegram - [@cloudmana](https://t.me/cloudmana)

## License

Cloudmana is [MIT licensed](LICENSE).
