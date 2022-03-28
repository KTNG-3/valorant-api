export = ValRegion;
declare class ValRegion {
    /**
    * @param {String} region Region
    * @example region = 'br'
    */
    constructor(region?: string);
    classId: string;
    region: string;
    riotRegion: string | undefined;
    server: string;
    toJSON(): {
        data: {
            api: string;
            server: string;
            riot: string | undefined;
        };
        url: {
            playerData: string;
            partyService: string;
            sharedData: string;
        };
        riot: {
            api: string;
            esports: string;
            server: string;
        };
    };
}
//# sourceMappingURL=ValRegion.d.ts.map