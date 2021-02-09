import com.github.gradle.node.npm.task.NpmTask
import de.undercouch.gradle.tasks.download.Download

plugins {
    id("com.github.node-gradle.node") version "3.0.1"
    id("de.undercouch.download") version "4.1.1"
}

node {
    version.set("14.15.4")
    npmVersion.set("6.14.10")
    download.set(true)
}

tasks.register<Download>("downloadGoogleAuthLibrary") {
    src("http://apis.google.com/js/platform.js")
    dest("src/lib/google_auth.js")
}

tasks.register<NpmTask>("ngBuild") {
    dependsOn("npmInstall", "downloadGoogleAuthLibrary")

    enabled = true
    args.set(listOf("run", "ng", "build", "--prod", "-sm"))
}

tasks.register("assemble") {
    dependsOn("ngBuild")
}

tasks.register("build") {
    dependsOn("assemble")
}

tasks.register<NpmTask>("ngTest") {
    dependsOn("npmInstall")

    args.set(listOf("run", "ng", "test", "--watch=false", "--single-run", "--browser=PhantomJS", "--code-coverage"))
}

tasks.register("test") {
    dependsOn("ngTest")
}

tasks.register<NpmTask>("ngServe") {
    dependsOn("npmInstall")
    args.set(listOf("ng", "s", "--proxy-conf proxy.conf.js"))
}

tasks.register<NpmTask>("setCacheFolderCI") {
    args.set(listOf("config", "set", "cache-folder", "/root/yarn-cache"))
}
