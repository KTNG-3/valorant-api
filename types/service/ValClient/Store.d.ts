export = Store;
declare class Store {
    /**
    * @param {JSON} data Services Data
    */
    constructor(data: JSON);
    classId: string;
    AxiosClient: import("@ing3kth/core/types/core/AxiosClient");
    Region: any;
    /**
    * @param {String} puuid PlayerUUID
    * @param {String} itemTypeId ItemTypeID
    */
    GetEntitlements(puuid: string, itemTypeId: string): Promise<any>;
    /**

    */
    GetOffers(): Promise<any>;
    /**
    * @param {String} puuid PlayerUUID
    */
    GetStorefront(puuid: string): Promise<any>;
    /**
    * @param {String} puuid PlayerUUID
    */
    GetWallet(puuid: string): Promise<any>;
}
//# sourceMappingURL=Store.d.ts.map