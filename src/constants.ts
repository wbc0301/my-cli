export const defaultConfig = {
  // 用户可以通过命令行来配置
};

export const configPath = `${
  process.env[process.platform === "darwin" ? "HOME" : "USERPROFILE"]
}/.hcrc`;
