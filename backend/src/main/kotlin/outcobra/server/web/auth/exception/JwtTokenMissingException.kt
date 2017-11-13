package me.mkweb.releasr.web.auth.exception

class JwtTokenMissingException(override val message: String?) : Exception(message)