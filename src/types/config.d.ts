declare interface Config {
  development: {
    username: string;
    password: string;
    database: string;
    host: string;
    dialect: string;
  };
}

declare const config: Config;

export default config;
