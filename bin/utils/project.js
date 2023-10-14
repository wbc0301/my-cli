var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import axios from "axios";
import { exec } from "child_process";
import util from "util"; // node中的内置模块
import { wrapLoading } from "./loading.js";
import { rm } from "fs/promises";
import { getAllConfig } from "../commands/config.js";
const execPromisified = util.promisify(exec);
const { organization, accessToken } = getAllConfig().config;
export function getOrganizationProjects() {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield axios.get(`https://gitee.com/api/v5/orgs/${organization}/repos`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return res.data.map((item) => item.name);
    });
}
export function getProjectVersions(repo) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield axios.get(`https://gitee.com/api/v5/repos/${organization}/${repo}/tags`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return res.data.map((item) => item.name);
    });
}
export function cloneAndCheckoutTag(tag, projectName, repo) {
    return __awaiter(this, void 0, void 0, function* () {
        const cmd = `git clone --branch ${tag} --depth 1 https://gitee.com/${organization}/${projectName}.git ${repo}`;
        return wrapLoading("create project", () => __awaiter(this, void 0, void 0, function* () {
            yield execPromisified(cmd);
            return rm(`${repo}/.git`, { recursive: true });
        }));
    });
}
