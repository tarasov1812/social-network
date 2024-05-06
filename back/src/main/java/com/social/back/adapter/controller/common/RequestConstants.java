package com.social.back.adapter.controller.common;

public final class RequestConstants {

    private RequestConstants() { }

    public static final String DATE_FORMAT = "dd/MM/yyyy HH:mm:ss";
    public static final String DATE_TIMEZONE = "Europe/Madrid";
    public static final String MEDIA_TYPE_SUBTYPE_SEP = "/";
    public static final String VALID_OPTIONS_SEP = "|";
    public static final String MEDIA_TYPE = "application";
    public static final String MEDIA_SUBTYPE = "json";
    public static final String VALID_REQUEST = MEDIA_TYPE+MEDIA_TYPE_SUBTYPE_SEP+MEDIA_SUBTYPE;
    public static final String INVALID_REQUEST = MEDIA_TYPE+MEDIA_TYPE_SUBTYPE_SEP+MEDIA_SUBTYPE;
    public static final String URLS_SEP = ",";
    public static final String LANGUAGE_HEADER_ES = "es-ES";
    public static final String LANGUAGE_HEADER_EU = "eu-ES";
    public static final String VALID_LANGUAGE_HEADERS = LANGUAGE_HEADER_ES+VALID_OPTIONS_SEP+LANGUAGE_HEADER_EU;
    public static final String CUSTOM_MESSAGE_ERROR_DEFAULT_BASE = "error.default.";
    // Query params
    public static final String QUERY_PARAM_INDEX = "index";
    public static final String QUERY_PARAM_SIZE = "size";

    public static final String QUERY_SIZE = "10";
    public static final String QUERY_INITIAL_INDEX = "0";
}
