pluginManagement {
    // gradle.properties
    val springBootVersion: String by settings
    val springBootDepManVersion: String by settings
    val kotlinVersion: String by settings
    val gradleGitPropsVersion: String by settings

    repositories {
        gradlePluginPortal()
        jcenter()
    }

    plugins {
        id("org.springframework.boot") version springBootVersion
        id("io.spring.dependency-management") version springBootDepManVersion
        id("org.jetbrains.kotlin.jvm") version kotlinVersion
        id("org.jetbrains.kotlin.plugin.spring") version kotlinVersion
        id("org.jetbrains.kotlin.plugin.jpa") version kotlinVersion
        id("org.jetbrains.kotlin.kapt") version kotlinVersion
        id("com.gorylenko.gradle-git-properties") version gradleGitPropsVersion
    }
}

rootProject.name = "outstanding-cobra"
include("frontend", "backend")
