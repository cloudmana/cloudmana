<p align="center">
  <a href="https://cloudmana.thinhhv.com" target="_blank">
    <img style="width: 350px;" src="workspaces/frontend/public/assets/images/cloudmana.svg" alt="Cloudmana landing page" />
  </a>
</p>
<p align="center">A dashboard for manage resources on cloud, support multi-providers.</p>
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
yarn app dev
yarn api start:dev

# build
yarn app build
yarn api build

# production mode
yarn app start
yarn api start:prod
```

## Techstack

- Backend:
  - NestJS (NodeJS v14 or later)
  - Yarn
  - Support databases: MongoDB, SQLite (default).
  - Redis
- Frontend:
  - NextJS
  - Socket.io

## Development

- Migration

  ```bash
  yarn api migrate:create eggs
  yarn api migrate:up
  yarn api migrate:down
  ```

- Containerize app:

  ```bash
  # Build
  docker build -t cloudmana/cloudmana:local -f .docker/Dockerfile .

  # docker-compose with DockerHub
  docker-compose up -d
  # docker-compose with local build
  docker-compose -f .docker/docker-compose.yml up
  ```

## Support

Cloudmana is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers.

## Stay in touch

- Author - [ThinhHV](https://thinhhv.com)
- Website - [https://cloudmana.github.io](https://cloudmana.github.io)
- Telegram - [@cloudmana](https://t.me/cloudmana)

## License

Cloudmana is [MIT licensed](LICENSE).
