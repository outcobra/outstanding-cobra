buildscript {
    extra.set("ocVersion", rootProject.file("VERSION").readText().trim())

    extra {
        val ciRunNumber: String? = System.getenv("GITHUB_RUN_NUMBER")

        if (ciRunNumber != null) {
            val sanitizedBranch = System.getenv("GITHUB_REF")
                    .removePrefix("refs/heads/")
                    .replace(Regex("""[^0-9A-Za-z-]+"""), "-")

            extra.set("ocVersion", "${extra["ocVersion"] as String}+$ciRunNumber.$sanitizedBranch")

            // Creates versions like 1.3.1+102.develop
        }
    }
}

plugins {
    id("org.springframework.boot")
    id("io.spring.dependency-management")
    id("com.gorylenko.gradle-git-properties")
    id("jacoco")
    id("org.jetbrains.kotlin.jvm")
    id("org.jetbrains.kotlin.kapt")
    id("org.jetbrains.kotlin.plugin.allopen")
    id("org.jetbrains.kotlin.plugin.jpa")
    id("org.jetbrains.kotlin.plugin.spring")
}

val ocVersion: String by extra
version = ocVersion

//bootJar {
//    archiveBaseName = 'outstanding-cobra-server'
//}

springBoot {
    buildInfo()
}

//jacocoTestReport {
//    reports {
//        xml.enabled = true
//        html.enabled = false
//    }
//}
//check.dependsOn += jacocoTestReport

//sourceCompatibility = "11"

repositories {
    mavenCentral()
}

dependencies {
    runtimeOnly("com.h2database:h2")
    runtimeOnly("mysql:mysql-connector-java")
    implementation("com.querydsl:querydsl-jpa:4.1.4")
    implementation("com.google.api-client:google-api-client-assembly:1.23.0")
    implementation("io.springfox:springfox-swagger2:2.7.0")
    implementation("io.springfox:springfox-swagger-ui:2.7.0")
    implementation("io.springfox:springfox-staticdocs:2.6.1")
    implementation("javax.inject:javax.inject:1")
    implementation("javax.cache:cache-api:1.1.0")
    implementation("com.fasterxml.jackson.module:jackson-module-parameter-names")
    implementation("com.fasterxml.jackson.datatype:jackson-datatype-jdk8")
    implementation("com.fasterxml.jackson.datatype:jackson-datatype-jsr310:2.9.3")
    implementation("com.fasterxml.jackson.core:jackson-annotations:2.9.3")
    implementation("com.fasterxml.jackson.module:jackson-module-kotlin:2.9.3")
    implementation("org.flywaydb:flyway-core:5.0.3")
    implementation("com.getsentry.raven:raven-logback:8.0.3")
    implementation("org.ehcache:ehcache:3.4.0")

    implementation("org.jetbrains.kotlin:kotlin-reflect:1.4.21")
    implementation("io.jsonwebtoken:jjwt:0.9.0")
    implementation("org.hibernate.javax.persistence:hibernate-jpa-2.1-api:1.0.0.Final")
    implementation("org.hibernate:hibernate-validator:6.0.7.Final")
    implementation("javax.validation:validation-api:2.0.1.Final")
    implementation("javax.jdo:jdo-api:3.1")
    testImplementation("org.assertj:assertj-core:3.8.0")

    // Kapt & QueryDsl
    implementation("com.querydsl:querydsl-jpa:4.3.1")
    kapt("com.querydsl:querydsl-apt:4.3.1:jpa")

    // Spring Initializr
    implementation("org.springframework.boot:spring-boot-starter-cache")
    implementation("org.springframework.boot:spring-boot-starter-data-jpa")
    implementation("org.springframework.boot:spring-boot-starter-jooq")
    implementation("org.springframework.boot:spring-boot-starter-security")
    implementation("org.springframework.boot:spring-boot-starter-web")
    implementation("org.springframework.boot:spring-boot-devtools")
    implementation("org.springframework.boot:spring-boot-starter-actuator")
    implementation("org.springframework.boot:spring-boot-starter-tomcat")
    testImplementation("org.springframework.boot:spring-boot-starter-test")
}

tasks.test {
    useJUnitPlatform()
}
