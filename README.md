## Installation

```bash
yarn
```

## Configurations

NextJS reads configurations from `env` files.

The configuration files are located within `/envs` directory, which each
configuration are separated by environment names. For example,

```bash
├── .env.local
├── .env.production
└── .env.staging
```

The contents in `env` files will be injected to `process.env`. Please refer to
[Deployment](#Deployment) section to learn more on how to choose `env` file on
the build steps.

You must create your own `.env` file (which will be ignored from Git). Running
`yarn dev` will also copy `.env.local` to `.env` if `.env` does not exist.

You **MUST NOT** put sensitive credentials or secret tokens inside this `env`
files, as `env` file will be compiled and injected into the web bundle.

## Running the app

```bash
yarn dev
```
