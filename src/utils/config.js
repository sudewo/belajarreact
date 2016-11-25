var config = {
    "production": {
        "api": "http://api.liatdiskon.com"
    },
    "development": {
        "api": "http://api.liatdiskon.dev"
    }
}

export default config[process.env.NODE_ENV];
