# dApp-boilerplate

## Tech Stack

- TypeScript, Next.js, Hardhat, Solidity, Tailwind CSS
- App works on only Rinkeby Test Network

## How to get started

1. Please edit your environment variables

```bash
# rename env file
$ mv .env.sample .env
```

2. Start frontend server

```bash
# install dependencies
$ yarn

# start frontend server
$ yarn dev
```

## How to deploy contract

```bash
$ yarn contract:deploy
# If you want to run contract `$ yarn contract:run`
# Contracts are located in the `. /contracts/`
```
