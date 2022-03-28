export = Client;
declare class Client {
    /**
    * @param {JSON} data Services Data
    */
    constructor(data: JSON);
    classId: string;
    AxiosClient: import("@ing3kth/core/types/core/AxiosClient");
    Region: any;
    /**
    * @param {String} puuid PlayerUUID
    */
    GetSession(puuid: string): Promise<any>;
    /**
    */
    FetchContent(): Promise<any>;
    /**
    */
    FetchConfig(): Promise<any>;
}
//# sourceMappingURL=Client.d.ts.map