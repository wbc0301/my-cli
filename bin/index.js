#! /usr/bin/env node
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { program } from "commander";
import { createRequire } from "module";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import chalk from "chalk";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const require = createRequire(import.meta.url);
const pkg = require(join(__dirname, "../package.json"));
program.version(`my-cli@${pkg.version}`).usage("<command> [option]");
// 1.通过脚手架来创建一个项目  create（拉取仓库中的模板，下载方式可以采用github gitlab gitee）
// 2.配置拉取的信息，配置系统文件  config
// vue create abc
program
    .command("create <project-name>")
    .description("create a project")
    .option("-f, --force", "overwrite target directory")
    .action((name, option) => __awaiter(void 0, void 0, void 0, function* () {
    // require("./commands/create.js")(name, option);
    (yield import("./commands/create.js")).default(name, option); // 自己实现
}));
// my-cli config --set a 1
// my-cli config --get a
program
    .command("config [value]")
    .description("inspect config ")
    .option("-g, --get <path>", "get value")
    .option("-s, --set <path> <value>", "set value")
    .option("-d, --delete <path>", "delete value")
    .action((value, option) => __awaiter(void 0, void 0, void 0, function* () {
    (yield import("./commands/config.js")).default(value, option); // 自己实现
}));
program.addHelpText("after", `\nRun ${chalk.blueBright("my-cli <command> --help")} for detailed usage of given command.`);
// process.argv 用户传递的参数
program.parse(process.argv); //直接解析用户参数自动提供了--help
