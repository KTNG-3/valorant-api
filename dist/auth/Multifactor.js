"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Multifactor = void 0;
//import
const tough_cookie_1 = require("tough-cookie");
const IngCore = __importStar(require("@ing3kth/core"));
require("axios-cookiejar-support");
//class
/**
 * * Class ID: @ing3kth/val-api/RiotApi
 */
class Multifactor {
    /**
    * @param {IValClient_Auth} data Account toJSON data
    */
    constructor(data = {
        cookie: new tough_cookie_1.CookieJar().toJSON(),
        accessToken: '',
        entitlements: '',
        multifactor: true,
    }) {
        if (!data.multifactor) {
            IngCore.Core.Logs.log('This Account is not have a Multifactor', 'error', true);
        }
        this.classId = '@ing3kth/val-api/Multifactor';
        this.cookie = tough_cookie_1.CookieJar.fromJSON(JSON.stringify(data.cookie));
        this.accessToken = data.accessToken;
        this.entitlements = data.entitlements;
        this.multifactor = data.multifactor;
    }
    /**
    * @param {Number} verificationCode Verification Code
    * @returns {Promise<IValClient_Auth>}
    */
    execute(verificationCode) {
        return __awaiter(this, void 0, void 0, function* () {
            const _cookie = this.cookie;
            const axiosClient = new IngCore.Core.AxiosClient({
                cookie: true,
                jar: _cookie.toJSON(),
                headers: {}
            });
            //ACCESS TOKEN
            const auth_response = yield axiosClient.put('https://auth.riotgames.com/api/v1/authorization', {
                "type": "multifactor",
                "code": verificationCode.toString(),
                "rememberDevice": true
            }, {
                jar: _cookie,
            });
            // get asscess token
            const _search = new URL(auth_response.data.response.parameters.uri);
            var _get_where;
            var _get_accessToken;
            if (_search.search) {
                _get_where = _search.search;
                _get_accessToken = 'access_token';
            }
            else {
                _get_where = _search.hash;
                _get_accessToken = '#access_token';
            }
            this.accessToken = String(new URLSearchParams(_get_where).get(_get_accessToken));
            //ENTITLEMENTS
            const entitlements_response = yield axiosClient.post('https://entitlements.auth.riotgames.com/api/token/v1', {}, {
                jar: _cookie,
                headers: {
                    'Authorization': `Bearer ${this.accessToken}`,
                },
            });
            this.entitlements = entitlements_response.data.entitlements_token;
            this.cookie = _cookie;
            this.multifactor = false;
            return this.toJSON();
        });
    }
    /**
     *
     * @returns {IValClient_Auth}
     */
    toJSON() {
        IngCore.Core.Logs.log("Export " + this.classId);
        return {
            cookie: this.cookie.toJSON(),
            accessToken: this.accessToken,
            entitlements: this.entitlements,
            multifactor: this.multifactor,
        };
    }
    /**
    * @param {IValClient_Auth} data ValAuth_Account toJSON data
    * @param {Number} verificationCode Verification Code
    * @returns {Promise<IValClient_Auth>}
    */
    static verify(data, verificationCode) {
        return __awaiter(this, void 0, void 0, function* () {
            const MultifactorAccount = new Multifactor(data);
            return yield MultifactorAccount.execute(verificationCode);
        });
    }
}
exports.Multifactor = Multifactor;
//# sourceMappingURL=Multifactor.js.map