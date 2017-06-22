export class Mock {
    constructor(
        public name: string,
        public routeTemplate: string,
        public body: string,
        public verb: string
    ) { }
}

export class MockApi {
    constructor(
        public name: string,
        public api: Mock,
        public isLoading: boolean,
        public error:string
    ){}
}
