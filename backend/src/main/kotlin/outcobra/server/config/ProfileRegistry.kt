package outcobra.server.config

class ProfileRegistry {
    companion object {
        const val LOAD_TEST_DATA = "load_test_data"
        const val MOCK_SERVICES = "mock_services"
        const val BASIC_AUTH_SECURITY_MOCK = "basic_auth_security_mock"
        const val DISABLE_AUTH_FILTER = "disable_auth_filter"
        const val H2_DB = "h2_db"
        const val MYSQL_DB = "mysql_database"
        const val TEST = "test"
        const val AUTH0_PROXY = "auth0_proxy"
        const val DISABLE_SENTRY = "disable_sentry"

        /*
         * "super"-profiles
         */
        const val DEVELOPMENT = "development"
        const val PRODUCTION = "production"
    }
}